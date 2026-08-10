import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import ServiceIcon from './ServiceIcon.jsx'
import { EASE_EXPO, lineDraw } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function ServiceRow({ service, index }) {
  const { language } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(null)

  const expanded = hovered || mobileOpen === index
  const num = String(index + 1).padStart(2, '0')

  const toggleMobile = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileOpen(mobileOpen === index ? null : index)
    }
  }

  return (
    <article
      ref={ref}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        variants={lineDraw}
        initial={reduce ? false : 'hidden'}
        animate={inView ? 'visible' : 'hidden'}
        className="h-px origin-left bg-line"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={toggleMobile}
        className="group relative w-full py-8 text-left sm:py-10 md:cursor-default"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <motion.h3
              animate={{
                color: expanded ? 'var(--color-carbon)' : 'var(--color-tech)',
              }}
              transition={{ duration: 0.35, ease: EASE_EXPO }}
              className="break-words text-balance font-heading font-semibold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)' }}
            >
              {service.title[language] ?? service.title.es}
            </motion.h3>
          </div>

          <motion.span
            className="pointer-events-none hidden font-mono text-[clamp(3rem,8vw,5.5rem)] font-medium leading-none text-line md:block"
            animate={{ x: expanded ? 0 : 24, opacity: expanded ? 0.9 : 0.25 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            aria-hidden="true"
          >
            {num}
          </motion.span>

          <motion.span
            className="mt-2 font-mono text-lg text-cool md:hidden"
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            {'>'}
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-start sm:gap-10">
                <ServiceIcon type={service.id} active={expanded} />
                <div className="min-w-0 flex-1">
                  <p className="max-w-prose font-body text-base leading-relaxed text-tech">
                    {service.description[language] ?? service.description.es}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {service.technologies.map((tech, i) => (
                      <li key={tech} className="font-mono text-[0.875rem] text-tech">
                        {tech}
                        {i < service.technologies.length - 1 && (
                          <span className="ml-3 text-cool" aria-hidden="true">
                            /
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          className="absolute bottom-0 left-0 h-px bg-orange"
          initial={{ width: '0%' }}
          animate={{ width: expanded ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          aria-hidden="true"
        />
      </button>
    </article>
  )
}
