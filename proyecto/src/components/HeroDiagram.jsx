import { useRef, useCallback } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import { EASE_EXPO } from '../utils/motion.js'

const NODES = [
  { cx: 40, cy: 220, r: 3, fill: '#D1D5DB' },
  { cx: 280, cy: 160, r: 3, fill: '#6B7280' },
  { cx: 320, cy: 80, r: 4, fill: '#FF6B00', pulse: true },
]

export default function HeroDiagram() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 120, damping: 24 })
  const springY = useSpring(pointerY, { stiffness: 120, damping: 24 })

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.35 + i * 0.12, duration: 0.75, ease: EASE_EXPO },
        opacity: { delay: 0.35 + i * 0.12, duration: 0.2 },
      },
    }),
  }

  const onMove = useCallback(
    (e) => {
      if (reduce || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 14
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 10
      pointerX.set(nx)
      pointerY.set(ny)
    },
    [reduce, pointerX, pointerY],
  )

  const onLeave = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full max-w-md lg:max-w-none"
      aria-hidden="true"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pos-dotgrid absolute -right-8 -top-8 h-40 w-40 opacity-35" />

      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        fill="none"
        style={reduce ? undefined : { x: springX, y: springY }}
      >
        <motion.path
          d="M40 220 C120 80, 200 80, 280 160"
          stroke="#E5E7EB"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          custom={0}
        />
        <motion.path
          d="M40 180 H360"
          stroke="#D1D5DB"
          strokeWidth="1"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          custom={1}
        />
        <motion.path
          d="M320 180 V80"
          stroke="#FF6B00"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          custom={2}
        />
        {NODES.map((node) =>
          node.pulse && !reduce ? (
            <motion.circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fill}
              animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : (
            <circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fill}
            />
          ),
        )}
      </motion.svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.55, ease: EASE_EXPO }}
        style={reduce ? undefined : { x: springX, y: springY }}
      >
        <AnimatedLogoMark size={72} />
      </motion.div>
    </div>
  )
}
