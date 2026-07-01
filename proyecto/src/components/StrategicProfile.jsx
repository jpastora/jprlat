import { motion } from 'framer-motion'
import { Cpu, Users, Target, Compass } from 'lucide-react'
import AnimatedSection from './AnimatedSection.jsx'
import { itemVariants } from '../utils/motion.js'
import SectionTitle from './SectionTitle.jsx'
import ValueCard from './ValueCard.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { values } from '../data/values.js'

export default function StrategicProfile() {
  const { t } = useLanguage()
  const p = t.profile

  return (
    <AnimatedSection
      id="perfil"
      className="relative bg-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle tag={p.tag} title={p.title} subtitle={p.subtitle} />

        {/* About + diferenciadores */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 rounded-xl border border-line bg-white p-6 sm:p-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-tech">
              [ about ]
            </span>
            <p className="mt-4 font-body text-base leading-relaxed text-carbon">
              {p.about}
            </p>
          </motion.div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="group rounded-xl border border-line bg-white p-6 transition-colors hover:border-cool"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors group-hover:border-orange group-hover:text-orange">
                <Cpu size={18} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-tech">
                {p.technical.label}
              </span>
              <h3 className="mt-1 font-heading text-base font-semibold text-carbon">
                {p.technical.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.technical.text}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group rounded-xl border border-line bg-white p-6 transition-colors hover:border-cool"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors group-hover:border-orange group-hover:text-orange">
                <Users size={18} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-tech">
                {p.human.label}
              </span>
              <h3 className="mt-1 font-heading text-base font-semibold text-carbon">
                {p.human.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.human.text}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Misión y Visión conectadas por líneas finas */}
        <div className="relative mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Conector central (desktop) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-16 -translate-x-1/2 -translate-y-1/2 md:block"
            aria-hidden="true"
          >
            <div className="h-px w-full bg-cool" />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
          </div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-line bg-white p-6 sm:p-8"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-orange">
              <Target size={18} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-carbon">
              {p.mission.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-tech">
              {p.mission.text}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-line bg-white p-6 sm:p-8"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-orange">
              <Compass size={18} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-carbon">
              {p.vision.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-tech">
              {p.vision.text}
            </p>
          </motion.div>
        </div>

        {/* Valores */}
        <div className="mt-12">
          <motion.div variants={itemVariants} className="mb-5 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-tech">
              <span className="text-orange">{'>'}</span> {p.valuesLabel}
            </span>
          </motion.div>
          <h3 className="sr-only">{p.valuesTitle}</h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {values.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  )
}
