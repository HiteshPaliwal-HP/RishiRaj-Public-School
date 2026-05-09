import type { FormEvent } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { site } from '../config/site'
import { submitAdmissionPayload } from '../services/formsAdapter'
import { Button } from '../components/ui/Button'
import { FormSubmitFeedback } from '../components/forms/FormSubmitFeedback'
import './Admissions.css'

const faqs = [
  {
    q: 'What is the medium of instruction?',
    a: 'We offer both English Medium (Class 1–10) and Hindi Medium (Nursery–12).',
  },
  {
    q: 'Is there a school bus facility?',
    a: 'Yes, school transport is available for nearby villages and areas.',
  },
  {
    q: 'What board is the school affiliated to?',
    a: 'Rajasthan Board of Secondary Education (RBSE).',
  },
  {
    q: 'Are there scholarships available?',
    a: 'Yes, merit-based scholarships and concessions for economically weaker sections.',
  },
  {
    q: 'Can we visit the school before applying?',
    a: 'Absolutely! School visits are welcome Mon–Sat, 9 AM–3 PM.',
  },
  {
    q: 'Is mid-session admission possible?',
    a: 'Subject to seat availability. Please contact the school office.',
  },
] as const

export function Admissions() {
  const { t } = useTranslation()
  const [medium, setMedium] = useState<'en' | 'hi'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    classApplying: 'Class 1',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err' | 'mailto'>('idle')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const r = await submitAdmissionPayload(form)
    if (r.usedMailtoFallback) setStatus('mailto')
    else if (r.ok) setStatus('ok')
    else setStatus('err')
  }

  return (
    <>
      <PageHero
        variant="text"
        eyebrow={t('nav.admissions')}
        title={t('admissionsPage.title', { year: '2026–27' })}
        subtitle={t('admissionsPage.subtitle')}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('nav.admissions') },
        ]}
      />
      <div className="admissions-banner">{t('admissionsPage.banner')}</div>

      <section className="admissions em-section">
        <div className="rr-container">
          {/* Medium toggle */}
          <div className="academics__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={medium === 'en'}
              className={`academics__tab ${medium === 'en' ? 'is-active' : ''}`.trim()}
              onClick={() => setMedium('en')}
            >
              {t('academicsPage.tabEnglish')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={medium === 'hi'}
              className={`academics__tab ${medium === 'hi' ? 'is-active' : ''}`.trim()}
              onClick={() => setMedium('hi')}
            >
              {t('academicsPage.tabHindi')}
            </button>
          </div>

          {/* Age / overview cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`overview-${medium}`}
              className="admissions__overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {medium === 'en' ? (
                <>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Pre-Primary</h3>
                    <p>Nursery, KG — Age: 3 to 5 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Primary</h3>
                    <p>Class 1–5 — Age: 6 to 10 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Middle</h3>
                    <p>Class 6–8 — Age: 11 to 13 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Secondary</h3>
                    <p>Class 9–10 — Age: 14 to 15 years</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Pre-Primary</h3>
                    <p>Nursery, KG — Age: 3 to 5 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Primary</h3>
                    <p>Class 1–5 — Age: 6 to 10 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Middle</h3>
                    <p>Class 6–8 — Age: 11 to 13 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Secondary</h3>
                    <p>Class 9–10 — Age: 14 to 15 years</p>
                  </div>
                  <div className="admissions__card em-card em-card--interactive">
                    <h3>Sr. Secondary</h3>
                    <p>Class 11–12 — Age: 16 to 17 years</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <h2>{t('admissionsPage.processTitle')}</h2>
          <ol className="admissions__steps">
            {[
              'Visit school / contact us',
              'Collect application form',
              'Fill & submit with documents',
              'Entrance assessment',
              'Fee payment & enrollment',
            ].map((s, i) => (
              <li key={s} className="admissions__step em-card em-card--interactive">
                <span className="admissions__step-num">{i + 1}</span>
                <div>
                  <strong>Step {i + 1}</strong>
                  <p className="muted">{s}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2>{t('admissionsPage.documentsTitle')}</h2>
          <div className="admissions__docs">
            <div>
              <h4>General</h4>
              <ul>
                <li>Birth certificate</li>
                <li>Aadhaar (child + parents)</li>
                <li>Passport photos (4)</li>
                <li>Transfer certificate (if applicable)</li>
                <li>Previous report card</li>
              </ul>
            </div>
            <div>
              <h4>Class 9–12</h4>
              <ul>
                <li>Class 8/10 mark sheet (original + copy)</li>
                <li>Transfer certificate</li>
                <li>Character certificate</li>
                <li>Caste certificate (if applicable)</li>
              </ul>
            </div>
          </div>

          <h2>{t('admissionsPage.feeTitle')}</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={`fee-${medium}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {medium === 'en' ? (
                <>
                  <p className="admissions__medium-label">{t('academicsPage.tabEnglish')} — Nursery to Class 10</p>
                  <div className="admissions__table-wrap">
                    <table className="admissions__table">
                      <thead>
                        <tr>
                          <th>Class level</th>
                          <th>Annual fee (approx.)</th>
                          <th>Monthly tuition</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pre-Primary (Nursery–KG)</td>
                          <td>₹8,000 – ₹10,000</td>
                          <td>₹700 – ₹900</td>
                        </tr>
                        <tr>
                          <td>Primary (Class 1–5)</td>
                          <td>₹10,000 – ₹12,000</td>
                          <td>₹900 – ₹1,100</td>
                        </tr>
                        <tr>
                          <td>Middle (Class 6–8)</td>
                          <td>₹12,000 – ₹15,000</td>
                          <td>₹1,100 – ₹1,300</td>
                        </tr>
                        <tr>
                          <td>Secondary (Class 9–10)</td>
                          <td>₹15,000 – ₹18,000</td>
                          <td>₹1,300 – ₹1,600</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <p className="admissions__medium-label">{t('academicsPage.tabHindi')} — Nursery to Class 12</p>
                  <div className="admissions__table-wrap">
                    <table className="admissions__table">
                      <thead>
                        <tr>
                          <th>Class level</th>
                          <th>Annual fee (approx.)</th>
                          <th>Monthly tuition</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pre-Primary (Nursery–KG)</td>
                          <td>₹7,000 – ₹9,000</td>
                          <td>₹600 – ₹800</td>
                        </tr>
                        <tr>
                          <td>Primary (Class 1–5)</td>
                          <td>₹9,000 – ₹11,000</td>
                          <td>₹800 – ₹1,000</td>
                        </tr>
                        <tr>
                          <td>Middle (Class 6–8)</td>
                          <td>₹11,000 – ₹14,000</td>
                          <td>₹1,000 – ₹1,200</td>
                        </tr>
                        <tr>
                          <td>Secondary (Class 9–10)</td>
                          <td>₹14,000 – ₹17,000</td>
                          <td>₹1,200 – ₹1,500</td>
                        </tr>
                        <tr>
                          <td>Sr. Secondary (Class 11–12)</td>
                          <td>₹17,000 – ₹21,000</td>
                          <td>₹1,500 – ₹1,900</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <p className="muted">{t('admissionsPage.feeNote1')}</p>
          <p className="muted">{t('admissionsPage.feeNote2')}</p>

          <div className="admissions__dates">
            <h3>{t('admissionsPage.datesTitle')}</h3>
            <ul>
              <li>Forms available: January onwards</li>
              <li>Last date to submit: March 31, 2026</li>
              <li>Entrance assessment: First week of April 2026</li>
              <li>Results & enrollment: April 15, 2026 onwards</li>
              <li>Session begins: June 1, 2026</li>
            </ul>
          </div>

          <div className="admissions__team">
            <h3>{t('admissionsPage.contactTeam')}</h3>
            <p>
              📞 {site.phones[0]} · {site.emails[1]}
            </p>
            <p className="muted">Office: Mon–Sat, 9:00 AM – 4:00 PM</p>
          </div>

          <h2>{t('admissionsPage.faqTitle')}</h2>
          <div className="admissions__faq">
            {faqs.map((item, i) => (
              <div key={item.q} className="admissions__faq-item">
                <button
                  type="button"
                  className="admissions__faq-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {item.q}
                </button>
                {openFaq === i ? <p className="admissions__faq-a">{item.a}</p> : null}
              </div>
            ))}
          </div>

          <h2>Quick enquiry</h2>
          <AnimatePresence mode="wait">
            {status === 'ok' ? (
              <FormSubmitFeedback key="ok" variant="success" className="admissions__form-feedback">
                {t('contactPage.success')}
              </FormSubmitFeedback>
            ) : (
              <form key="form" className="admissions__form" onSubmit={onSubmit}>
                {status === 'mailto' ? (
                  <FormSubmitFeedback variant="notice" className="admissions__form-feedback">
                    {t('emergentContact.mailtoNotice')}
                  </FormSubmitFeedback>
                ) : null}
                {status === 'err' ? (
                  <FormSubmitFeedback variant="error" className="admissions__form-feedback">
                    {t('emergentContact.sendError')}
                  </FormSubmitFeedback>
                ) : null}
                <label>
                  {t('forms.parentName')}
                  <input
                    required
                    name="parentName"
                    value={form.parentName}
                    onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  />
                </label>
                <label>
                  {t('forms.phone')}
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>
                <label>
                  {t('forms.email')}
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <label>
                  {t('forms.childName')}
                  <input
                    required
                    name="childName"
                    value={form.childName}
                    onChange={(e) => setForm({ ...form, childName: e.target.value })}
                  />
                </label>
                <label>
                  {t('forms.classApply')}
                  <select
                    name="classApplying"
                    value={form.classApplying}
                    onChange={(e) => setForm({ ...form, classApplying: e.target.value })}
                  >
                    {['Nursery', 'KG', ...Array.from({ length: 12 }, (_, n) => `Class ${n + 1}`)].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label>
                  {t('forms.message')}
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </label>
                <Button type="submit" variant="primary" className="ui-btn--block" disabled={status === 'sending'}>
                  {status === 'sending' ? t('forms.submitSending') : t('btn.sendMessage')}
                </Button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
