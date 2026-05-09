export type FacultyDepartment =
  | 'Primary'
  | 'Middle School'
  | 'Secondary'
  | 'Senior Secondary'
  | 'Admin Staff'

export interface FacultyMember {
  id: number
  name: string
  subject: string
  qualification: string
  experience: string
  department: FacultyDepartment
  photo: string
  bio?: string
}

export interface Testimonial {
  id: number
  parentName: string
  studentClass: string
  quote: string
  rating: number
}

export interface SchoolEvent {
  id: string
  title: string
  description: string
  dateISO: string
  time?: string
  venue?: string
  image: string
  upcoming?: boolean
}

export type GalleryCategory =
  | 'Events'
  | 'Classrooms'
  | 'Sports'
  | 'Annual Day'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
}

/** Stub for future CMS / news feed */
export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  dateISO: string
  image: string
}

export interface NoticeItem {
  id: string
  title: string
  body: string
}
