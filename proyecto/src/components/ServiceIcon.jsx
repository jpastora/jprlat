import { motion, useReducedMotion } from 'framer-motion'
import { EASE_EXPO } from '../utils/motion.js'

const ICONS = {
  web: (
    <>
      <rect x="8" y="10" width="44" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 18 H52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
  automation: (
    <>
      <circle cx="16" cy="30" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="44" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 27 L39 17" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  analytics: (
    <>
      <path d="M10 38 L22 26 L34 30 L50 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="14" r="2.5" fill="currentColor" />
    </>
  ),
  optimization: (
    <>
      <path d="M12 38 A22 22 0 0 1 48 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M30 38 V22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="22" r="2" fill="currentColor" />
    </>
  ),
}

export default function ServiceIcon({ type, active = false }) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      width="56"
      height="48"
      viewBox="0 0 60 48"
      fill="none"
      className={`shrink-0 transition-colors duration-300 ${active ? 'text-orange' : 'text-carbon'}`}
      animate={
        reduce
          ? undefined
          : { opacity: active ? 1 : 0.45, x: active ? 0 : -8 }
      }
      transition={{ duration: 0.4, ease: EASE_EXPO }}
      aria-hidden="true"
    >
      {ICONS[type] ?? ICONS.web}
    </motion.svg>
  )
}
