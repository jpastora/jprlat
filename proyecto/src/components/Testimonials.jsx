import { motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '../data/testimonials.js'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

function TestimonialCard({ item, index }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE_EXPO }}
      className="flex h-full min-w-[min(100%,20rem)] shrink-0 snap-center flex-col sm:min-w-0"
    >
      <span className="font-mono text-3xl leading-none text-orange" aria-hidden="true">
        {'>'}
      </span>
      <blockquote className="mt-4 flex flex-1 flex-col">
        <p className="flex-1 font-body text-base leading-relaxed text-carbon">
          {item.quote[language] ?? item.quote.es}
        </p>
        <footer className="mt-6 flex items-center gap-3 border-t border-line pt-4">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-soft font-mono text-xs text-tech"
            aria-hidden="true"
          >
            {item.initials}
          </span>
          <div>
            <cite className="not-italic font-heading text-sm font-medium text-carbon">
              {item.name}
            </cite>
            <p className="font-body text-xs text-tech">
              {item.role[language] ?? item.role.es}
            </p>
          </div>
        </footer>
      </blockquote>
      {item.todo && (
        <p className="mt-2 font-mono text-[10px] text-tech">{t.testimonials.todo}</p>
      )}
    </motion.article>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <div className="mt-20 border-t border-line pt-12">
      <h3 className="font-heading text-2xl font-semibold text-carbon">{t.testimonials.title}</h3>
      <p className="mt-2 max-w-prose font-body text-sm text-tech">{t.testimonials.subtitle}</p>

      <div className="mt-8 flex items-stretch gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {testimonials.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
