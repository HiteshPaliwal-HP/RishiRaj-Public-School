import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import './Academics.css'

const tabItemVariants = {
  hidden: (reduce: boolean) => ({
    opacity: reduce ? 1 : 0,
    y: reduce ? 0 : 8,
  }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Academics() {
  const { t } = useTranslation()
  const [medium, setMedium] = useState<'en' | 'hi'>('en')
  const reduceMotion = useReducedMotion() ?? false

  const tabList = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  }

  return (
    <>
      <PageHero
        variant="text"
        eyebrow={t('nav.academics')}
        title={t('academicsPage.title')}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('academicsPage.title') },
        ]}
      />
      <section className="academics em-section">
        <div className="rr-container">
          <motion.div
            className="academics__tabs"
            role="tablist"
            variants={tabList}
            initial="hidden"
            animate="show"
          >
            <motion.button
              type="button"
              role="tab"
              aria-selected={medium === 'en'}
              className={`academics__tab ${medium === 'en' ? 'is-active' : ''}`.trim()}
              onClick={() => setMedium('en')}
              variants={tabItemVariants}
              custom={reduceMotion}
            >
              {t('academicsPage.tabEnglish')}
            </motion.button>
            <motion.button
              type="button"
              role="tab"
              aria-selected={medium === 'hi'}
              className={`academics__tab ${medium === 'hi' ? 'is-active' : ''}`.trim()}
              onClick={() => setMedium('hi')}
              variants={tabItemVariants}
              custom={reduceMotion}
            >
              {t('academicsPage.tabHindi')}
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={medium}
              className="academics__panel-wrap"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {medium === 'en' ? (
                <div className="academics__panel">
                  <h2>{t('academicsPage.emHeading')}</h2>
                  <p className="muted">{t('academicsPage.emIntro')}</p>
                  <div className="academics__table-wrap">
                    <table className="academics__table">
                      <thead>
                        <tr>
                          <th>Level</th>
                          <th>Classes</th>
                          <th>Subjects offered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pre-Primary</td>
                          <td>Nursery, KG</td>
                          <td>English Alphabets, Numbers, Drawing, Rhymes, Moral Stories, Activity-Based Learning</td>
                        </tr>
                        <tr>
                          <td>Primary</td>
                          <td>Class 1–5</td>
                          <td>English, Hindi, Maths, EVS, General Knowledge, Arts & Crafts, Computer Basics</td>
                        </tr>
                        <tr>
                          <td>Middle</td>
                          <td>Class 6–8</td>
                          <td>English, Hindi, Maths, Science, Social Studies, Computer, Sanskrit</td>
                        </tr>
                        <tr>
                          <td>Secondary</td>
                          <td>Class 9–10</td>
                          <td>English, Hindi, Maths, Science, Social Science, IT, Physical Education</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="academics__note">{t('academicsPage.noteEm')}</p>
                </div>
              ) : (
                <div className="academics__panel">
                  <h2>{t('academicsPage.hmHeading')}</h2>
                  <p className="muted">{t('academicsPage.hmIntro')}</p>
                  <div className="academics__table-wrap">
                    <table className="academics__table">
                      <thead>
                        <tr>
                          <th>Level</th>
                          <th>Classes</th>
                          <th>Subjects</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pre-Primary</td>
                          <td>Nursery, KG</td>
                          <td>Hindi alphabets, numbers, drawing, activities</td>
                        </tr>
                        <tr>
                          <td>Primary</td>
                          <td>Class 1–5</td>
                          <td>Hindi, English, Maths, EVS, GK, Art</td>
                        </tr>
                        <tr>
                          <td>Middle</td>
                          <td>Class 6–8</td>
                          <td>Hindi, English, Maths, Science, Social Studies</td>
                        </tr>
                        <tr>
                          <td>Secondary</td>
                          <td>Class 9–10</td>
                          <td>Full RBSE curriculum</td>
                        </tr>
                        <tr>
                          <td>Senior Secondary</td>
                          <td>Class 11–12</td>
                          <td>Science / Arts / Commerce streams</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="academics__note">{t('academicsPage.noteHm')}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <SectionTitle title={t('academicsPage.methodologyTitle')} />
          <div className="academics__cards">
            {[
              'Activity-based learning (Pre-Primary)',
              'Conceptual & analytical (Middle School)',
              'Board-exam focused (Secondary)',
              'Career guidance (Senior Secondary)',
            ].map((text) => (
              <Card key={text}>
                <p>{text}</p>
              </Card>
            ))}
          </div>

          <SectionTitle title={t('academicsPage.subjectsTitle')} />
          <div className="academics__pills">
            {['NCC', 'Yoga', 'Sports', 'Drawing', 'Music', 'Computer Lab'].map((p) => (
              <span key={p} className="academics__pill">
                {p}
              </span>
            ))}
          </div>

          <SectionTitle title={t('academicsPage.examTitle')} />
          <p>{t('academicsPage.examBody')}</p>

          <SectionTitle title={t('academicsPage.scholarshipTitle')} />
          <p>{t('academicsPage.scholarshipBody')}</p>
        </div>
      </section>
    </>
  )
}
