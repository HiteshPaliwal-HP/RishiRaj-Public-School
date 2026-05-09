import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { galleryData } from '../data/gallery'
import type { GalleryCategory } from '../types/content'
import './Gallery.css'

const filters: (GalleryCategory | 'All')[] = [
  'All',
  'Events',
  'Classrooms',
  'Sports',
  'Annual Day',
]

export function Gallery() {
  const { t } = useTranslation()
  const [cat, setCat] = useState<GalleryCategory | 'All'>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = useMemo(
    () => (cat === 'All' ? galleryData : galleryData.filter((g) => g.category === cat)),
    [cat],
  )

  const active = lightbox !== null ? filtered[lightbox] : null

  const go = (delta: number) => {
    if (lightbox === null) return
    const next = (lightbox + delta + filtered.length) % filtered.length
    setLightbox(next)
  }

  return (
    <>
      <PageHero
        variant="text"
        eyebrow={t('nav.gallery')}
        title={t('galleryPage.title')}
        subtitle={t('galleryPage.subtitle')}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('nav.gallery') },
        ]}
      />
      <section className="gallery em-section">
        <div className="rr-container">
          <div className="gallery__filters">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`gallery__filter ${cat === f ? 'is-active' : ''}`.trim()}
                onClick={() => setCat(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="gallery__grid">
            {filtered.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="gallery__cell"
                onClick={() => setLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="(max-width: 767px) 50vw, (max-width: 1099px) 33vw, 25vw"
                />
                <span className="gallery__expand" aria-hidden>
                  ⤢
                </span>
              </button>
            ))}
          </div>

          <h2>{t('galleryPage.videoTitle')}</h2>
          <div className="gallery__videos">
            <div className="gallery__video">
              <iframe
                title="School video 1"
                src="https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="gallery__video">
              <iframe
                title="School video 2"
                src="https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          <p className="gallery__share">{t('galleryPage.shareTitle')}: Facebook · YouTube · WhatsApp</p>
        </div>
      </section>

      {active ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setLightbox(null)}
        >
          <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="gallery-lightbox__close" onClick={() => setLightbox(null)}>
              ×
            </button>
            <button type="button" className="gallery-lightbox__nav prev" onClick={() => go(-1)}>
              ‹
            </button>
            <img src={active.src} alt={active.alt} decoding="async" fetchPriority="high" />
            <button type="button" className="gallery-lightbox__nav next" onClick={() => go(1)}>
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
