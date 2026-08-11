import { lazy, Suspense, useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import PageSection from './PageSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
import Testimonials from './Testimonials.jsx'
import SectionErrorBoundary from './SectionErrorBoundary.jsx'
import ProjectsEmptyIllustration from '../assets/illustrations/ProjectsEmptyIllustration.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { projects } from '../data/projects.js'

const CaseStudyModal = lazy(() => import('./CaseStudyModal.jsx'))

export default function Projects() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const [activeProject, setActiveProject] = useState(null)

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
      <SectionTitle
        title={t.projects.title}
        subtitle={`${t.projects.subtitle} ${t.projects.intro}`}
      />

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
              className={`relative pb-3 font-body text-base transition-colors duration-300 ${
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
        <motion.div layout className="mt-10 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center gap-6 py-12 text-center"
              >
                <ProjectsEmptyIllustration className="h-36 w-48 text-tech" />
                <p className="max-w-md font-body text-base leading-[1.5] text-tech">
                  {t.projects.empty}
                </p>
              </motion.div>
            ) : (
              filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={setActiveProject}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <Testimonials />

      {activeProject && (
        <Suspense fallback={null}>
          <SectionErrorBoundary message="El caso de estudio no pudo cargarse.">
            <CaseStudyModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          </SectionErrorBoundary>
        </Suspense>
      )}
    </PageSection>
  )
}
