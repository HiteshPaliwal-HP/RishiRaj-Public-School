import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import './styles/tailwind.css'
import './styles/variables.css'
import './styles/emergent-theme.css'
import './styles/inner-pages.css'
import './styles/globals.css'
import './styles/animations.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </MotionConfig>
  </StrictMode>,
)

