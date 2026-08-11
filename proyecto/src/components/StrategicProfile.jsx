import { useRef } from 'react'
import { Download } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import PageSection from './PageSection.jsx'
import CountUp from './CountUp.jsx'
import ProfilePhoto from './ProfilePhoto.jsx'
import StackIcons from './StackIcons.jsx'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { track } from '../lib/analytics.js'
import cvUrl from '../assets/cv/joseph-pastora-cv.pdf'

function StatementLine({ parts }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  return (
    <p
      ref={ref}
      className="max-w-[28ch] font-heading text-[2rem] font-semibold leading-[1.15] tracking-tight text-carbon sm:text-[2.5rem] lg:text-[3rem]"
    >
      {parts.map((part, i) => (
        <motion.span
          key={`${part.text}-${i}`}
          className={part.accent ? 'text-orange' : undefined}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: i * 0.08, duration: 0.55, ease: EASE_EXPO }}
        >
          {part.text}
        </motion.span>
      ))}
    </p>
  )
}

export default function StrategicProfile() {
  const { t } = useLanguage()
  const p = t.profile
  const b = p.bento

  return (
    <PageSection
      id="perfil"
      tone="bleed-soft"
      wide
      className="-mt-8 pb-28 pt-20 sm:pb-36 sm:pt-28"
    >
      <div className="max-w-3xl">
        <StatementLine parts={p.statement} />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="mt-6 max-w-prose font-body text-base leading-[1.5] text-tech"
        >
          {p.intro}
        </motion.p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="order-2 flex h-full flex-col gap-8 lg:order-1 lg:col-span-7"
        >
          <div>
            <p className="font-body text-base leading-[1.5] text-carbon">{p.about}</p>
            <p className="mt-4 font-body text-base leading-[1.5] text-carbon">{p.aboutContinued}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">
                {p.technical.title}
              </h3>
              <p className="mt-3 font-body text-base leading-[1.5] text-tech">{p.technical.text}</p>
            </div>
            <div>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">
                {p.human.title}
              </h3>
              <p className="mt-3 font-body text-base leading-[1.5] text-tech">{p.human.text}</p>
            </div>
          </div>

          <a
            href={cvUrl}
            download="joseph-pastora-cv.pdf"
            onClick={() => track('cv_download', { source: 'profile' })}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-body text-base font-medium text-carbon transition-colors hover:border-orange hover:text-orange"
          >
            <Download size={16} strokeWidth={1.6} aria-hidden="true" />
            {t.cta.downloadCv}
          </a>

          <div className="mt-auto border-t border-line pt-8">
            <p className="font-body text-[0.875rem] font-medium uppercase tracking-wide text-tech">
              {b.brandsLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.credibility.map((brand) => (
                <span
                  key={brand}
                  className="rounded-md border border-line bg-white px-2.5 py-1 font-body text-base text-carbon dark:bg-soft/50"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-body text-base text-tech">{b.stackPrefix}</span>
              <StackIcons className="gap-2" />
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_EXPO }}
          className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:col-span-5 lg:mx-0 lg:h-full lg:justify-self-end"
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-white dark:bg-soft/50">
            <ProfilePhoto compact flush showGazeAccent={false} className="mx-auto" />
            <div className="shrink-0 border-t border-line px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-body text-base text-tech">{b.experienceLabel}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <CountUp
                  value={p.experienceValue}
                  className="font-heading text-4xl font-bold text-carbon sm:text-5xl"
                />
                <span className="font-heading text-3xl font-bold text-carbon sm:text-4xl">+</span>
                <span className="ml-1 font-body text-base text-carbon sm:text-lg">{p.experienceUnit}</span>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      <p className="mt-10 font-body text-base leading-[1.5] text-tech">
        {b.locationValue} · {b.availability}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
        className="mt-20 border-t-2 border-orange pt-10"
      >
        <p className="mb-8 max-w-prose font-body text-base leading-[1.5] text-tech">
          {p.missionVisionIntro}
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <blockquote className="max-w-prose">
            <p className="font-heading text-[1.375rem] font-semibold leading-[1.5] text-carbon sm:text-[1.5rem]">
              {p.mission.text}
            </p>
            <footer className="mt-4 font-body text-base text-tech">— {p.mission.title}</footer>
          </blockquote>
          <blockquote className="max-w-prose">
            <p className="font-heading text-[1.375rem] font-semibold leading-[1.5] text-carbon sm:text-[1.5rem]">
              {p.vision.text}
            </p>
            <footer className="mt-4 font-body text-base text-tech">— {p.vision.title}</footer>
          </blockquote>
        </div>
      </motion.div>
    </PageSection>
  )
}
