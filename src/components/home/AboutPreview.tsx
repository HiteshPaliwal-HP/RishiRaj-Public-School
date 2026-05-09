import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScrollReveal } from '../ui/ScrollReveal'
import '../ui/Button.css'
import './AboutPreview.css'

const schoolImg =
  'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=900&q=80'

export function AboutPreview() {
  const { t } = useTranslation()
  return (
    <section className="about-preview section section--cream">
      <div className="rr-container about-preview__grid">
        <ScrollReveal>
          <img src={schoolImg} alt="" className="about-preview__img" loading="lazy" />
        </ScrollReveal>
        <ScrollReveal delayMs={120}>
          <h2 className="about-preview__title">{t('home.about.title')}</h2>
          <p className="muted">{t('home.about.p1')}</p>
          <ul className="about-preview__bullets">
            <li>{t('home.about.bullet1')}</li>
            <li>{t('home.about.bullet2')}</li>
          </ul>
          <Link to="/about" className="ui-btn ui-btn--ghost">
            {t('btn.readMore')}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
