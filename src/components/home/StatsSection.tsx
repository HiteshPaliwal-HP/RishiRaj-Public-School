import { AnimatedCounter } from '../ui/AnimatedCounter'
import { useTranslation } from 'react-i18next'
import './StatsSection.css'

export function StatsSection() {
  const { t } = useTranslation()
  return (
    <section id="stats" className="stats stats--emergent">
      <div className="rr-container stats__bar">
        <div className="stats__cell">
          <AnimatedCounter end={19} suffix="+" label={t('home.statsBar.years')} />
        </div>
        <div className="stats__cell">
          <AnimatedCounter end={2400} label={t('home.statsBar.students')} />
        </div>
        <div className="stats__cell">
          <AnimatedCounter end={180} suffix="+" label={t('home.statsBar.educators')} />
        </div>
        <div className="stats__cell">
          <AnimatedCounter end={42} label={t('home.statsBar.clubs')} />
        </div>
      </div>
    </section>
  )
}
