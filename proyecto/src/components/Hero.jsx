import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import HeroDiagram from './HeroDiagram.jsx'
import MagneticButton from './MagneticButton.jsx'
import RevealText from './RevealText.jsx'
import SchedulerButton from './SchedulerButton.jsx'
import ScrollChevron from './ScrollChevron.jsx'
import CtaLottieArrow from './CtaLottieArrow.jsx'
import { EASE_EXPO, fadeUp } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToSection } from '../utils/scroll.js'
import { track } from '../lib/analytics.js'

export default function Hero() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48])
  const y = useSpring(yRaw, { stiffness: 100, damping: 28 })
  const diagramScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94])

  return (
    <section id="inicio" className="relative bg-white pb-24 pt-28 sm:pb-32 sm:pt-32">
      <div
        ref={ref}
        className="relative mx-auto grid max-w-[76rem] grid-cols-1 items-center gap-16 px-5 lg:grid-cols-12 lg:gap-12"
      >
        <div className="lg:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="font-body text-[0.875rem] font-medium text-tech"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="mt-4 max-w-[16ch] font-heading text-[3rem] font-bold leading-[1.2] tracking-tight text-carbon sm:text-5xl lg:text-[3.5rem]">
            <RevealText text={t.hero.title} mode="words" delay={0.08} />
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5, ease: EASE_EXPO }}
            className="mt-6 max-w-prose font-body text-base leading-[1.5] text-tech"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.72 } },
            }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.div variants={fadeUp}>
              <MagneticButton
                type="button"
                onClick={() => {
                  track('cta_click', { label: 'talk', source: 'hero' })
                  scrollToSection('contacto')
                }}
                data-cursor="cta"
                className="group inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 font-body text-base font-semibold text-white transition-colors duration-300 hover:bg-carbon"
              >
                {t.cta.talk}
                <CtaLottieArrow light />
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeUp}>
              <MagneticButton
                type="button"
                onClick={() => {
                  track('cta_click', { label: 'projects', source: 'hero' })
                  scrollToSection('proyectos')
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-cool px-6 py-3 font-body text-base font-semibold text-carbon transition-colors duration-300 hover:border-carbon"
              >
                {t.cta.viewProjects}
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeUp}>
              <SchedulerButton source="hero" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ y, scale: diagramScale }}
          className="lg:col-span-5 lg:pl-8"
        >
          <HeroDiagram />
          <ScrollChevron />
        </motion.div>
      </div>
    </section>
  )
}
