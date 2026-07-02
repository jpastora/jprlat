import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Workflow, LineChart, Gauge, ChevronRight } from 'lucide-react'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

const ICONS = { Code2, Workflow, LineChart, Gauge }

/*
  ServiceCard — tarjeta de servicio con:
  - borde fino + ícono de línea
  - indicador naranja
  - línea naranja que recorre el borde inferior en hover
  - tags técnicos que aparecen con leve retraso
*/
export default function ServiceCard({ service }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const Icon = ICONS[service.icon] ?? Code2

  return (
    <motion.article
      variants={itemVariants}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition-colors duration-300 hover:border-cool"
    >
      {/* Indicador naranja (esquina superior derecha) */}
      <span
        className="absolute right-5 top-5 h-2 w-2 rounded-full bg-cool transition-colors duration-300 group-hover:bg-orange"
        aria-hidden="true"
      />

      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors duration-300 group-hover:border-orange group-hover:text-orange">
        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>

      <h3 className="font-heading text-lg font-semibold text-carbon">
        {service.title[language] ?? service.title.es}
      </h3>

      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-tech">
        {service.description[language] ?? service.description.es}
      </p>

      <div className="mt-5">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-tech">
          {t.services.techLabel}
        </span>
        <ul className="flex flex-wrap gap-1.5">
          {service.technologies.map((tech, i) => (
            <motion.li
              key={tech}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.3 }}
              className="rounded-md border border-line bg-soft px-2 py-0.5 font-mono text-[11px] text-tech"
            >
              {tech}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Línea naranja que recorre el borde inferior en hover */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-orange transition-transform duration-500 ease-out group-hover:scale-x-100"
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
