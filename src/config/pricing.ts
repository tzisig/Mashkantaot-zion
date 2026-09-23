/**
 * Published price list for /pricing.
 *
 * Deliberately separate from site.ts so the owner can change a number without
 * touching page markup. Figures are opening prices for a first year of trading,
 * set at the low end of the ranges recorded in research/competitors.md; raising
 * them later means editing `from` here and nothing else.
 */
export interface PricingTier {
  /** Short name shown as the card heading. */
  name: string;
  /** Opening price in ILS. 0 renders as "ללא עלות"; null renders a missing placeholder. */
  from: number | null;
  /** Whether `from` is a floor ("מ-5,000") or an exact figure. */
  exact?: boolean;
  /** One line under the heading: who this is for. */
  who: string;
  /** What the client walks away with. */
  includes: string[];
  /** Optional line under the price, e.g. a credit against a larger tier. */
  note?: string;
  /** Highlight this card as the main offer. */
  featured?: boolean;
}

export interface PricingConfig {
  tiers: PricingTier[];
  /**
   * VAT wording, e.g. 'המחירים אינם כוללים מע"מ'.
   * Null until the owner confirms his VAT status; renders [חסר: ...] meanwhile.
   */
  vatNote: string | null;
}

export const pricing: PricingConfig = {
  tiers: [
    {
      name: 'שיחת היכרות',
      from: 0,
      exact: true,
      who: 'לפני שמחליטים משהו, כדי לבדוק אם יש בכלל מה לעשות.',
      includes: [
        'רבע שעה עד חצי שעה, בטלפון או בווידאו',
        'תשובה ישירה אם יש מה לעשות בתיק שלכם',
        'הצעת מחיר בכתב אם מחליטים להמשיך',
      ],
      note: 'בלי תשלום ובלי התחייבות.',
    },
    {
      name: 'פגישת אפיון',
      from: 500,
      exact: true,
      who: 'למי שרוצה תמונה מלאה ולהחליט לבד מה לעשות איתה.',
      includes: [
        'מיפוי מלא של ההכנסות, ההלוואות הקיימות, הנכס וההון העצמי',
        'בדיקה של מה שאתם יכולים לקבל בפועל, ולא של מה שנשמע טוב',
        'מבנה מוצע ומה לבקש מול הבנק',
      ],
      note: 'הסכום מתקזז במלואו אם ממשיכים לליווי מלא.',
    },
    {
      name: 'ליווי מלא',
      from: 5000,
      who: 'רכישת דירה, מחזור משכנתא או איחוד הלוואות, מההתחלה ועד החתימה.',
      includes: [
        'כל מה שכלול בפגישת האפיון',
        'פנייה לגופים המתאימים והשוואת ההצעות שחוזרות',
        'משא ומתן על הריביות והתנאים',
        'ליווי עד החתימה, כולל בדיקת המסמכים',
        'זמינות לשאלות לאורך כל התהליך',
      ],
      featured: true,
    },
    {
      name: 'תיק מורכב',
      from: 10000,
      who: 'סירוב קודם מהבנק, הכנסות לא שגרתיות, כמה נכסים או כמה גופים מממנים.',
      includes: [
        'כל מה שכלול בליווי המלא',
        'עבודה מול יותר מגוף מימון אחד',
        'בניית התיק מחדש כשצריך, ולא רק הגשה שלו',
      ],
      note: 'המחיר נקבע אחרי שיחת ההיכרות, לפי מה שהתיק באמת דורש.',
    },
  ],
  vatNote: null,
};

/** "מ-5,000 ₪" / "500 ₪" / "ללא עלות" */
export const formatPrice = (tier: PricingTier): string | null => {
  if (tier.from === null) return null;
  if (tier.from === 0) return 'ללא עלות';
  const amount = tier.from.toLocaleString('he-IL');
  return tier.exact ? `${amount} ₪` : `מ-${amount} ₪`;
};
