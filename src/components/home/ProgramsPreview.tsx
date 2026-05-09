import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../ui/SectionTitle'
import { Card } from '../ui/Card'
import { ScrollReveal } from '../ui/ScrollReveal'
import '../ui/Button.css'
import './ProgramsPreview.css'

export function ProgramsPreview() {
  const { t } = useTranslation()
  const cards = [
    { titleKey: 'home.programs.c1Title', descKey: 'home.programs.c1Desc' },
    { titleKey: 'home.programs.c2Title', descKey: 'home.programs.c2Desc' },
    { titleKey: 'home.programs.c3Title', descKey: 'home.programs.c3Desc' },
  ] as const

  return (
    <section className="programs section">
      <div className="rr-container">
        <SectionTitle title={t('home.programs.title')} align="center" />
        <div className="programs__grid">
          {cards.map((c, i) => (
            <ScrollReveal key={c.titleKey} delayMs={i * 100}>
              <Card>
                <div className="programs__icon" aria-hidden>
                  {i === 0 ? '🎨' : i === 1 ? '📚' : '🎓'}
                </div>
                <h3>{t(c.titleKey)}</h3>
                <p className="muted">{t(c.descKey)}</p>
                <Link to="/academics" className="ui-btn ui-btn--ghost programs__link">
                  {t('btn.learnMore')}
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
