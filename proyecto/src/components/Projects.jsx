import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import AnimatedSection from './AnimatedSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
import PerformanceGrid from './PerformanceGrid.jsx'
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
    <AnimatedSection id="proyectos" className="relative overflow-hidden bg-soft py-20 sm:py-28">
      <PerformanceGrid variant="minimal" className="opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle
          tag={t.projects.tag}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        {/* Filtros por categoría */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label={t.projects.title}
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
                className={`relative rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-300 ${
                  active
                    ? 'border-carbon bg-carbon text-white'
                    : 'border-line bg-white text-tech hover:border-orange hover:text-orange'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Galería animada */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </AnimatedSection>
  )
}
