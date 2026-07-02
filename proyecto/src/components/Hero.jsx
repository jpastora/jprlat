import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Download, ChevronRight } from 'lucide-react'
import BracketFrame from './BracketFrame.jsx'
import SystemFlow from './SystemFlow.jsx'
import MotionBackground from './MotionBackground.jsx'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import SignalNode from './SignalNode.jsx'
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
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80])
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.4 })
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.35])
  const panelRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 2])

  const fade = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 + i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <MotionBackground />

      {/* Grid técnico de fondo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="pos-dotgrid absolute inset-0 opacity-[0.4]" />
        <div className="absolute inset-x-0 top-32 h-px bg-line" />
        <div className="absolute left-[12%] top-0 h-full w-px bg-line/50" />
        <div className="absolute right-[12%] top-0 h-full w-px bg-line/50" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        {/* Encabezado del módulo */}
        <motion.div
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          variants={fade}
          custom={0}
          className="mb-10 flex items-end gap-4"
        >
          <span className="font-mono text-6xl font-medium leading-none tracking-tighter text-line sm:text-7xl">
            {t.sections.hero.number}
          </span>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tech">
              <span className="text-orange">[</span> {t.sections.hero.label}{' '}
              <span className="text-orange">]</span>
            </span>
            <span className="mt-2 block h-0.5 w-20 bg-orange" aria-hidden="true" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna editorial */}
          <div>
            <motion.span
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={1}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1 font-mono text-xs text-tech"
            >
              <SignalNode active pulse size="sm" />
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={2}
              className="mt-6 font-heading text-[2.5rem] font-bold leading-[1.05] tracking-tight text-carbon sm:text-5xl lg:text-[3.75rem]"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={3}
              className="mt-6 max-w-xl font-body text-lg leading-relaxed text-tech"
            >
              {t.hero.paragraph}
            </motion.p>

            <motion.div
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={4}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection('proyectos')}
                className="group inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors duration-300 hover:bg-carbon"
              >
                {t.cta.viewProjects}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <a
                href={cvUrl}
                download="joseph-pastora-cv.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-cool px-6 py-3.5 font-body text-sm font-semibold text-carbon transition-colors duration-300 hover:border-orange hover:text-orange"
              >
                <Download size={16} aria-hidden="true" />
                {t.cta.downloadCv}
              </a>
            </motion.div>

            {/* Proof points como chips de sistema */}
            <motion.ul
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={5}
              className="mt-8 flex flex-wrap gap-2"
            >
              {t.hero.proofPoints.map((point, i) => (
                <li key={point} className="pos-chip">
                  <SignalNode active={i === 0} size="sm" />
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial={reduce ? false : 'hidden'}
              animate={reduce ? undefined : 'visible'}
              variants={fade}
              custom={6}
              className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-tech"
            >
              <span className="text-orange">{'>'}</span> {t.meta.secondary}
            </motion.p>
          </div>

          {/* Panel de comando Performance OS */}
          <motion.div style={{ y, opacity, rotate: panelRotate }} className="relative">
            <BracketFrame size="lg" innerClassName="pos-panel rounded-2xl p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <AnimatedLogoMark size={40} />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-tech">
                      {t.hero.systemLabel}
                    </span>
                    <span className="font-heading text-sm font-semibold text-carbon">
                      Performance OS
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <SignalNode size="sm" />
                  <SignalNode size="sm" />
                  <SignalNode active pulse size="sm" />
                </div>
              </div>

              {/* Pipeline estrategia → software → datos → crecimiento */}
              <div className="mb-5">
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-tech">
                  {'>'} flow / pipeline
                </span>
                <SystemFlow steps={t.hero.pipeline} variant="pipeline" className="py-2" />
              </div>

              {/* Módulos input → process → output */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[t.hero.flow.input, t.hero.flow.process, t.hero.flow.output].map(
                  (label, i) => (
                    <motion.div
                      key={label}
                      animate={reduce ? undefined : { y: [0, i === 1 ? -4 : -2, 0] }}
                      transition={
                        reduce
                          ? undefined
                          : { duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut' }
                      }
                      className="relative rounded-lg border border-line bg-white p-3"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider text-tech">
                        0{i + 1}
                      </span>
                      <p className="mt-1 font-heading text-xs font-semibold text-carbon">
                        {label}
                      </p>
                      <motion.span
                        className={`mt-2 block h-1 rounded-full ${i === 2 ? 'bg-orange' : 'bg-line'}`}
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={reduce ? undefined : { scaleX: 1 }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                        style={{ originX: 0 }}
                      />
                      <SignalNode
                        active={i === 2}
                        pulse={i === 2}
                        size="sm"
                        className="absolute -right-1 -top-1"
                      />
                    </motion.div>
                  ),
                )}
              </div>

              {/* Flujo SVG animado */}
              <div className="mb-5 rounded-lg border border-line bg-white p-4">
                <SystemFlow
                  steps={[t.hero.flow.input, t.hero.flow.process, t.hero.flow.output]}
                  className="h-20"
                />
              </div>

              {/* KPI modules */}
              <div className="grid grid-cols-3 gap-3">
                {t.hero.kpi.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-lg border border-line bg-white p-3 text-center"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-wider text-tech">
                      {m.label}
                    </p>
                    <p className="mt-1 font-heading text-xl font-bold text-carbon">
                      {m.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Chevrons de ejecución */}
              <div className="mt-5 flex items-center justify-center gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="text-orange"
                    animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], x: [0, 2, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: 'easeInOut',
                    }}
                  >
                    <ChevronRight size={14} />
                  </motion.span>
                ))}
              </div>
            </BracketFrame>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
