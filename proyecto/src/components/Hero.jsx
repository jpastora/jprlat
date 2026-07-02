import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Download, ChevronRight } from 'lucide-react'
import SystemLines from './SystemLines.jsx'
import MotionBackground from './MotionBackground.jsx'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToSection } from '../utils/scroll.js'
// CV placeholder — reemplazar en src/assets/cv/joseph-pastora-cv.pdf
import cvUrl from '../assets/cv/joseph-pastora-cv.pdf'

export default function Hero() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])
  const y = useSpring(yRaw, { stiffness: 120, damping: 30, mass: 0.4 })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.4])

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative overflow-hidden bg-white pt-28 pb-20 sm:pt-32"
    >
      <MotionBackground />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
        {/* Columna de texto */}
        <div>
          <motion.span
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={fade}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1 font-mono text-xs text-tech"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={fade}
            custom={1}
            className="mt-5 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-carbon sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={fade}
            custom={2}
            className="mt-6 max-w-xl font-body text-lg leading-relaxed text-tech"
          >
            {t.hero.paragraph}
          </motion.p>

          <motion.div
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={fade}
            custom={3}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection('proyectos')}
              className="group inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:bg-carbon"
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
              className="inline-flex items-center gap-2 rounded-lg border border-cool px-5 py-3 font-body text-sm font-semibold text-carbon transition-colors duration-300 hover:border-orange hover:text-orange"
            >
              <Download size={16} aria-hidden="true" />
              {t.cta.downloadCv}
            </a>
          </motion.div>

          {/* Slogan del sistema */}
          <motion.p
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'visible'}
            variants={fade}
            custom={4}
            className="mt-8 font-mono text-xs uppercase tracking-widest text-tech"
          >
            <span className="text-orange">{'>'}</span> {t.meta.secondary}
          </motion.p>
        </div>

        {/* Columna visual — composición Performance OS */}
        <motion.div style={{ y, opacity }} className="relative">
          <div className="relative rounded-2xl border border-line bg-soft/60 p-6 backdrop-blur-sm">
            {/* Encabezado del "sistema" */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatedLogoMark size={34} />
                <span className="font-mono text-[11px] uppercase tracking-widest text-tech">
                  {t.hero.systemLabel}
                </span>
              </div>
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-cool" />
                <span className="h-2 w-2 rounded-full bg-cool" />
                <span className="h-2 w-2 rounded-full bg-orange" />
              </span>
            </div>

            {/* Módulos input -> process -> output */}
            <div className="grid grid-cols-3 gap-3">
              {[t.hero.flow.input, t.hero.flow.process, t.hero.flow.output].map(
                (label, i) => (
                  <motion.div
                    key={label}
                    animate={
                      reduce ? undefined : { y: [0, i === 1 ? -5 : -3, 0] }
                    }
                    transition={
                      reduce
                        ? undefined
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                    }
                    className="relative rounded-lg border border-line bg-white p-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-tech">
                      0{i + 1}
                    </span>
                    <p className="mt-1 font-heading text-xs font-semibold text-carbon">
                      {label}
                    </p>
                    <span
                      className={`mt-2 block h-1 w-full rounded-full ${
                        i === 2 ? 'bg-orange' : 'bg-line'
                      }`}
                    />
                  </motion.div>
                ),
              )}
            </div>

            {/* Líneas de sistema animadas (pathLength) */}
            <div className="my-4 rounded-lg border border-line bg-white p-3">
              <SystemLines className="h-24 w-full" />
            </div>

            {/* Mini indicadores de performance */}
            <div className="grid grid-cols-3 gap-3">
              {t.hero.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className="rounded-lg border border-line bg-white p-3 text-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-tech">
                    {m.label}
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold text-carbon">
                    {m.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Chevrons de ejecución en secuencia */}
            <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="font-mono text-orange"
                  animate={
                    reduce
                      ? undefined
                      : { opacity: [0.25, 1, 0.25] }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <ChevronRight size={14} />
                </motion.span>
              ))}
            </div>

            {/* Brackets que enmarcan el módulo */}
            <span className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-carbon" aria-hidden="true" />
            <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-orange" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
