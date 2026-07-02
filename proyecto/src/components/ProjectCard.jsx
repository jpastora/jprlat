import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubMark } from './BrandIcons.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { EASE_EXPO } from '../utils/motion.js'

function PlaceholderVisual({ label }) {
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden bg-white" aria-hidden="true">
      <motion.div
        className="pos-dotgrid absolute -right-4 -top-4 h-full w-full opacity-50"
        animate={reduce ? undefined : { x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <svg className="absolute inset-x-6 bottom-6 h-14" viewBox="0 0 200 50" fill="none">
        <motion.path
          d="M0 40 L50 28 L100 34 L150 16 L200 22"
          stroke="#E5E7EB"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: 1 }}
          transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <circle cx="200" cy="22" r="3" fill="#FF6B00" />
      </svg>
      <p className="absolute left-6 top-6 font-mono text-[10px] text-tech">{label}</p>
    </div>
  )
}

export default function ProjectCard({ project }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const [imgError, setImgError] = useState(false)

  const title = project.title[language] ?? project.title.es
  const status = project.status[language] ?? project.status.es
  const description = project.description[language] ?? project.description.es
  const showImage = project.image && !imgError

  return (
    <motion.article
      layout={!reduce}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: EASE_EXPO }}
      whileHover={reduce ? undefined : { y: -3 }}
      className="group"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-soft transition-colors duration-300 group-hover:border-orange/60">
        {showImage ? (
          <img
            src={project.image}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <PlaceholderVisual label={t.projects.placeholder} />
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono text-xs text-tech">{project.category}</span>
          <span className="text-cool" aria-hidden="true">
            ·
          </span>
          <span className="font-body text-xs text-tech">{status}</span>
        </div>

        <h3 className="mt-2 font-heading text-xl font-medium text-carbon">{title}</h3>
        <p className="mt-2 max-w-prose font-body text-sm leading-relaxed text-tech">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={project.demoUrl}
            target={project.demoUrl?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-carbon transition-colors hover:text-orange"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {t.projects.viewDemo}
          </a>
          <a
            href={project.repoUrl}
            target={project.repoUrl?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-sm text-tech transition-colors hover:text-orange"
          >
            <GithubMark size={14} />
            {t.projects.repo}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
