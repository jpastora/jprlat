import { motion, useReducedMotion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function ServiceRow({ service, index }) {
  const { language } = useLanguage()
  const reduce = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')
  const reversed = index % 2 === 1

  return (
    <motion.article
      variants={itemVariants}
      className={`group relative border-t border-line py-10 sm:py-12 ${
        reversed ? 'lg:pl-[12%]' : 'lg:pr-[12%]'
      }`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[4rem_1fr] sm:gap-8">
        <span className="font-mono text-sm text-cool transition-colors duration-300 group-hover:text-orange">
          {num}
        </span>
        <div>
          <h3 className="font-heading text-2xl font-medium text-carbon sm:text-[1.65rem]">
            {service.title[language] ?? service.title.es}
          </h3>
          <p className="mt-3 max-w-prose font-body text-base leading-relaxed text-tech">
            {service.description[language] ?? service.description.es}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {service.technologies.map((tech, i) => (
              <motion.li
                key={tech}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                className="font-mono text-xs text-tech"
              >
                {tech}
                {i < service.technologies.length - 1 && (
                  <span className="ml-2 text-cool" aria-hidden="true">
                    /
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <span
        className="absolute bottom-0 left-0 h-px w-0 bg-orange transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
    </motion.article>
  )
}
