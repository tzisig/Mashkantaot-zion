import { WorkerMailer } from 'worker-mailer';

/**
 * Contact form endpoint (Cloudflare Pages Function).
 *
 * Flow: honeypot -> Turnstile -> validation -> email over authenticated SMTP
 * -> append a row to Google Sheets. The lead is considered delivered if at
 * least one of the two destinations succeeds; failures are logged.
 *
 * Required environment variables (set in the Cloudflare dashboard, never in git):
 *   TURNSTILE_SECRET   Cloudflare Turnstile secret key
 *   SMTP_HOST          e.g. smtp.ionos.com
 *   SMTP_PORT          587 or 465
 *   SMTP_USER          full mailbox address
 *   SMTP_PASS          mailbox password
 *   MAIL_TO            where leads are sent
 *   SHEETS_WEBHOOK_URL Google Apps Script web app URL that appends the row
 *   SHEETS_WEBHOOK_TOKEN  shared secret checked by that script
 */
interface Env {
  TURNSTILE_SECRET?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  MAIL_TO?: string;
  SHEETS_WEBHOOK_URL?: string;
  SHEETS_WEBHOOK_TOKEN?: string;
}

interface Lead {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  channel: string;
  page: string;
  /** First-touch source: utm_*, gclid/fbclid, referrer and landing page. */
  attribution: string;
  userAgent: string;
  receivedAt: string;
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const clean = (value: FormDataEntryValue | null, max = 2000) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

async function sendMail(env: Env, lead: Lead) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.MAIL_TO) {
    throw new Error('SMTP is not configured');
  }

  const mailer = await WorkerMailer.connect({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT ?? 587),
    secure: Number(env.SMTP_PORT ?? 587) === 465,
    credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
    authType: 'plain',
  });

  const lines = [
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    `מייל: ${lead.email || 'לא נמסר'}`,
    `נושא: ${lead.subject}`,
    `ערוץ מועדף: ${lead.channel}`,
    '',
    lead.message || '(לא נכתבה הודעה)',
    '',
    `עמוד: ${lead.page}`,
    `מקור: ${lead.attribution || 'ישיר / לא ידוע'}`,
    `התקבל: ${lead.receivedAt}`,
  ];

  await mailer.send({
    from: { name: 'טופס האתר', email: env.SMTP_USER },
    to: { email: env.MAIL_TO },
    reply: lead.email ? { email: lead.email } : undefined,
    subject: `פנייה חדשה מהאתר: ${lead.subject} - ${lead.name}`,
    text: lines.join('\n'),
  });

  await mailer.close();
}

async function appendToSheet(env: Env, lead: Lead) {
  if (!env.SHEETS_WEBHOOK_URL) throw new Error('Sheets webhook is not configured');

  const res = await fetch(env.SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: env.SHEETS_WEBHOOK_TOKEN ?? '', lead }),
  });

  if (!res.ok) throw new Error(`Sheets webhook returned ${res.status}`);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  // Honeypot: a real person never fills this field.
  if (clean(form.get('company'), 100)) return json(204, {});

  if (env.TURNSTILE_SECRET) {
    const token = clean(form.get('cf-turnstile-response'), 4000);
    const ip = request.headers.get('cf-connecting-ip');
    if (!token || !(await verifyTurnstile(token, env.TURNSTILE_SECRET, ip))) {
      return json(400, { error: 'captcha_failed' });
    }
  }

  const lead: Lead = {
    name: clean(form.get('name'), 120),
    phone: clean(form.get('phone'), 30),
    email: clean(form.get('email'), 160),
    subject: clean(form.get('subject'), 120) || 'לא צוין',
    message: clean(form.get('message'), 4000),
    channel: clean(form.get('channel'), 40) || 'וואטסאפ',
    page: clean(request.headers.get('referer'), 300),
    attribution: clean(form.get('attribution'), 600),
    userAgent: clean(request.headers.get('user-agent'), 300),
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2 || !/^[\d\-+() ]{9,15}$/.test(lead.phone)) {
    return json(422, { error: 'validation_failed' });
  }
  if (lead.email && !/.+@.+\..+/.test(lead.email)) {
    return json(422, { error: 'validation_failed' });
  }
  if (clean(form.get('consent'), 10) !== 'on') {
    return json(422, { error: 'consent_required' });
  }

  const results = await Promise.allSettled([sendMail(env, lead), appendToSheet(env, lead)]);
  const delivered = results.some((r) => r.status === 'fulfilled');

  for (const result of results) {
    if (result.status === 'rejected') console.error('contact delivery failed:', result.reason);
  }

  return delivered ? json(200, { ok: true }) : json(502, { error: 'delivery_failed' });
};
