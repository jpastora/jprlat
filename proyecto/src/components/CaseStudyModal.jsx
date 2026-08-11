import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { GithubMark } from './BrandIcons.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { EASE_EXPO } from '../utils/motion.js'

function tField(obj, language) {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[language] ?? obj.es ?? ''
}

export default function CaseStudyModal({ project, onClose }) {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const labels = t.projects.caseStudy

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        const list = Array.from(focusable)
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prev?.focus?.()
    }
  }, [onClose])

  if (!project) return null

  const title = tField(project.title, language)
  const summary = tField(project.summary, language)
  const problem = tField(project.problem, language)
  const architecture = tField(project.architecture, language)
  const decisions = project.decisions?.[language] ?? project.decisions?.es ?? []
  const businessImpact = project.businessImpact?.[language] ?? project.businessImpact?.es ?? []
  const hasRepo = Boolean(project.links?.repo)
  const hasSite = Boolean(project.links?.site)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-5"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="case-study-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-carbon/50 backdrop-blur-sm"
          onClick={onClose}
          aria-label={labels.close}
        />

        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: EASE_EXPO }}
          className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line bg-white p-6 shadow-xl sm:rounded-2xl dark:bg-soft"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-[0.875rem] text-tech">{project.category}</p>
                {project.confidential && (
                  <span className="rounded-md border border-orange/40 bg-orange/5 px-2 py-0.5 font-body text-[0.875rem] text-orange">
                    {t.projects.confidential}
                  </span>
                )}
              </div>
              <h2 id="case-study-title" className="mt-1 font-heading text-[2rem] font-semibold text-carbon">
                {title}
              </h2>
              <p className="mt-3 max-w-prose font-body text-base leading-[1.5] text-tech">{summary}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-carbon hover:border-orange hover:text-orange"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">{labels.problem}</h3>
              <p className="mt-3 font-body text-base leading-[1.5] text-carbon">{problem}</p>
            </section>

            <section>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">{labels.decisions}</h3>
              <ul className="list-chevron mt-3 space-y-2">
                {decisions.map((item) => (
                  <li key={item} className="font-body text-base leading-[1.5] text-carbon">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">
                {labels.architecture}
              </h3>
              <p className="mt-3 font-body text-base leading-[1.5] text-carbon">{architecture}</p>
            </section>

            <section className="rounded-xl border border-orange/40 bg-orange/5 p-5">
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">
                {labels.businessFocus}
              </h3>
              <ul className="mt-3 space-y-2">
                {businessImpact.map((item) => (
                  <li key={item} className="font-body text-base leading-[1.5] text-carbon">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-heading text-[1.375rem] font-semibold text-carbon">{labels.stack}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack?.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[0.875rem] text-tech"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {(hasRepo || hasSite) && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              {hasRepo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 font-body text-base font-semibold text-carbon hover:border-orange hover:text-orange"
                >
                  <GithubMark size={16} />
                  {t.projects.code}
                </a>
              )}
              {hasSite && (
                <a
                  href={project.links.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-2.5 font-body text-base font-semibold text-white hover:bg-carbon"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  {t.projects.visitSite}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
