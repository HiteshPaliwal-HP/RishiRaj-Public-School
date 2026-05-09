import './SectionTitle.css'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: 'left' | 'center'
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = 'left',
}: SectionTitleProps) {
  return (
    <header
      className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`.trim()}
    >
      {eyebrow ? <span className="section-title__eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle ? <p className="section-title__sub muted">{subtitle}</p> : null}
    </header>
  )
}
