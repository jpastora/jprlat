import { motion } from 'framer-motion'
import { Cpu, Users, Target, Compass } from 'lucide-react'
import SectionFrame from './SectionFrame.jsx'
import BracketFrame from './BracketFrame.jsx'
import SignalNode from './SignalNode.jsx'
import SectionTitle from './SectionTitle.jsx'
import ValueCard from './ValueCard.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { values } from '../data/values.js'

export default function StrategicProfile() {
  const { t } = useLanguage()
  const p = t.profile
  const labels = p.systemLabels

  return (
    <SectionFrame
      id="perfil"
      number={t.sections.profile.number}
      label={t.sections.profile.label}
      bg="soft"
      showGrid
      className="py-20 sm:py-28"
    >
        <SectionTitle tag={p.tag} title={p.title} subtitle={p.subtitle} />

        {/* Arquitectura: statement + mapa */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Statement principal */}
          <motion.div
            variants={itemVariants}
            className="relative lg:col-span-5"
          >
            <div className="absolute -left-3 top-0 hidden h-full w-px bg-line lg:block" aria-hidden="true">
              <span className="absolute left-1/2 top-8 h-2 w-2 -translate-x-1/2 rounded-full bg-orange" />
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cool" />
              <span className="absolute bottom-8 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cool" />
            </div>

            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
                {'>'} {labels.about}
              </span>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-widest text-tech">
                [ about ]
              </span>
              <p className="mt-5 font-heading text-xl font-semibold leading-snug text-carbon sm:text-2xl">
                {p.about.split('.')[0]}.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-tech">
                {p.about}
              </p>
            </div>
          </motion.div>

          {/* Mapa de arquitectura */}
          <div className="relative lg:col-span-7">
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-line lg:block"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <motion.article
                variants={itemVariants}
                className="group relative rounded-xl border border-line bg-white p-6 transition-colors hover:border-cool"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                  {'>'} {labels.technical}
                </span>
                <div className="mt-3 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors group-hover:border-orange group-hover:text-orange">
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
                <SignalNode
                  active
                  className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.article>

              <motion.article
                variants={itemVariants}
                className="group relative rounded-xl border border-line bg-white p-6 transition-colors hover:border-cool sm:mt-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                  {'>'} {labels.human}
                </span>
                <div className="mt-3 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-carbon transition-colors group-hover:border-orange group-hover:text-orange">
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
                <SignalNode
                  active
                  className="absolute -left-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.article>
            </div>
          </div>
        </div>

        {/* Misión y Visión como módulos estratégicos */}
        <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-20 -translate-x-1/2 -translate-y-1/2 md:block"
            aria-hidden="true"
          >
            <div className="h-px w-full bg-cool" />
            <SignalNode active className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <motion.div variants={itemVariants}>
            <BracketFrame innerClassName="rounded-xl border border-line bg-white p-6 sm:p-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                {'>'} {labels.mission}
              </span>
              <div className="mt-3 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-orange">
                <Target size={18} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-carbon">
                {p.mission.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.mission.text}
              </p>
            </BracketFrame>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BracketFrame innerClassName="rounded-xl border border-line bg-white p-6 sm:p-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                {'>'} {labels.vision}
              </span>
              <div className="mt-3 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-soft text-orange">
                <Compass size={18} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-carbon">
                {p.vision.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.vision.text}
              </p>
            </BracketFrame>
          </motion.div>
        </div>

        {/* Valores como nodos conectados */}
        <div className="relative mt-14">
          <div className="pos-system-line mb-8" aria-hidden="true" />
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
            <SignalNode active pulse />
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
      </SectionFrame>
  )
}
