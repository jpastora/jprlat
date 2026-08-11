import { motion, useReducedMotion } from 'framer-motion'
import { maskReveal } from '../utils/motion.js'

export default function MaskReveal({ children, className = '' }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden pb-[0.12em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div variants={maskReveal}>{children}</motion.div>
    </motion.div>
  )
}
