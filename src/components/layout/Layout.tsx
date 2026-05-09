import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const reduceMotion = useReducedMotion()

  return (
    <div className="page-shell">
      <ScrollToTop />
      <Navbar />
      <main
        className={`main-content ${isHome ? 'main-content--home' : 'main-content--padded'}`.trim()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
