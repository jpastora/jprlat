import { useRef, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from 'framer-motion'
import { EASE_EXPO } from '../utils/motion.js'

export default function CountUp({
  value,
  suffix = '',
  className = '',
  duration = 1.1,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 18 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView || reduce) {
      motionVal.set(value)
      return
    }
    const controls = animate(motionVal, value, {
      duration,
      ease: EASE_EXPO,
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration, motionVal])

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
