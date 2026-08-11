import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ProjectCoverPlaceholder from './ProjectCoverPlaceholder.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { EASE_EXPO } from '../utils/motion.js'

function tField(obj, language) {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[language] ?? obj.es ?? ''
}

export default function ProjectCard({ project, onOpenCaseStudy }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const [imgError, setImgError] = useState(false)

  const title = tField(project.title, language)
  const summary = tField(project.summary, language)
  const showImage = project.cover && !imgError

  return (
    <motion.article
      layout={!reduce}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: EASE_EXPO }}
      whileHover={reduce ? undefined : { y: -3 }}
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-soft transition-colors duration-300 group-hover:border-orange/60">
        {showImage ? (
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <ProjectCoverPlaceholder category={project.category} className="text-carbon" />
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.875rem] text-tech">
            {project.category}
          </span>
          {project.confidential && (
            <span className="rounded-md border border-orange/40 bg-orange/5 px-2 py-0.5 font-body text-[0.875rem] text-orange">
              {t.projects.confidential}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-heading text-[1.375rem] font-semibold text-carbon">{title}</h3>
        <p className="mt-2 max-w-prose flex-1 font-body text-base leading-[1.5] text-tech line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onOpenCaseStudy?.(project)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-body text-base font-medium text-carbon transition-colors hover:border-orange hover:text-orange"
          >
            {t.projects.viewCase}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
