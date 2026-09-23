import { site } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
}

const baseNav: NavItem[] = [
  { label: 'שירותים', href: '/services' },
  { label: 'מחשבון משכנתא', href: '/mortgage-calculator' },
  { label: 'מחירים', href: '/pricing' },
  { label: 'מדריכים', href: '/blog' },
  { label: 'אודות', href: '/about' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'צור קשר', href: '/contact' },
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
