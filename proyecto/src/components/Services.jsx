import { motion, useReducedMotion } from 'framer-motion'
import SectionFrame from './SectionFrame.jsx'
import SectionTitle from './SectionTitle.jsx'
import ServiceCard from './ServiceCard.jsx'
import SignalNode from './SignalNode.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { services } from '../data/services.js'

function OperatingLogicStrip() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const steps = t.services.operatingLogic.split('→').map((s) => s.trim())

  return (
    <div className="relative mt-12 overflow-hidden rounded-xl border border-line bg-soft px-6 py-4">
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-tech">
        {'>'} operating logic
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="pos-chip">
              <SignalNode active={i === steps.length - 1} size="sm" />
              {step}
            </span>
            {i < steps.length - 1 && (
              <motion.span
                className="font-mono text-orange"
                animate={reduce ? undefined : { x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
                aria-hidden="true"
              >
                {'>'}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLanguage()

  return (
    <SectionFrame
      id="servicios"
      number={t.sections.services.number}
      label={t.sections.services.label}
      bg="white"
      className="py-20 sm:py-28"
    >
        <SectionTitle
          tag={t.services.tag}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="relative mt-12 lg:flex lg:gap-8">
          {/* Indicador vertical de stack */}
          <div
            className="mb-6 hidden shrink-0 flex-col gap-4 lg:flex"
            aria-hidden="true"
          >
            {t.services.stackLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <SignalNode active={i === 0} size="sm" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-tech [writing-mode:vertical-lr] rotate-180">
                  {label}
                </span>
              </div>
            ))}
            <div className="mx-auto h-full w-px flex-1 bg-line" />
          </div>

          {/* Mapa de servicios 2x2 */}
          <div className="relative flex-1">
            {/* Líneas conectoras del mapa */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 600 400"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="300" y1="0" x2="300" y2="400" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="0" y1="200" x2="600" y2="200" stroke="#E5E7EB" strokeWidth="1" />
              <circle cx="300" cy="200" r="4" fill="#FF6B00" />
            </svg>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </div>

        <OperatingLogicStrip />
    </SectionFrame>
  )
}
