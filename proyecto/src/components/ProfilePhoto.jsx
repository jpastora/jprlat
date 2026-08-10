import { useState, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { siteConfig } from '../config/site.config.js'
import { useLanguage } from '../context/LanguageContext.js'
import ProfileMonogram from './ProfileMonogram.jsx'

/**
 * Profile photo with optional gaze-direction accent.
 * profileGaze in site.config.js: 'left' | 'right' — motif points toward adjacent headline.
 * Set showGazeAccent={false} when the photo sits inside the profile card.
 * fillHeight stretches the frame to match the adjacent text column on desktop.
 */
export default function ProfilePhoto({
  compact = false,
  showGazeAccent = true,
  flush = false,
  fillHeight = false,
  className = '',
}) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [useFallback, setUseFallback] = useState(false)
  const gazeLeft = siteConfig.profileGaze === 'left'

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : compact ? -8 : -20])
  const y = useSpring(yRaw, { stiffness: 100, damping: 28 })

  const sizeClass = fillHeight
    ? 'min-h-[14rem] flex-1 lg:min-h-[12rem] lg:max-h-[32rem]'
    : compact
      ? 'aspect-[4/5]'
      : 'aspect-[4/5] max-w-md lg:max-w-none'

  return (
    <motion.div
      ref={ref}
      style={reduce || compact ? undefined : { y }}
      className={`relative w-full ${sizeClass} ${className}`}
    >
      <div
        className={`absolute inset-0 overflow-hidden bg-soft dark:bg-soft/80 ${
          flush ? '' : 'rounded-xl border border-line'
        }`}
      >
        {useFallback ? (
          <ProfileMonogram className="h-full w-full" />
        ) : (
          <img
            src={siteConfig.profileImage}
            alt={t.profile.photoAlt ?? 'Joseph Pastora'}
            loading="lazy"
            decoding="async"
            onError={() => setUseFallback(true)}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      {showGazeAccent && !compact && (
        <div
          className={`pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 md:flex md:items-center md:gap-1 ${
            gazeLeft ? '-right-5' : '-left-5'
          }`}
          aria-hidden="true"
        >
          {gazeLeft ? (
            <>
              <span className="h-px w-8 bg-orange" />
              <span className="font-mono text-[0.875rem] text-orange">&gt;</span>
            </>
          ) : (
            <>
              <span className="font-mono text-[0.875rem] text-orange">&lt;</span>
              <span className="h-px w-8 bg-orange" />
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}
