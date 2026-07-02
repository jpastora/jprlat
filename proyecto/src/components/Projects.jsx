import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import PageSection from './PageSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
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
    <PageSection
      id="proyectos"
      tone="soft"
      wide
      className="-mt-6 pb-28 pt-20 sm:pb-36 sm:pt-28"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle title={t.projects.title} subtitle={t.projects.subtitle} />
        <motion.span
          variants={itemVariants}
          className="shrink-0 font-mono text-xs text-tech"
        >
          {t.projects.statusBadge}
        </motion.span>
      </div>

      <div
        className="mt-10 flex flex-wrap gap-6 border-b border-line pb-1"
        role="tablist"
        aria-label={t.projects.filterLabel}
      >
        {categories.map((cat) => {
          const active = filter === cat
          const label = cat === 'all' ? t.projects.all : cat
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(cat)}
              className={`relative pb-3 font-body text-sm transition-colors duration-300 ${
                active ? 'text-carbon' : 'text-tech hover:text-carbon'
              }`}
            >
              {label}
              {active && (
                <motion.span
                  layoutId="project-tab-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-orange"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </PageSection>
  )
}
