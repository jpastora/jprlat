import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Hammer } from 'lucide-react'
import { GithubMark } from './BrandIcons.jsx'
import SignalNode from './SignalNode.jsx'
import { useLanguage } from '../context/LanguageContext.js'

function LabPlaceholder({ label }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="pos-dotgrid absolute inset-0 opacity-60" />
      {/* Mini line chart */}
      <svg className="absolute inset-x-4 bottom-8 h-16 w-[calc(100%-2rem)]" viewBox="0 0 200 60" fill="none">
        <polyline
          points="0,50 40,35 80,42 120,20 160,28 200,10"
          stroke="#D1D5DB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,50 40,35 80,42 120,20 160,28 200,10"
          stroke="#FF6B00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        <circle cx="200" cy="10" r="3" fill="#FF6B00" />
      </svg>
      {/* Brackets */}
      <span className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-cool" />
      <span className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-cool" />
      <span className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-cool" />
      <span className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-orange/80" />
      {/* Module preview */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-white/90 px-3 py-2 backdrop-blur-sm">
          <SignalNode active pulse size="sm" />
          <span className="font-mono text-lg font-semibold text-carbon">
            JP<span className="text-orange">{'>'}</span>
          </span>
        </div>
        <span className="rounded-md border border-line bg-white/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-tech backdrop-blur-sm">
          {label}
        </span>
      </div>
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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-soft">
        {showImage ? (
          <img
            src={project.image}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <LabPlaceholder label={t.projects.placeholder} />
        )}

        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md border border-line bg-white/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-tech backdrop-blur">
          <SignalNode size="sm" />
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="mb-2 inline-flex items-center gap-1.5 self-start rounded-full border border-orange/30 bg-orange/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-orange">
          <Hammer size={11} strokeWidth={2} aria-hidden="true" />
          {status}
        </span>

        <h3 className="font-heading text-xl font-semibold text-carbon">{title}</h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-tech">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-soft px-2 py-0.5 font-mono text-[11px] text-tech"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
          <a
            href={project.demoUrl}
            target={project.demoUrl?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-carbon px-3 py-1.5 font-mono text-xs text-white transition-colors duration-300 hover:bg-orange"
          >
            <ExternalLink size={13} aria-hidden="true" />
            {t.projects.viewDemo}
          </a>
          <a
            href={project.repoUrl}
            target={project.repoUrl?.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-carbon transition-colors duration-300 hover:border-orange hover:text-orange"
          >
            <GithubMark size={13} />
            {t.projects.repo}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
