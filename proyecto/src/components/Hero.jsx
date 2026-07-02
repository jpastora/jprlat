import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import HeroDiagram from './HeroDiagram.jsx'
import PageSection from './PageSection.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToSection } from '../utils/scroll.js'
import cvUrl from '../assets/cv/joseph-pastora-cv.pdf'

export default function Hero() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])
  const y = useSpring(yRaw, { stiffness: 100, damping: 28 })

  return (
    <PageSection id="inicio" wide className="pb-24 pt-28 sm:pb-32 sm:pt-32">
      <div ref={ref} className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p
            variants={itemVariants}
            className="font-body text-sm font-medium text-tech"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-4 max-w-[16ch] font-heading text-[2.75rem] font-bold leading-[1.02] tracking-tight text-carbon sm:text-5xl lg:text-[3.5rem]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-prose font-body text-lg leading-relaxed text-tech"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection('contacto')}
              className="group inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:bg-carbon"
            >
              {t.cta.talk}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('proyectos')}
              className="inline-flex items-center gap-2 rounded-lg border border-cool px-6 py-3 font-body text-sm font-semibold text-carbon transition-colors duration-300 hover:border-carbon"
            >
              {t.cta.viewProjects}
            </button>
            <a
              href={cvUrl}
              download="joseph-pastora-cv.pdf"
              className="inline-flex items-center gap-2 px-2 py-3 font-body text-sm font-medium text-tech transition-colors duration-300 hover:text-orange"
            >
              <Download size={15} aria-hidden="true" />
              {t.cta.downloadCv}
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} style={{ y }} className="lg:col-span-5 lg:pl-8">
          <HeroDiagram />
        </motion.div>
      </div>
    </PageSection>
  )
}
