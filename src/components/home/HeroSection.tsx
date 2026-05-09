import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { site } from '../../config/site'
import heroSchoolUrl from '../../../Images/School.jpg?url'

const HERO_IMAGE = heroSchoolUrl

const FLOAT_SPECS = [
  { left: '8%', top: '22%', size: 3, dur: 14, y: 12 },
  { left: '78%', top: '18%', size: 4, dur: 18, y: 16 },
  { left: '62%', top: '42%', size: 2, dur: 12, y: 10 },
  { left: '18%', top: '58%', size: 3, dur: 16, y: 14 },
  { left: '88%', top: '68%', size: 2, dur: 20, y: 11 },
  { left: '34%', top: '28%', size: 2, dur: 15, y: 9 },
] as const

const listParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/**
 * Full-viewport premium hero (Tailwind + Framer Motion).
 * Background: project root `Images/School.jpg` (same folder as gallery assets)
 */
export function HeroSection() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  const staggerParent = reduceMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } }
    : listParent

  const staggerItem = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : listItem

  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden text-white"
      aria-label={site.schoolName}
    >
      {/* Background image + Ken Burns zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        initial={false}
        animate={
          reduceMotion
            ? { scale: 1 }
            : { scale: [1, 1.05] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 28, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }
        }
        aria-hidden
      />

      {/* Subtle frosted veil over photo (backdrop feel) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] backdrop-blur-[2px]"
        aria-hidden
      />

      {/* Spec overlay + readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/70 to-black/30"
        aria-hidden
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />

      {/* Soft light wash */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 z-[2] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.12),transparent_68%)] blur-3xl"
        aria-hidden
      />

      {/* Floating dust / particles */}
      {!reduceMotion &&
        FLOAT_SPECS.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute z-[2] rounded-full bg-white/25 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -p.y, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            aria-hidden
          />
        ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:px-10 lg:px-12">
        <motion.div
          className="mx-auto w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-lg sm:p-8 md:mx-0 md:ml-4 md:max-w-lg lg:ml-8 lg:max-w-xl text-center md:text-left"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={staggerItem}
            className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90 md:justify-start"
          >
            {t('homeEmergent.heroPill', { est: site.establishedDisplay, region: site.pillRegion })}
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-display text-3xl font-bold leading-[1.12] tracking-tight !text-white sm:text-4xl lg:text-5xl"
          >
            <span className="!text-white">{t('homeEmergent.heroTitleBefore')}</span>
            <span className="!text-[#facc15]">{t('homeEmergent.heroTitleAccent')}</span>
            <span className="!text-white">{t('homeEmergent.heroTitleAfter')}</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg"
          >
            {t('homeEmergent.heroLead', { school: site.schoolName })}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:justify-start"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/admissions"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#facc15] px-6 py-3.5 text-sm font-bold !text-black visited:!text-black shadow-[0_0_0_1px_rgba(250,204,21,0.4)] transition-[box-shadow,transform] duration-200 hover:!text-black hover:shadow-[0_0_32px_rgba(250,204,21,0.55)] sm:w-auto"
              >
                {t('homeEmergent.ctaAdmissions')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/about"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/50 bg-transparent px-6 py-3.5 text-sm font-semibold !text-white visited:!text-white transition-colors duration-200 hover:!text-white hover:bg-white/10 sm:w-auto"
              >
                {t('homeEmergent.ctaAbout')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
