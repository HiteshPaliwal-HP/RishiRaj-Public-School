import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../ui/SectionTitle'
import { ScrollReveal } from '../ui/ScrollReveal'
import './WhyChooseSection.css'

const keys = [
  ['f1t', 'f1d'],
  ['f2t', 'f2d'],
  ['f3t', 'f3d'],
  ['f4t', 'f4d'],
  ['f5t', 'f5d'],
  ['f6t', 'f6d'],
] as const

export function WhyChooseSection() {
  const { t } = useTranslation()
  return (
    <section className="why section section--cream">
      <div className="rr-container">
        <SectionTitle title={t('home.why.title')} align="center" />
        <div className="why__grid">
          {keys.map(([title, desc], i) => (
            <ScrollReveal key={title} delayMs={i * 80}>
              <div className="why__box">
                <h3>{t(`home.why.${title}`)}</h3>
                <p className="muted">{t(`home.why.${desc}`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
