import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { eventsData } from '../data/events'
import { newsStub } from '../data/news'
import { Card } from '../components/ui/Card'
import './Events.css'

const heroImg = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80'

const notices = [
  'Holiday list published for Term II — check office board.',
  'Pre-board exam timetable for Class 10 available at reception.',
  'Admissions 2026–27: forms from January.',
  'Fee submission reminder: last date 10th of each month.',
] as const

const achievements = [
  'Top results in RBSE Class 10 exams 2025',
  'District-level sports championship — runners up 2025',
  'Best school in Kamamfelodi block — 2024 (illustrative)',
  'Merit scholarship recipients — 2025 cohort',
] as const

export function Events() {
  const { t } = useTranslation()
  const upcoming = eventsData.filter((e) => e.upcoming)
  const past = eventsData.filter((e) => !e.upcoming)

  return (
    <>
      <PageHero
        title={t('eventsPage.title')}
        subtitle={t('eventsPage.subtitle')}
        imageUrl={heroImg}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('nav.events') },
        ]}
      />
      <section className="events em-section">
        <div className="rr-container">
          <h2>{t('eventsPage.upcoming')}</h2>
          <div className="events__grid">
            {upcoming.map((ev) => (
              <Card key={ev.id}>
                <div className="events__badge">
                  {new Date(ev.dateISO).getDate()}{' '}
                  {new Date(ev.dateISO).toLocaleString('default', { month: 'short' })}
                </div>
                <h3>{ev.title}</h3>
                <p className="muted">{ev.description}</p>
                <p className="events__meta">
                  {ev.time} · {ev.venue}
                </p>
                <button type="button" className="events__link">
                  Learn more
                </button>
              </Card>
            ))}
          </div>

          <h2>{t('eventsPage.past')}</h2>
          <div className="events__grid">
            {past.map((ev) => (
              <Card key={ev.id}>
                <img src={ev.image} alt="" className="events__thumb" loading="lazy" />
                <div className="events__date">{ev.dateISO}</div>
                <h3>{ev.title}</h3>
                <p className="muted">{ev.description}</p>
              </Card>
            ))}
            {newsStub.map((n) => (
              <Card key={n.id}>
                <img src={n.image} alt="" className="events__thumb" loading="lazy" />
                <div className="events__date">{n.dateISO}</div>
                <h3>{n.title}</h3>
                <p className="muted">{n.excerpt}</p>
              </Card>
            ))}
          </div>

          <h2>{t('eventsPage.achievements')}</h2>
          <div className="events__achieve">
            {achievements.map((a) => (
              <div key={a} className="events__achieve-card em-card em-card--interactive">
                {a}
              </div>
            ))}
          </div>

          <h2>{t('eventsPage.notices')}</h2>
          <div className="events__board">
            {notices.map((n, i) => (
              <div
                key={n}
                className="events__note"
                style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
