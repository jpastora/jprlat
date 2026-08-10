import { useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import PageSection from './PageSection.jsx'
import MaskReveal from './MaskReveal.jsx'
import ProcessIllustration from '../assets/illustrations/ProcessIllustration.jsx'
import { processSteps } from '../data/process.js'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

const ICONS = {
  diagnose: 'M8 32 L20 20 L32 26 L48 12',
  strategy: 'M10 36 H50 M30 36 V12 M20 22 L30 12 L40 22',
  build: 'M12 28 H48 M12 28 V16 H48 V28 M20 28 V36 M40 28 V36',
  measure: 'M8 32 L22 24 L34 28 L52 14',
}

function StepIcon({ type, active, reduce }) {
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
        initial={false}
        animate={reduce ? { pathLength: 1 } : { pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
      />
    </svg>
  )
}

function ProcessStep({ step, copy, index, activeIndex, reduce, staticAll = false }) {
  const isActive = index === activeIndex
  const isPast = index < activeIndex
  const isLit = staticAll || isActive || isPast

  return (
    <motion.li
      layout
      animate={{
        opacity: isLit ? 1 : 0.42,
        scale: isActive && !reduce && !staticAll ? 1.02 : 1,
      }}
      transition={{ duration: 0.45, ease: EASE_EXPO }}
      className="relative flex flex-1 flex-col"
    >
      <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
          <motion.span
            className="h-2.5 w-2.5 rounded-full"
            animate={{
              backgroundColor: isLit ? '#FF6B00' : '#D1D5DB',
              scale: isActive && !reduce && !staticAll ? 1.35 : 1,
            }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            aria-hidden="true"
          />
        </span>

        <div className="min-w-0 flex-1">
          <motion.span
            key={staticAll ? step.number : `${step.number}-${isActive}`}
            initial={reduce || staticAll || !isActive ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block font-mono text-[0.875rem] text-tech"
          >
            {step.number}
          </motion.span>

          <div className="overflow-hidden">
            <motion.h3
              initial={false}
              animate={{
                y: isLit || reduce || staticAll ? 0 : '100%',
                color: isLit ? 'var(--color-carbon)' : '#6B7280',
              }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
              className="mt-1 font-heading text-[1.375rem] font-medium leading-[1.5]"
            >
              {copy.title}
            </motion.h3>
          </div>

          <motion.p
            animate={{ color: isLit ? 'var(--color-tech)' : '#6B7280' }}
            transition={{ duration: 0.35 }}
            className="mt-2 font-body text-base leading-[1.5]"
          >
            {copy.text}
          </motion.p>

          <div className="mt-4">
            <StepIcon type={step.icon} active={isLit} reduce={reduce || staticAll} />
          </div>
        </div>
      </div>
    </motion.li>
  )
}

function ProcessTimeline({ lineProgress, nodePosition, reduce }) {
  if (reduce) {
    return (
      <>
        <div className="relative mt-12 hidden h-px bg-orange lg:block" aria-hidden="true" />
        <div className="relative mt-10 lg:hidden">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-orange" aria-hidden="true" />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="relative mt-12 hidden lg:block">
        <div className="relative h-px bg-line" aria-hidden="true">
          <motion.div
            className="absolute left-0 top-0 h-px origin-left bg-orange"
            style={{ scaleX: lineProgress, width: '100%' }}
          />
          <motion.span
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_0_4px_var(--color-white)] dark:shadow-[0_0_0_4px_var(--color-soft)]"
            style={{ left: nodePosition }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative mt-10 lg:hidden">
        <div className="pointer-events-none absolute bottom-0 left-[1.125rem] top-0 w-px bg-line" aria-hidden="true">
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-orange"
            style={{ scaleY: lineProgress, height: '100%' }}
          />
          <motion.span
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange"
            style={{ top: nodePosition }}
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  )
}

function ProcessHeader({ title, subtitle, intro }) {
  return (
    <MaskReveal>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="max-w-[18ch] font-heading text-[2rem] font-semibold leading-[1.5] tracking-tight text-carbon sm:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-4 max-w-prose font-body text-base leading-[1.5] text-tech">{subtitle}</p>
          {intro && (
            <p className="mt-3 max-w-prose font-body text-base leading-[1.5] text-tech">{intro}</p>
          )}
        </div>
        <ProcessIllustration className="h-auto w-full max-w-[10rem] shrink-0 text-carbon opacity-80 sm:max-w-[12rem]" />
      </div>
    </MaskReveal>
  )
}

export default function ProcessSection() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.92', 'end 0.08'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.14, 0.86], [0, 1])
  const nodePosition = useTransform(lineProgress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return
    const idx = Math.min(
      processSteps.length - 1,
      Math.floor(v * processSteps.length),
    )
    setActiveIndex(idx)
  })

  const steps = (
    <ol className="relative mt-10 flex flex-col gap-12 pl-10 lg:mt-14 lg:flex-row lg:gap-6 lg:pl-0">
      {processSteps.map((step, i) => (
        <ProcessStep
          key={step.id}
          step={step}
          copy={t.process.steps[step.id]}
          index={i}
          activeIndex={reduce ? processSteps.length - 1 : activeIndex}
          reduce={reduce}
          staticAll={reduce}
        />
      ))}
    </ol>
  )

  if (reduce) {
    return (
      <PageSection id="proceso" wide className="relative pb-28 pt-16 sm:pb-36 sm:pt-20">
        <ProcessHeader title={t.process.title} subtitle={t.process.subtitle} intro={t.process.intro} />
        <ProcessTimeline lineProgress={lineProgress} nodePosition={nodePosition} reduce />
        {steps}
      </PageSection>
    )
  }

  return (
    <PageSection id="proceso" wide className="relative pb-0 pt-16 sm:pt-20">
      <div ref={scrollRef} className="relative min-h-[140vh] lg:min-h-[120vh]">
        <div className="sticky top-[5.5rem] pb-20 sm:pb-28">
          <ProcessHeader title={t.process.title} subtitle={t.process.subtitle} intro={t.process.intro} />

          <ProcessTimeline
            lineProgress={lineProgress}
            nodePosition={nodePosition}
            reduce={reduce}
          />
          {steps}
        </div>
      </div>
    </PageSection>
  )
}
