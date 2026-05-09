/**
 * Central placeholders — replace with production values.
 * Optional overrides: VITE_MAP_EMBED_URL, VITE_LOGO_SRC,
 * VITE_WEB3FORMS_ACCESS_KEY (Contact + Admissions; see formsAdapter),
 * VITE_FORM_API_URL (custom JSON endpoint if Web3Forms unset).
 */
export const site = {
  schoolName: 'Rishi Raj Public School',
  /** Shown in navbar / hero pill (Emergent-style) */
  establishedDisplay: 'Est. 2020',
  tagline: 'Nurturing Minds, Building Futures',
  locationLine: 'Mokheri, Phalodi, Rajasthan',
  /** Second line in home hero pill (region) */
  pillRegion: 'Rajasthan, India',
  /** One line for cards / footer */
  addressOneLine: 'Mokheri, Phalodi, Rajasthan 341520',
  addressLines: [
    'Rishi Raj Public School',
    'Mokheri, Phalodi',
    'Rajasthan',
  ] as const,
  pinCode: '341520',
  phones: ['+91 9783653030', '+91 9783934195'],
  emails: ['rpsmokheri@gmail.com'],
  /** WhatsApp deep link; replace number when confirmed */
  whatsappUrl: 'https://wa.me/919783653030',
  principalName: 'Mr.Om Prakash Paliwal',
  foundedYear: 2020,
  logoSrc: '/images/logo.svg',
  heroImage:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80',
  /** Wide campus / building shot — URL resolved in HeroSection from `Images/School.jpg` */
  homeHeroImage: '/Images/School.jpg',
  homeVisitBannerImage:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80',
  mapEmbedUrl:
    (typeof import.meta.env.VITE_MAP_EMBED_URL === 'string' &&
    import.meta.env.VITE_MAP_EMBED_URL.length > 0
      ? import.meta.env.VITE_MAP_EMBED_URL
      : 'https://maps.google.com/maps?q=Nagaur,Rajasthan&output=embed'),
  socialUrls: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/919783653030',
    instagram: 'https://www.instagram.com/rishirajschool/',
  },
} as const;

export type SiteConfig = typeof site;
