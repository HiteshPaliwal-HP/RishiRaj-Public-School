import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PRIMARY_NAV } from '../../config/nav'
import { site } from '../../config/site'
import './Navbar.css'

function GradIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden width={20} height={20}>
      <path
        fill="currentColor"
        d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
      />
    </svg>
  )
}

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === '/'
  const onHero = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const setLang = (lng: string) => {
    void i18n.changeLanguage(lng)
  }

  return (
    <header
      className={`em-nav ${scrolled ? 'em-nav--scrolled' : ''} ${isHome ? 'em-nav--home' : ''} ${onHero ? 'em-nav--on-hero' : ''}`.trim()}
    >
      <div className="rr-container em-nav__inner">
        <Link to="/" className="em-nav__brand">
          <span className="em-nav__brand-icon" aria-hidden>
            <GradIcon />
          </span>
          <span className="em-nav__brand-text">
            <span className="em-nav__brand-name">{site.schoolName}</span>
            <span className="em-nav__brand-loc">{site.locationLine}</span>
          </span>
        </Link>

        <nav className="em-nav__desktop" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `em-nav__link ${isActive ? 'em-nav__link--active' : ''}`.trim()
              }
            >
              <span className="em-nav__link-inner">
                {t(`nav.${item.key}`)}
                <span className="em-nav__underline" aria-hidden />
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="em-nav__actions">
          <div className="em-nav__lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`em-nav__lang-btn ${i18n.language === 'en' ? 'is-active' : ''}`.trim()}
              onClick={() => setLang('en')}
            >
              {t('nav.langEn')}
            </button>
            <button
              type="button"
              className={`em-nav__lang-btn ${i18n.language === 'hi' ? 'is-active' : ''}`.trim()}
              onClick={() => setLang('hi')}
            >
              {t('nav.langHi')}
            </button>
          </div>
          <Link to="/admissions" className="em-nav__cta">
            {t('nav.admissionsOpen')}
            <span className="em-nav__cta-dot" aria-hidden />
          </Link>
          <button
            type="button"
            className={`em-nav__burger ${open ? 'is-open' : ''}`.trim()}
            aria-expanded={open}
            aria-controls="em-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="em-mobile-menu" className={`em-nav__drawer ${open ? 'is-open' : ''}`.trim()}>
        <div className="em-nav__drawer-inner">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `em-nav__drawer-link ${isActive ? 'is-active' : ''}`.trim()
              }
              onClick={() => setOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
          <Link to="/admissions" className="em-nav__drawer-cta" onClick={() => setOpen(false)}>
            {t('nav.admissionsOpen')}
          </Link>
        </div>
      </div>
    </header>
  )
}

