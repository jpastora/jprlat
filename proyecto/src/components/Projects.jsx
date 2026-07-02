import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import SectionFrame from './SectionFrame.jsx'
import SectionTitle from './SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
import SignalNode from './SignalNode.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { projects } from '../data/projects.js'

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)))
    return ['all', ...unique]
  }, [])

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <SectionFrame
      id="proyectos"
      number={t.sections.projects.number}
      label={t.sections.projects.label}
      bg="soft"
      showGrid
      gridVariant="default"
      className="py-20 sm:py-28"
    >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionTitle
            tag={t.projects.tag}
            title={t.projects.title}
            subtitle={t.projects.subtitle}
          />
          <motion.span
            variants={itemVariants}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-orange/30 bg-orange/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-orange"
          >
            <SignalNode active pulse size="sm" />
            {t.projects.statusBadge}
          </motion.span>
        </div>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl font-mono text-xs leading-relaxed text-tech"
        >
          <span className="text-orange">{'>'}</span> {t.projects.labPhrase}
        </motion.p>

        {/* Filtros como command tabs */}
        <div
          className="mt-8 flex flex-wrap gap-2 rounded-xl border border-line bg-white p-2"
          role="group"
          aria-label={t.projects.filterLabel}
        >
          {categories.map((cat) => {
            const active = filter === cat
            const label = cat === 'all' ? t.projects.all : cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className={`relative rounded-lg px-4 py-2 font-mono text-xs transition-all duration-300 ${
                  active
                    ? 'bg-carbon text-white'
                    : 'text-tech hover:bg-soft hover:text-orange'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-active"
                    className="absolute inset-0 rounded-lg border border-carbon bg-carbon"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {active && <SignalNode active size="sm" className="!bg-white" />}
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Galería lab panels */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
    </SectionFrame>
  )
}
