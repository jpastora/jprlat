import { useState, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { siteConfig } from '../config/site.config.js'

export default function ProfilePhoto() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [error, setError] = useState(false)

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
            alt="Joseph Pastora"
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
            <span className="font-mono text-[10px] text-tech">JP&gt;</span>
          </div>
        )}
        <span
          className="pointer-events-none absolute bottom-3 right-3 font-mono text-lg text-orange/80"
          aria-hidden="true"
        >
          {'>'}
        </span>
      </div>
    </motion.div>
  )
}
