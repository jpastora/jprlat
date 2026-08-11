import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { springMagnetic } from '../utils/motion.js'

export default function MagneticButton({
  children,
  className = '',
  wrapperClassName = '',
  strength = 0.28,
  as: Tag = 'button',
  ...props
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springMagnetic)
  const sy = useSpring(y, springMagnetic)

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${wrapperClassName}`}
    >
      <Tag className={className} {...props}>
        {children}
      </Tag>
    </motion.div>
  )
}
