import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { site } from '../config/site'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { CoreValueIcon } from '../components/about/CoreValueIcon'
import './About.css'

const milestones = [
  { year: '2020', text: 'School founded in Kamamokiri' },
  { year: '2021', text: 'Primary learning program expanded with stronger foundations' },
  { year: '2022', text: 'Science lab and library facilities upgraded' },
  { year: '2023', text: 'Annual day and co-curricular activities scaled campus-wide' },
  { year: '2024', text: 'Sports training and student participation programs expanded' },
  { year: '2025', text: 'Smart classrooms upgraded across wings' },
  { year: '2026', text: 'Admissions and academic support systems strengthened for new session' },
] as const

const valueKeys = [
  ['v_excellence_t', 'v_excellence_d'],
  ['v_integrity_t', 'v_integrity_d'],
  ['v_discipline_t', 'v_discipline_d'],
  ['v_respect_t', 'v_respect_d'],
  ['v_innovation_t', 'v_innovation_d'],
  ['v_community_t', 'v_community_d'],
] as const

export function About() {
  const { t } = useTranslation()
  const principalImg =
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'

  return (
    <>
      <PageHero
        variant="text"
        eyebrow={t('nav.about')}
        title={t('aboutPage.title')}
        subtitle={t('aboutPage.storyTitle')}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('aboutPage.title') },
        ]}
      />
      <section className="about-story em-section em-section--muted">
        <div className="rr-container about-story__grid">
          <ScrollReveal>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80"
              alt=""
              className="about-story__img"
              loading="lazy"
            />
          </ScrollReveal>
          <ScrollReveal delayMs={100}>
            <h2>{t('aboutPage.storyTitle')}</h2>
            <p className="muted">{t('aboutPage.storyP1')}</p>
            <p className="muted">{t('aboutPage.storyP2')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="about-vm em-section em-section--muted">
        <div className="rr-container about-vm__grid">
          <ScrollReveal>
            <Card>
              <div className="about-vm__accent" />
              <h3>{t('aboutPage.visionTitle')}</h3>
              <p>{t('aboutPage.visionText')}</p>
            </Card>
          </ScrollReveal>
          <ScrollReveal delayMs={120}>
            <Card>
              <div className="about-vm__accent" />
              <h3>{t('aboutPage.missionTitle')}</h3>
              <p>{t('aboutPage.missionText')}</p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section id="principal" className="about-principal em-section">
        <div className="rr-container about-principal__grid">
          <blockquote className="about-principal__quote">
            <span className="about-principal__mark" aria-hidden>
              “
            </span>
            <p>{t('aboutPage.principalQuote')}</p>
            <footer>
              <strong>{site.principalName}</strong> — {t('aboutPage.principalRole')}
            </footer>
          </blockquote>
          <img src={principalImg} alt="" className="about-principal__photo" loading="lazy" />
        </div>
      </section>

      <section className="about-values em-section em-section--muted">
        <div className="rr-container">
          <SectionTitle title={t('aboutPage.valuesTitle')} align="center" />
          <div className="about-values__grid">
            {valueKeys.map(([title, desc], i) => (
              <ScrollReveal key={title} delayMs={i * 70}>
                <div className="about-values__item">
                  <div className="about-values__circle" aria-hidden>
                    <CoreValueIcon valueTitleKey={title} />
                  </div>
                  <h4>{t(`aboutPage.${title}`)}</h4>
                  <p className="muted">{t(`aboutPage.${desc}`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-timeline em-section">
        <div className="rr-container">
          <SectionTitle title={t('aboutPage.milestonesTitle')} align="center" />
          <ul className="about-timeline__list">
            {milestones.map((m, i) => (
              <li key={m.year} className={`about-timeline__item ${i % 2 === 1 ? 'is-right' : ''}`.trim()}>
                <span className="about-timeline__dot" />
                <div className="about-timeline__card">
                  <span className="about-timeline__year">{m.year}</span>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-affil em-section em-section--muted">
        <div className="rr-container about-affil__inner">
          <SectionTitle title={t('aboutPage.affiliationTitle')} align="center" />
          <p className="about-affil__line">{t('aboutPage.affiliationLine1')}</p>
          <p className="about-affil__line">{t('aboutPage.affiliationLine2')}</p>
        </div>
      </section>
    </>
  )
}
