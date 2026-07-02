import { motion, useReducedMotion } from 'framer-motion'
import { EASE_EXPO } from '../utils/motion.js'
import { scrollToSection } from '../utils/scroll.js'

export default function ScrollChevron() {
  const reduce = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={() => scrollToSection('perfil')}
      aria-label="Scroll"
      className="mt-14 inline-flex flex-col items-center gap-2 font-mono text-orange"
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5, ease: EASE_EXPO }}
    >
      <motion.span
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-lg"
        aria-hidden="true"
      >
        {'>'}
      </motion.span>
      <span className="h-8 w-px bg-line" aria-hidden="true" />
    </motion.button>
  )
}
