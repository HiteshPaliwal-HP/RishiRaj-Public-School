import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { galleryData } from '../../data/gallery'
import { SectionTitle } from '../ui/SectionTitle'
import '../ui/Button.css'
import './GalleryPreview.css'

export function GalleryPreview() {
  const { t } = useTranslation()
  const items = galleryData.slice(0, 6)

  return (
    <section className="gallery-prev section">
      <div className="rr-container">
        <SectionTitle title={t('home.galleryPrev.title')} align="center" />
        <div className="gallery-prev__grid">
          {items.map((item) => (
            <div key={item.id} className="gallery-prev__cell">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="gallery-prev__overlay">
                <span>{t('home.galleryPrev.overlay')}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-prev__cta">
          <Link to="/gallery" className="ui-btn ui-btn--primary">
            {t('btn.viewGallery')}
          </Link>
        </div>
      </div>
    </section>
  )
}
