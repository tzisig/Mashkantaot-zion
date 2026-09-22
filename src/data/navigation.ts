export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'שירותים', href: '/services' },
  { label: 'מחשבון משכנתא', href: '/mortgage-calculator' },
  { label: 'מחירים', href: '/pricing' },
  { label: 'אודות', href: '/about' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'צור קשר', href: '/contact' },
];

export const legalNav: NavItem[] = [
  { label: 'מדיניות פרטיות', href: '/privacy-policy' },
  { label: 'תנאי שימוש', href: '/terms' },
  { label: 'מדיניות עוגיות', href: '/cookie-policy' },
  { label: 'הצהרת נגישות', href: '/accessibility-statement' },
];
