/**
 * Google Apps Script web app that appends a lead to a Google Sheet.
 *
 * Setup:
 * 1. Create a sheet, add the header row below in row 1.
 * 2. Extensions > Apps Script, paste this file, set SHARED_TOKEN.
 * 3. Deploy > New deployment > Web app, execute as yourself, access "Anyone".
 * 4. Put the deployment URL in SHEETS_WEBHOOK_URL and the token in
 *    SHEETS_WEBHOOK_TOKEN on Cloudflare Pages.
 *
 * Header row:
 * received_at | name | phone | email | subject | channel | message | page | user_agent
 */

const SHARED_TOKEN = 'CHANGE-ME';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== SHARED_TOKEN) {
      return ContentService.createTextOutput('forbidden').setMimeType(ContentService.MimeType.TEXT);
    }

    const lead = body.lead || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      lead.receivedAt || new Date().toISOString(),
      lead.name || '',
      lead.phone || '',
      lead.email || '',
      lead.subject || '',
      lead.channel || '',
      lead.message || '',
      lead.page || '',
      lead.userAgent || '',
    ]);

    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err).setMimeType(ContentService.MimeType.TEXT);
  }
}
