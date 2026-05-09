import type { GalleryCategory, GalleryItem } from '../types/content'

/**
 * =============================================================================
 * GALLERY — FOLDER LAYOUT
 * =============================================================================
 *
 * Put photos only inside these subfolders under `rishi-raj-public-school/Images/`:
 *
 *   Images/Events/
 *   Images/Classrooms/
 *   Images/Sports/
 *   Images/Annual Day/
 *
 * • Drop JPG / PNG / GIF / WebP files into the folder that matches the gallery tab.
 * • Section tabs load only from that folder.
 * • The “All” tab shows every photo in a random order (reshuffled each page load).
 * • Keep `School.jpg` in `Images/` root for the home hero — it is never shown in the gallery.
 *
 * After adding new files, restart `npm run dev` or rebuild so Vite picks them up.
 * =============================================================================
 */

/** Hero image — never include in gallery grids */
function isHeroSchoolPhoto(modulePath: string): boolean {
  const file = modulePath.split(/[/\\]/).pop() ?? ''
  return file.toLowerCase() === 'school.jpg'
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = out[i]!
    const b = out[j]!
    out[i] = b
    out[j] = a
  }
  return out
}

function itemsFromGlob(
  modules: Record<string, string>,
  category: GalleryCategory,
  idPrefix: string,
): GalleryItem[] {
  let n = 0
  return Object.entries(modules)
    .filter(([path]) => !isHeroSchoolPhoto(path))
    .map(([, src]) => {
      n += 1
      return {
        id: `${idPrefix}-${n}`,
        src,
        alt: `${category} photo ${n}`,
        category,
      }
    })
}

/* Vite must see literal strings here (no `${}`) so every photo is bundled. */
const globEvents = import.meta.glob(
  '../../Images/Events/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const globClassrooms = import.meta.glob(
  '../../Images/Classrooms/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const globSports = import.meta.glob(
  '../../Images/Sports/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const globAnnualDay = import.meta.glob(
  '../../Images/Annual Day/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

export const galleryEvents = itemsFromGlob(globEvents, 'Events', 'events')
export const galleryClassrooms = itemsFromGlob(globClassrooms, 'Classrooms', 'classrooms')
export const gallerySports = itemsFromGlob(globSports, 'Sports', 'sports')
export const galleryAnnualDay = itemsFromGlob(globAnnualDay, 'Annual Day', 'annual-day')

/** Each tab’s images (fixed order within the section — folder scan order). */
export const galleryByCategory: Record<GalleryCategory, GalleryItem[]> = {
  Events: galleryEvents,
  Classrooms: galleryClassrooms,
  Sports: gallerySports,
  'Annual Day': galleryAnnualDay,
}

/** “All” tab + home-page preview: every section combined, random order. */
export const galleryData: GalleryItem[] = shuffle([
  ...galleryEvents,
  ...galleryClassrooms,
  ...gallerySports,
  ...galleryAnnualDay,
])
