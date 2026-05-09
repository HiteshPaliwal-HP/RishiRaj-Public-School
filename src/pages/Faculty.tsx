import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../components/layout/PageHero'
import { facultyData } from '../data/faculty'
import type { FacultyDepartment } from '../types/content'
import { Card } from '../components/ui/Card'
import './Faculty.css'

const tabs: { key: string; dept: FacultyDepartment | 'All' }[] = [
  { key: 'filterAll', dept: 'All' },
  { key: 'filterPrimary', dept: 'Primary' },
  { key: 'filterMiddle', dept: 'Middle School' },
  { key: 'filterSecondary', dept: 'Secondary' },
  { key: 'filterSenior', dept: 'Senior Secondary' },
  { key: 'filterAdmin', dept: 'Admin Staff' },
]

const facultyTabItem = {
  hidden: (reduce: boolean) => ({
    opacity: reduce ? 1 : 0,
    y: reduce ? 0 : 6,
  }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Faculty() {
  const { t } = useTranslation()
  const [dept, setDept] = useState<FacultyDepartment | 'All'>('All')
  const reduceMotion = useReducedMotion() ?? false

  const tabList = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.05 },
    },
  }

  const list = useMemo(
    () => (dept === 'All' ? facultyData : facultyData.filter((f) => f.department === dept)),
    [dept],
  )

  return (
    <>
      <PageHero
        variant="text"
        eyebrow={t('nav.faculty')}
        title={t('facultyPage.title')}
        subtitle={t('facultyPage.subtitle')}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('nav.faculty') },
        ]}
      />
      <section className="faculty-stats em-section section--navy">
        <div className="rr-container faculty-stats__inner">
          {t('facultyPage.stats', { n: 45, y: 15 })}
        </div>
      </section>
      <section className="faculty em-section">
        <div className="rr-container">
          <motion.div
            className="faculty__tabs"
            variants={tabList}
            initial="hidden"
            animate="show"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                type="button"
                className={`faculty__tab ${dept === tab.dept ? 'is-active' : ''}`.trim()}
                onClick={() => setDept(tab.dept)}
                variants={facultyTabItem}
                custom={reduceMotion}
              >
                {t(`facultyPage.${tab.key}`)}
              </motion.button>
            ))}
          </motion.div>
          <div className="faculty__grid">
            {list.map((f) => (
              <Card key={f.id}>
                <img src={f.photo} alt="" className="faculty__photo" />
                <h3>{f.name}</h3>
                <p className="muted">{f.subject}</p>
                <p className="faculty__meta">
                  {f.qualification} · {f.experience}
                </p>
                <span className="faculty__badge">{f.department}</span>
                {f.bio ? <p className="faculty__bio">{f.bio}</p> : null}
              </Card>
            ))}
          </div>
          <div className="faculty__join">
            <h3>{t('facultyPage.joinTitle')}</h3>
            <p>{t('facultyPage.joinText')}</p>
            <a className="faculty__join-link" href={`mailto:${t('facultyPage.joinCta')}`}>
              {t('facultyPage.joinCta')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
