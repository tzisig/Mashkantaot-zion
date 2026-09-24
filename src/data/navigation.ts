import { site } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
}

const baseNav: NavItem[] = [
  { label: 'שירותים', href: '/services' },
  { label: 'מחשבון משכנתא', href: '/mortgage-calculator' },
  { label: 'מחירים', href: '/pricing' },
  { label: 'מדריכים', href: '/guides' },
  { label: 'אזורי שירות', href: '/areas' },
  { label: 'אודות', href: '/about' },
  { label: 'צור קשר', href: '/contact' },
];

/** Pages that earn a sitewide link but not a slot in the top nav. */
export const footerExtraNav: NavItem[] = [
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'העברת מסמכים', href: '/documents' },
];

/** The booking page only appears once site.bookingUrl is set. */
export const mainNav: NavItem[] = site.bookingUrl
  ? [...baseNav.slice(0, 3), { label: 'קביעת פגישה', href: '/book' }, ...baseNav.slice(3)]
  : baseNav;

export const legalNav: NavItem[] = [
  { label: 'מדיניות פרטיות', href: '/privacy-policy' },
  { label: 'תנאי שימוש', href: '/terms' },
  { label: 'מדיניות עוגיות', href: '/cookie-policy' },
  { label: 'הצהרת נגישות', href: '/accessibility-statement' },
];
