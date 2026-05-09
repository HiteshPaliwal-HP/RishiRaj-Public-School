/** Primary navigation — same order as Emergent preview (7 items). */
export const PRIMARY_NAV = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/academics', key: 'academics' },
  { to: '/gallery', key: 'gallery' },
  { to: '/faculty', key: 'faculty' },
  { to: '/admissions', key: 'admissions' },
  { to: '/contact', key: 'contact' },
] as const

export type NavKey = (typeof PRIMARY_NAV)[number]['key']
