import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import PageSection from './PageSection.jsx'
import CountUp from './CountUp.jsx'
import ProfilePhoto from './ProfilePhoto.jsx'
import { EASE_EXPO } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

function StatementLine({ parts }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  return (
    <p
      ref={ref}
      className="max-w-[20ch] font-heading font-semibold leading-[1.12] tracking-tight text-carbon"
      style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
    >
      {parts.map((part, i) => (
        <motion.span
          key={`${part.text}-${i}`}
          className={part.accent ? 'text-orange' : undefined}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: i * 0.08, duration: 0.55, ease: EASE_EXPO }}
        >
          {part.text}
        </motion.span>
      ))}
    </p>
  )
}

function BrandMarquee({ brands }) {
  const reduce = useReducedMotion()

  return (
    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
      {brands.map((brand, i) => (
        <motion.li
          key={brand}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: EASE_EXPO }}
          className="font-body text-sm text-carbon"
        >
          {brand}
        </motion.li>
      ))}
    </ul>
  )
}

export default function StrategicProfile() {
  const { t } = useLanguage()
  const p = t.profile

  return (
    <PageSection
      id="perfil"
      tone="bleed-soft"
      wide
      className="-mt-8 pb-28 pt-20 sm:pb-36 sm:pt-28"
    >
      <StatementLine parts={p.statement} />

      <div className="mt-16 grid grid-cols-1 gap-x-20 gap-y-10 lg:grid-cols-12 lg:items-start">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="max-w-prose font-body text-base leading-[1.8] text-carbon sm:text-lg"
          >
            {p.about}
          </motion.p>

          <div className="mt-12 space-y-10 border-t border-line pt-10">
            <div>
              <h3 className="font-heading text-lg font-medium text-carbon">
                {p.technical.title}
              </h3>
              <p className="mt-3 max-w-prose font-body text-sm leading-relaxed text-tech">
                {p.technical.text}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-medium text-carbon">
                {p.human.title}
              </h3>
              <p className="mt-3 max-w-prose font-body text-sm leading-relaxed text-tech">
                {p.human.text}
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 w-full lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <ProfilePhoto />
        </div>

        <aside className="order-3 lg:col-span-5 lg:col-start-8 lg:row-start-2">
          <div className="lg:sticky lg:top-28">
            <p className="font-body text-sm text-tech">{p.credibilityLabel}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <CountUp
                value={p.experienceValue}
                className="font-heading text-5xl font-bold text-carbon"
              />
              <span className="font-heading text-4xl font-bold text-carbon">+</span>
              <span className="ml-1 font-body text-lg text-tech">{p.experienceUnit}</span>
            </div>

            <BrandMarquee brands={p.credibility} />

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-wide text-tech">
                  {p.roles.agencies.title}
                </p>
                <ul className="list-chevron mt-3 space-y-1.5">
                  {p.roles.agencies.items.map((item) => (
                    <li key={item} className="font-body text-sm text-carbon">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-wide text-tech">
                  {p.roles.brands.title}
                </p>
                <ul className="list-chevron mt-3 space-y-1.5">
                  {p.roles.brands.items.map((item) => (
                    <li key={item} className="font-body text-sm text-carbon">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE_EXPO }}
        className="mt-20 border-t-2 border-orange pt-10"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <blockquote className="max-w-prose">
            <p className="font-heading text-xl font-medium leading-snug text-carbon sm:text-2xl">
              “{p.mission.text}”
            </p>
            <footer className="mt-4 font-body text-sm text-tech">— {p.mission.title}</footer>
          </blockquote>
          <blockquote className="max-w-prose">
            <p className="font-heading text-xl font-medium leading-snug text-carbon sm:text-2xl">
              “{p.vision.text}”
            </p>
            <footer className="mt-4 font-body text-sm text-tech">— {p.vision.title}</footer>
          </blockquote>
        </div>
      </motion.div>
    </PageSection>
  )
}
