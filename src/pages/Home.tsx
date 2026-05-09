import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { site } from '../config/site'
import { galleryData } from '../data/gallery'
import { testimonialsData } from '../data/testimonials'
import { HeroSection } from '../components/home/HeroSection'
import { StatsSection } from '../components/home/StatsSection'
import './Home.css'

const galleryPreview = galleryData.slice(0, 6)
const testimonialHome = testimonialsData.slice(0, 2)

const PILLAR_KEYS = [
  { titleKey: 'homeEmergent.pillar1t', descKey: 'homeEmergent.pillar1d' },
  { titleKey: 'homeEmergent.pillar2t', descKey: 'homeEmergent.pillar2d' },
  { titleKey: 'homeEmergent.pillar3t', descKey: 'homeEmergent.pillar3d' },
  { titleKey: 'homeEmergent.pillar4t', descKey: 'homeEmergent.pillar4d' },
] as const

const PROGRAM_KEYS = [
  { titleKey: 'homeEmergent.prog1t', descKey: 'homeEmergent.prog1d' },
  { titleKey: 'homeEmergent.prog2t', descKey: 'homeEmergent.prog2d' },
  { titleKey: 'homeEmergent.prog3t', descKey: 'homeEmergent.prog3d' },
] as const

function QuoteIcon() {
  return (
    <svg className="em-home-t-quote__mark" viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path
        fill="currentColor"
        d="M4.58 16.95c0-1.14.29-2.11.88-2.91.59-.8 1.49-1.45 2.69-1.95l1.05 1.8c-.62.23-1.09.55-1.41.95-.32.4-.48.86-.48 1.38v.98H4.58V16.95zm9.42 0c0-1.14.29-2.11.88-2.91.59-.8 1.49-1.45 2.69-1.95l1.05 1.8c-.62.23-1.09.55-1.41.95-.32.4-.48.86-.48 1.38v.98H14V16.95z"
      />
    </svg>
  )
}

export function Home() {
  const { t } = useTranslation()
  const year = 2026

  return (
    <>
      <HeroSection />

      <StatsSection />

      <section className="em-home-welcome" aria-labelledby="em-home-welcome-heading">
        <div className="rr-container em-home-welcome__grid">
          <div className="em-home-welcome__lead-col">
            <p className="em-home-welcome__eyebrow">{t('homeEmergent.welcomeEyebrow')}</p>
            <h2 id="em-home-welcome-heading" className="em-home-welcome__headline font-display">
              <span className="em-home-welcome__headline-line">{t('homeEmergent.welcomeHeadingLine1')}</span>
              <span className="em-home-welcome__headline-line em-home-welcome__headline-line--gold">
                {t('homeEmergent.welcomeHeadingLine2')}
              </span>
            </h2>
          </div>
          <div className="em-home-welcome__body-col">
            <p className="em-home-welcome__copy">{t('homeEmergent.welcomeP1')}</p>
            <p className="em-home-welcome__copy">{t('homeEmergent.welcomeP2')}</p>
            <Link className="em-home-welcome__link" to="/about#principal">
              {t('homeEmergent.welcomePrincipalCta')}
              <span className="em-home-welcome__link-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                  <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="em-home-pillars-band">
        <div className="rr-container">
          <p className="em-home-pillars-band__eyebrow">{t('homeEmergent.pillarsEyebrow')}</p>
          <h2 className="em-home-pillars-band__title font-display">{t('homeEmergent.pillarsHeading')}</h2>
          <div className="em-home-pillars em-home-pillars--ref">
            {PILLAR_KEYS.map((keys, i) => (
              <article key={keys.titleKey} className="em-home-pillar em-home-pillar--ref">
                <div className="em-home-pillar__meta">
                  <span className="em-home-pillar__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="em-home-pillar__rule" aria-hidden />
                </div>
                <h3>{t(keys.titleKey)}</h3>
                <p>{t(keys.descKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="em-home-section em-home-section--muted em-home-programs-band">
        <div className="rr-container">
          <p className="rr-eyebrow">{t('homeEmergent.programsEyebrow')}</p>
          <h2 className="em-home-h2 font-display">{t('homeEmergent.programsHeading')}</h2>
          <div className="em-home-programs em-home-programs--ref">
            {PROGRAM_KEYS.map((keys) => (
              <article key={keys.titleKey} className="em-home-program em-home-program--ref">
                <h3>{t(keys.titleKey)}</h3>
                <p>{t(keys.descKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="em-home-section">
        <div className="rr-container em-home-gallery-head">
          <div>
            <p className="rr-eyebrow">{t('homeEmergent.galleryEyebrow')}</p>
            <h2 className="em-home-h2 font-display">{t('homeEmergent.galleryHeading')}</h2>
          </div>
          <Link className="em-home-link" to="/gallery">
            {t('homeEmergent.galleryCta')}
          </Link>
        </div>
        <div className="rr-container em-home-gallery-grid">
          {galleryPreview.map((g) => (
            <figure key={g.id} className="em-home-gallery-fig">
              <img src={g.src} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="em-home-testimonials" aria-labelledby="em-home-testimonials-title">
        <div className="rr-container">
          <h2 id="em-home-testimonials-title" className="em-home-testimonials__title font-display">
            {t('homeEmergent.testimonialSectionTitle')}
          </h2>
          <div className="em-home-t-grid">
            {testimonialHome.map((q) => (
              <blockquote key={q.id} className="em-home-t-card">
                <QuoteIcon />
                <p className="em-home-t-card__quote">{q.quote}</p>
                <footer className="em-home-t-card__foot">
                  <span className="em-home-t-card__name">{q.parentName}</span>
                  <span className="em-home-t-card__sep" aria-hidden>
                    ·
                  </span>
                  <span className="em-home-t-card__role">{q.studentClass}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="em-home-visit-wrap" aria-labelledby="em-home-visit-title">
        <div className="rr-container">
          <Link className="em-home-visit" to="/contact">
            <div
              className="em-home-visit__bg"
              style={{ backgroundImage: `url(${site.homeVisitBannerImage})` }}
              role="presentation"
            />
            <div className="em-home-visit__overlay" role="presentation" />
            <div className="em-home-visit__content">
              <p className="em-home-visit__eyebrow">{t('homeEmergent.visitCampusEyebrow', { year })}</p>
              <h2 id="em-home-visit-title" className="em-home-visit__title font-display">
                <span className="em-home-visit__title-plain">{t('homeEmergent.visitCampusTitleBefore')}</span>
                <span className="em-home-visit__title-gold">{t('homeEmergent.visitCampusTitleAccent')}</span>
              </h2>
            </div>
          </Link>
        </div>
      </section>

      <section className="em-home-cta rr-grain">
        <div className="rr-container em-home-cta__inner">
          <p className="em-home-cta__text">{t('homeEmergent.finalCta', { year })}</p>
          <Link className="em-home-btn em-home-btn--gold" to="/admissions">
            {t('homeEmergent.finalBtn')}
          </Link>
        </div>
      </section>
    </>
  )
}
