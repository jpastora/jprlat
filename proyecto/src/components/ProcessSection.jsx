import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageSection from './PageSection.jsx'
import MaskReveal from './MaskReveal.jsx'
import { processSteps } from '../data/process.js'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

const ICONS = {
  diagnose: 'M8 32 L20 20 L32 26 L48 12',
  strategy: 'M10 36 H50 M30 36 V12 M20 22 L30 12 L40 22',
  build: 'M12 28 H48 M12 28 V16 H48 V28 M20 28 V36 M40 28 V36',
  measure: 'M8 32 L22 24 L34 28 L52 14',
}

function StepIcon({ type, active }) {
  const reduce = useReducedMotion()
  const d = ICONS[type] ?? ICONS.diagnose

  return (
    <svg width="56" height="40" viewBox="0 0 60 40" fill="none" className="shrink-0" aria-hidden="true">
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={active ? 'text-orange' : 'text-tech'}
        initial={reduce ? false : { pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.65, ease: EASE_EXPO }}
      />
    </svg>
  )
}

function ProcessStep({ step, copy, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  return (
    <motion.li
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE_EXPO }}
      className="relative flex flex-col gap-3 lg:flex-1"
    >
      {index < total - 1 && (
        <span
          className="pointer-events-none absolute left-4 top-8 hidden h-px w-[calc(100%+1rem)] bg-line lg:block"
          aria-hidden="true"
        />
      )}
      <div className="flex items-start gap-4">
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <span
            className={`h-2 w-2 rounded-full ${inView ? 'bg-orange' : 'bg-cool'}`}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs text-tech">{step.number}</span>
          <h3 className="mt-1 font-heading text-lg font-medium text-carbon">{copy.title}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-tech">{copy.text}</p>
          <div className="mt-4">
            <StepIcon type={step.icon} active={inView} />
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export default function ProcessSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <PageSection id="proceso" wide className="pb-28 pt-16 sm:pb-36 sm:pt-20">
      <div ref={ref}>
        <MaskReveal>
          <h2 className="max-w-[18ch] font-heading text-3xl font-semibold tracking-tight text-carbon sm:text-4xl">
            {t.process.title}
          </h2>
          <p className="mt-4 max-w-prose font-body text-base text-tech">{t.process.subtitle}</p>
        </MaskReveal>

        <div className="relative mt-12 hidden h-px bg-line lg:block" aria-hidden="true">
          {!reduce && (
            <motion.span
              className="absolute left-0 top-0 h-px origin-left bg-orange"
              style={{ scaleX: progress, width: '100%' }}
            />
          )}
        </div>

        <ol className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:gap-6">
          {processSteps.map((step, i) => (
            <ProcessStep
              key={step.id}
              step={step}
              copy={t.process.steps[step.id]}
              index={i}
              total={processSteps.length}
            />
          ))}
        </ol>
      </div>
    </PageSection>
  )
}
