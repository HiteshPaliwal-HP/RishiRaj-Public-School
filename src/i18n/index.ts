import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { enTranslation } from '../locales/enTranslation'
import { hiTranslation } from '../locales/hiTranslation'

const STORAGE_KEY = 'rrps_locale'

function getStoredLng(): string {
  if (typeof window === 'undefined') return 'en'
  return localStorage.getItem(STORAGE_KEY) || 'en'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation as unknown as Record<string, unknown> },
    /** Partial Hindi — missing keys use English fallback */
    hi: { translation: hiTranslation as unknown as Record<string, unknown> },
  },
  lng: getStoredLng(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function setHtmlLang(lng: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng === 'hi' ? 'hi' : 'en'
  }
}

setHtmlLang(i18n.language)

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng)
  }
  setHtmlLang(lng)
})

export default i18n
