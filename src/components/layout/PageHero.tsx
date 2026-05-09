import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './PageHero.css'

interface PageHeroProps {
  title: string
  subtitle?: string
  /** Full-bleed photo hero (default when provided). */
  imageUrl?: string
  /** Light “Emergent” hero: white band, ink text, no photo. */
  variant?: 'photo' | 'text'
  /** e.g. [['Home','/'], ['About','/about']] */
  crumbs?: readonly { label: string; to?: string }[]
  short?: boolean
  eyebrow?: string
}

const itemVariants = {
  hidden: (reduce: boolean) => ({
    opacity: reduce ? 1 : 0,
    y: reduce ? 0 : 12,
  }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function PageHero({
  title,
  subtitle,
  imageUrl,
  variant,
  crumbs,
  short = true,
  eyebrow,
}: PageHeroProps) {
  const resolvedVariant = variant ?? (imageUrl ? 'photo' : 'text')
  const isText = resolvedVariant === 'text'
  const reduceMotion = useReducedMotion() ?? false

  const contentVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
    },
  }

  const sectionClass = [
    'page-hero',
    short ? 'page-hero--short' : '',
    isText ? 'page-hero--text' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={sectionClass}
      style={isText ? undefined : { backgroundImage: `url(${imageUrl})` }}
    >
      {!isText ? <div className="page-hero__overlay" /> : null}
      <div className="page-hero__inner rr-container">
        <motion.div
          className="page-hero__motion"
          variants={contentVariants}
          initial="hidden"
          animate="show"
        >
          {crumbs?.length ? (
            <motion.nav
              className="page-hero__crumbs"
              aria-label="Breadcrumb"
              variants={itemVariants}
              custom={reduceMotion}
            >
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="page-hero__crumb">
                  {i > 0 ? <span className="page-hero__sep">/</span> : null}
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                </span>
              ))}
            </motion.nav>
          ) : null}
          {eyebrow ? (
            <motion.p className="page-hero__eyebrow rr-eyebrow" variants={itemVariants} custom={reduceMotion}>
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1 className="page-hero__title" variants={itemVariants} custom={reduceMotion}>
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p className="page-hero__subtitle" variants={itemVariants} custom={reduceMotion}>
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
