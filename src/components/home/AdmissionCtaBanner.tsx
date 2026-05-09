import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../ui/Button.css'
import './AdmissionCta.css'

export function AdmissionCtaBanner() {
  const { t } = useTranslation()
  return (
    <section className="admission-cta">
      <div className="rr-container admission-cta__inner">
        <p className="admission-cta__text">
          {t('home.admissionCta.line', { year: '2026–27' })}
        </p>
        <Link to="/admissions" className="ui-btn ui-btn--primary admission-cta__btn">
          {t('btn.applyNow')}
        </Link>
      </div>
    </section>
  )
}
