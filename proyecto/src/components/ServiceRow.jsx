import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import ServiceIcon from './ServiceIcon.jsx'
import { EASE_EXPO, lineDraw } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function ServiceRow({ service, index }) {
  const { language } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(null)

  const expanded = hovered || mobileOpen === index
  const num = String(index + 1).padStart(2, '0')
  const title = service.title[language] ?? service.title.es

  const toggleMobile = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setMobileOpen(mobileOpen === index ? null : index)
    }
  }

  return (
    <article
      ref={ref}
      className="relative border-b border-line bg-white last:border-b-0 dark:bg-soft/30"
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
        className="group relative block w-full py-8 text-left sm:py-10 md:cursor-default"
        aria-expanded={expanded}
      >
        <div className="relative flex min-h-[5rem] items-center sm:min-h-[5.5rem]">
          <span
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-mono text-[clamp(2.5rem,6vw,4rem)] font-medium leading-none text-cool/40"
            aria-hidden="true"
          >
            {num}
          </span>

          <div className="relative flex w-full items-start justify-between gap-6 pr-16 sm:pr-20">
            <h3 className="max-w-[22ch] break-words text-balance font-heading text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-carbon sm:text-[2rem] lg:text-[2.5rem]">
              {title}
            </h3>

            <motion.span
              className="mt-2 shrink-0 font-mono text-lg text-tech md:hidden"
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
              {'>'}
            </motion.span>
          </div>
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
              <div className="flex flex-col gap-6 pb-2 pt-2 sm:flex-row sm:items-start sm:gap-10">
                <ServiceIcon type={service.id} active={expanded} />
                <div className="min-w-0 flex-1">
                  <p className="max-w-prose font-body text-base leading-[1.5] text-tech">
                    {service.description[language] ?? service.description.es}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {service.technologies.map((tech, i) => (
                      <li key={tech} className="font-mono text-base text-tech">
                        {tech}
                        {i < service.technologies.length - 1 && (
                          <span className="ml-3 text-tech/60" aria-hidden="true">
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
