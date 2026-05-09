import type { FormEvent } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { submitSimpleContactPayload } from '../services/formsAdapter'
import { FormSubmitFeedback } from '../components/forms/FormSubmitFeedback'
import './Contact.css'

function IconCampus() {
  return (
    <svg className="em-contact__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="em-contact__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="em-contact__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5" />
      <path d="m22 6-10 7L2 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg className="em-contact__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err' | 'validate' | 'mailto'>('idle')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const em = email.trim()
    const msg = message.trim()
    if (!n || !em || !msg) {
      setStatus('validate')
      return
    }
    setStatus('sending')
    const r = await submitSimpleContactPayload({
      name: n,
      email: em,
      subject: subject.trim(),
      message: msg,
    })
    if (r.usedMailtoFallback) setStatus('mailto')
    else if (r.ok) setStatus('ok')
    else setStatus('err')
  }

  const phoneHref = site.phones[0]?.replace(/\s/g, '') ?? ''

  return (
    <div className="em-contact">
      <header className="em-contact__hero rr-container">
        <nav className="em-contact__crumbs" aria-label="Breadcrumb">
          <Link to="/">{t('breadcrumb.home')}</Link>
          <span className="em-contact__crumb-sep">/</span>
          <span>{t('nav.contact')}</span>
        </nav>
        <p className="rr-eyebrow">{t('emergentContact.eyebrow')}</p>
        <h1 className="em-contact__title font-display">
          {t('emergentContact.titleLine1')}
          <span className="em-contact__title-accent">{t('emergentContact.titleAccent')}</span>
        </h1>
        <p className="em-contact__intro">{t('emergentContact.intro')}</p>
      </header>

      <div className="rr-container em-contact__grid">
        <aside className="em-contact__cards">
          <div className="em-contact__card">
            <IconCampus />
            <div>
              <div className="em-contact__card-label">{t('emergentContact.campus')}</div>
              <p className="em-contact__card-value">{site.addressOneLine}</p>
            </div>
          </div>
          <div className="em-contact__card">
            <IconPhone />
            <div>
              <div className="em-contact__card-label">{t('emergentContact.phone')}</div>
              <a className="em-contact__card-link" href={`tel:${phoneHref}`}>
                {site.phones[0]}
              </a>
            </div>
          </div>
          <div className="em-contact__card">
            <IconMail />
            <div>
              <div className="em-contact__card-label">{t('emergentContact.email')}</div>
              <a className="em-contact__card-link" href={`mailto:${site.emails[0]}`}>
                {site.emails[0]}
              </a>
            </div>
          </div>
          <div className="em-contact__card">
            <IconClock />
            <div>
              <div className="em-contact__card-label">{t('emergentContact.hours')}</div>
              <p className="em-contact__card-value">{t('emergentContact.hoursValue')}</p>
            </div>
          </div>
        </aside>

        <div className="em-contact__form-wrap">
          <form className="em-contact__form" onSubmit={onSubmit} noValidate>
            <label className="em-contact__field">
              <span>{t('emergentContact.nameLabel')}</span>
              <input
                name="name"
                autoComplete="name"
                placeholder={t('emergentContact.namePh')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="em-contact__field">
              <span>{t('emergentContact.emailLabel')}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('emergentContact.emailPh')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="em-contact__field">
              <span>{t('emergentContact.subjectLabel')}</span>
              <input
                name="subject"
                placeholder={t('emergentContact.subjectPh')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>
            <label className="em-contact__field">
              <span>{t('emergentContact.messageLabel')}</span>
              <textarea
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <AnimatePresence mode="wait">
              {status === 'validate' ? (
                <motion.p
                  key="validate"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="em-contact__msg em-contact__msg--warn"
                  role="alert"
                >
                  {t('emergentContact.fillError')}
                </motion.p>
              ) : null}
              {status === 'err' ? (
                <FormSubmitFeedback key="err" variant="error" className="em-contact__form-feedback">
                  {t('emergentContact.sendError')}
                </FormSubmitFeedback>
              ) : null}
              {status === 'ok' ? (
                <FormSubmitFeedback key="ok" variant="success" className="em-contact__form-feedback">
                  {t('emergentContact.toastOk')}
                </FormSubmitFeedback>
              ) : null}
              {status === 'mailto' ? (
                <FormSubmitFeedback key="mailto" variant="notice" className="em-contact__form-feedback">
                  {t('emergentContact.mailtoNotice')}
                </FormSubmitFeedback>
              ) : null}
            </AnimatePresence>

            <button type="submit" className="em-contact__submit" disabled={status === 'sending'}>
              {status === 'sending' ? t('forms.submitSending') : t('emergentContact.sendBtn')}
            </button>
          </form>
        </div>
      </div>

      <section className="em-contact__map-section rr-container">
        <h2 className="em-contact__map-heading font-display">{t('contactPage.mapTitle')}</h2>
        <iframe className="em-contact__map" title={t('contactPage.mapTitle')} src={site.mapEmbedUrl} loading="lazy" />
      </section>
    </div>
  )
}
