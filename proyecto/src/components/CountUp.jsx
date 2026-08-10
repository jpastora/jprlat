import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
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
  const [display, setDisplay] = useState(reduce ? value : 0)

  useMotionValueEvent(spring, 'change', (v) => {
    setDisplay(Math.round(v))
  })

  useEffect(() => {
    if (!inView || reduce) {
      motionVal.set(value)
      setDisplay(value)
      return
    }
    const controls = animate(motionVal, value, {
      duration,
      ease: EASE_EXPO,
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration, motionVal])

  return (
    <motion.span ref={ref} className={className}>
      {display}
      {suffix}
    </motion.span>
  )
}
