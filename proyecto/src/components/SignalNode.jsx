import { motion, useReducedMotion } from 'framer-motion'

/*
  SignalNode — nodo decorativo del diagrama.
  Estados: inactive (gris), active (naranja), pulse opcional.
*/
export default function SignalNode({
  active = false,
  pulse = false,
  size = 'md',
  className = '',
}) {
  const reduce = useReducedMotion()

  const sizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  }

  const pulseAnim =
    active && pulse && !reduce
      ? {
          scale: [1, 1.4, 1],
          opacity: [0.8, 1, 0.8],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }
      : undefined

  return (
    <motion.span
      className={`inline-block shrink-0 rounded-full ${sizes[size] ?? sizes.md} ${
        active ? 'bg-orange' : 'border border-cool bg-white'
      } ${className}`}
      animate={pulseAnim}
      aria-hidden="true"
    />
  )
}
