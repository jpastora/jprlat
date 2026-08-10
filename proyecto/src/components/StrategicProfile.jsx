import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import PageSection from './PageSection.jsx'
import ProfileBento from './ProfileBento.jsx'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

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

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="lg:col-span-5"
        >
          <p className="font-body text-base leading-[1.5] text-carbon">{p.about}</p>
          <p className="mt-4 font-body text-base leading-[1.5] text-carbon">{p.aboutContinued}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_EXPO }}
          className="grid gap-8 sm:grid-cols-2 lg:col-span-7"
        >
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
        </motion.div>
      </div>

      <div className="mt-12">
        <p className="mb-4 font-mono text-[0.875rem] text-tech">{p.bento.numbersTitle}</p>
        <ProfileBento profile={p} />
      </div>

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
            <footer className="mt-4 font-body text-[0.875rem] text-tech">— {p.mission.title}</footer>
          </blockquote>
          <blockquote className="max-w-prose">
            <p className="font-heading text-[1.375rem] font-semibold leading-[1.5] text-carbon sm:text-[1.5rem]">
              {p.vision.text}
            </p>
            <footer className="mt-4 font-body text-[0.875rem] text-tech">— {p.vision.title}</footer>
          </blockquote>
        </div>
      </motion.div>
    </PageSection>
  )
}
