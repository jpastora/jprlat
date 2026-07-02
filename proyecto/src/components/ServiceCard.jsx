import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Workflow, LineChart, Gauge, ChevronRight } from 'lucide-react'
import { itemVariants } from '../utils/motion.js'
import SignalNode from './SignalNode.jsx'
import { useLanguage } from '../context/LanguageContext.js'

const ICONS = { Code2, Workflow, LineChart, Gauge }

const STACK_CODES = ['01', '02', '03', '04']

export default function ServiceCard({ service, index = 0 }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const Icon = ICONS[service.icon] ?? Code2
  const stackCode = STACK_CODES[index] ?? '00'

  return (
    <motion.article
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition-colors duration-300 hover:border-cool"
    >
      {/* Indicador de stack */}
      <span className="absolute left-0 top-6 hidden h-8 w-1 rounded-r bg-line transition-colors duration-300 group-hover:bg-orange lg:block" aria-hidden="true" />

      <div className="mb-4 flex items-start justify-between">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors duration-300 group-hover:border-orange group-hover:text-orange">
          <motion.div
            initial={false}
            whileHover={reduce ? undefined : { rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          </motion.div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-tech">
            {stackCode}
          </span>
          <SignalNode className="transition-colors group-hover:bg-orange group-hover:border-orange" />
        </div>
      </div>

      <h3 className="font-heading text-xl font-semibold text-carbon">
        {service.title[language] ?? service.title.es}
      </h3>

      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-tech">
        {service.description[language] ?? service.description.es}
      </p>

      <div className="mt-5">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-tech">
          {'>'} {t.services.techLabel}
        </span>
        <ul className="flex flex-wrap gap-1.5">
          {service.technologies.map((tech, i) => (
            <motion.li
              key={tech}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
              className="rounded-md border border-line bg-soft px-2 py-0.5 font-mono text-[11px] text-tech transition-colors group-hover:border-cool"
            >
              {tech}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Línea naranja que recorre el borde en hover */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />
      <span
        className="absolute right-0 top-0 w-0.5 h-0 bg-orange transition-all duration-500 ease-out delay-75 group-hover:h-full"
        aria-hidden="true"
      />

      <ChevronRight
        size={16}
        className="absolute bottom-5 right-5 text-cool opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.article>
  )
}
