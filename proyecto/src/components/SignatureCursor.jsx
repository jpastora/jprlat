import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { springMagnetic } from '../utils/motion.js'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

export default function SignatureCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [onCta, setOnCta] = useState(false)
  const [angle, setAngle] = useState(0)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, springMagnetic)
  const sy = useSpring(y, springMagnetic)
  const r = useSpring(angle, { stiffness: 200, damping: 22 })
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const touch = window.matchMedia('(hover: none)').matches
    setEnabled(fine && !touch && !reduce)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('signature-cursor-active')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      posRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target.closest(INTERACTIVE)
      if (!target) {
        setOnCta(false)
        return
      }

      const isCta =
        target.classList.contains('bg-orange') ||
        target.closest('.bg-orange') ||
        target.dataset.cursor === 'cta'
      setOnCta(Boolean(isCta))

      const rect = target.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const deg = (Math.atan2(cy - e.clientY, cx - e.clientX) * 180) / Math.PI
      setAngle(deg)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.body.classList.remove('signature-cursor-active')
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.span
      className="pointer-events-none fixed left-0 top-0 z-[100] font-mono text-sm font-semibold"
      style={{ x: sx, y: sy, rotate: r, translateX: '-50%', translateY: '-50%' }}
      aria-hidden="true"
    >
      <span className={onCta ? 'text-orange' : 'text-carbon/70'}>{'>'}</span>
    </motion.span>
  )
}
