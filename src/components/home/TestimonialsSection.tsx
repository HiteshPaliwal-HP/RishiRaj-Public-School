import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { testimonialsData } from '../../data/testimonials'
import { SectionTitle } from '../ui/SectionTitle'
import './TestimonialsSection.css'

export function TestimonialsSection() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonialsData.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  const current = testimonialsData[index]!

  return (
    <section className="testimonials section section--navy">
      <div className="rr-container">
        <SectionTitle title={t('home.testimonials.title')} align="center" light />
        <blockquote className="testimonials__quote">
          <p>“{current.quote}”</p>
          <footer>
            <strong>{current.parentName}</strong>
            <span className="muted-light"> · {current.studentClass}</span>
            <div className="testimonials__stars" aria-label={`${current.rating} stars`}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </footer>
        </blockquote>
        <div className="testimonials__dots" role="tablist" aria-label="Testimonials">
            {testimonialsData.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`testimonials__dot ${i === index ? 'is-active' : ''}`.trim()}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
