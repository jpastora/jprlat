import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubMark } from './BrandIcons.jsx'
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
  const status = tField(project.status, language)
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
        {project.todo && (
          <span className="absolute left-3 top-3 rounded-full border border-orange/50 bg-white/90 px-2.5 py-1 font-mono text-base text-orange backdrop-blur-sm dark:bg-soft/90">
            TODO
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base text-tech">{project.category}</span>
          <span className="text-cool" aria-hidden="true">
            ·
          </span>
          <span className="font-body text-base text-tech">{status}</span>
        </div>

        <h3 className="mt-2 font-heading text-[1.375rem] font-semibold text-carbon">{title}</h3>
        <p className="mt-2 max-w-prose flex-1 font-body text-base leading-[1.5] text-tech line-clamp-3">
          {summary}
        </p>

        {project.metrics?.[0] && (
          <p className="mt-3 font-mono text-base text-orange">
            {tField(project.metrics[0].label, language)}: {project.metrics[0].value}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line px-2 py-0.5 font-mono text-base text-tech"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <button
            type="button"
            onClick={() => onOpenCaseStudy?.(project)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-body text-base font-medium text-carbon transition-colors hover:border-orange hover:text-orange"
          >
            {t.projects.viewCase}
          </button>
          {project.links?.demo && project.links.demo !== '#' && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-base text-tech transition-colors hover:text-orange"
            >
              <ExternalLink size={16} aria-hidden="true" />
              {t.projects.open}
            </a>
          )}
          {project.links?.repo && project.links.repo !== '#' && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-base text-tech transition-colors hover:text-orange"
            >
              <GithubMark size={16} />
              {t.projects.code}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
