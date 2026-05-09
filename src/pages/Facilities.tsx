import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import './Facilities.css'

const heroImg = 'https://images.unsplash.com/photo-1541827374766-09836a117a87?w=1600&q=80'

const facilities = [
  {
    title: 'Smart classrooms',
    body: 'Air-ventilated rooms with projectors and whiteboards for interactive learning.',
  },
  {
    title: 'Science laboratory',
    body: 'Physics, chemistry, and biology labs for hands-on experiments (Class 6–12).',
  },
  {
    title: 'Computer lab',
    body: '30+ computers, internet access, Office skills and digital literacy.',
  },
  {
    title: 'Library & reading room',
    body: '5000+ books in Hindi and English, magazines, and reference material.',
  },
  {
    title: 'Sports ground',
    body: 'Cricket, football, basketball, kabaddi, and athletics facilities.',
  },
  {
    title: 'Yoga & meditation hall',
    body: 'Daily yoga for wellness and focus across age groups.',
  },
  {
    title: 'School transport',
    body: 'Bus routes for nearby villages with safety-first operations.',
  },
  {
    title: 'Canteen & drinking water',
    body: 'Hygienic meals support and RO purified water across campus.',
  },
] as const

const safety = [
  'CCTV surveillance',
  'Trained security guards',
  'Safe boundary walls',
  'Child-friendly infrastructure',
] as const

export function Facilities() {
  const { t } = useTranslation()

  return (
    <>
      <PageHero
        title={t('facilitiesPage.title')}
        subtitle={t('facilitiesPage.subtitle')}
        imageUrl={heroImg}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('nav.facilities') },
        ]}
      />
      <section className="facilities em-section">
        <div className="rr-container facilities__grid">
          {facilities.map((f) => (
            <article key={f.title} className="facilities__card em-card em-card--interactive">
              <h3>{f.title}</h3>
              <p className="muted">{f.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="facilities-campus em-section em-section--muted">
        <div className="rr-container facilities-campus__row">
          {[
            'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
            'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
          ].map((src) => (
            <img key={src} src={src} alt="" className="facilities-campus__img" loading="lazy" />
          ))}
        </div>
      </section>
      <section className="facilities-safety em-section">
        <div className="rr-container">
          <h2>{t('facilitiesPage.safetyTitle')}</h2>
          <div className="facilities-safety__grid">
            {safety.map((s) => (
              <div key={s} className="facilities-safety__item em-card em-card--interactive">
                <span className="facilities-safety__icon" aria-hidden>
                  ✓
                </span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
