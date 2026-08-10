import { useState, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { siteConfig } from '../config/site.config.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function ProfilePhoto() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [error, setError] = useState(false)
  const gazeLeft = siteConfig.profileGaze === 'left'

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -20])
  const y = useSpring(yRaw, { stiffness: 100, damping: 28 })

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative aspect-[4/5] w-full max-w-md lg:max-w-none"
    >
      <div className="pos-dotgrid absolute -right-4 -top-4 h-24 w-24 opacity-40" aria-hidden="true" />

      <div className="relative h-full overflow-hidden rounded-lg border border-line bg-soft dark:border-line dark:bg-soft/80">
        {!error ? (
          <img
            src={siteConfig.profileImage}
            alt={t.profile.photoAlt ?? 'Joseph Pastora'}
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full flex-col items-center justify-center gap-2 bg-soft"
            aria-hidden="true"
          >
            <span className="font-heading text-3xl font-bold text-carbon">
              JP<span className="text-orange">{'>'}</span>
            </span>
            <span className="font-mono text-[0.875rem] text-tech">JP&gt;</span>
          </div>
        )}
      </div>

      <div
        className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:flex lg:items-center lg:gap-1 ${
          gazeLeft ? '-right-8' : '-left-8'
        }`}
        aria-hidden="true"
      >
        {gazeLeft ? (
          <>
            <span className="h-px w-10 bg-orange" />
            <span className="font-mono text-[0.875rem] text-orange">&gt;</span>
          </>
        ) : (
          <>
            <span className="font-mono text-[0.875rem] text-orange">&lt;</span>
            <span className="h-px w-10 bg-orange" />
          </>
        )}
      </div>
    </motion.div>
  )
}
