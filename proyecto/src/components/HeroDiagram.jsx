import { motion, useReducedMotion } from 'framer-motion'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'

/*
  HeroDiagram — diagrama abstracto refinado para el hero.
  Una sola pieza visual: líneas finas + marca JP>.
*/
export default function HeroDiagram() {
  const reduce = useReducedMotion()

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.3 + i * 0.2, duration: 1, ease: 'easeInOut' },
        opacity: { delay: 0.3 + i * 0.2, duration: 0.3 },
      },
    }),
  }

  return (
    <div className="relative aspect-[4/3] w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="pos-dotgrid absolute -right-8 -top-8 h-40 w-40 opacity-40" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        fill="none"
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
        <circle cx="40" cy="220" r="3" fill="#D1D5DB" />
        <circle cx="280" cy="160" r="3" fill="#6B7280" />
        <circle cx="320" cy="80" r="4" fill="#FF6B00" />
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatedLogoMark size={72} />
      </motion.div>
    </div>
  )
}
