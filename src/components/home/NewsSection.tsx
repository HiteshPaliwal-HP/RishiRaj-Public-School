import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { eventsData } from '../../data/events'
import { SectionTitle } from '../ui/SectionTitle'
import { Card } from '../ui/Card'
import { ScrollReveal } from '../ui/ScrollReveal'
import '../ui/Button.css'
import './NewsSection.css'

function formatDate(iso: string, locale: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function NewsSection() {
  const { t, i18n } = useTranslation()
  const items = eventsData.filter((e) => !e.upcoming).slice(0, 3)

  return (
    <section className="news section section--cream">
      <div className="rr-container">
        <SectionTitle title={t('home.news.title')} align="center" />
        <div className="news__grid">
          {items.map((ev, i) => (
            <ScrollReveal key={ev.id} delayMs={i * 90}>
              <Card>
                <div className="news__badge">{formatDate(ev.dateISO, i18n.language)}</div>
                <img src={ev.image} alt="" className="news__thumb" loading="lazy" />
                <h3>{ev.title}</h3>
                <p className="muted">{ev.description}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        <div className="news__cta">
          <Link to="/events" className="ui-btn ui-btn--primary">
            {t('home.news.viewEvents')}
          </Link>
        </div>
      </div>
    </section>
  )
}
