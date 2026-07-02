import { motion, useReducedMotion } from 'framer-motion'
import SignalNode from './SignalNode.jsx'

/*
  SystemFlow — flujo animado input → proceso → output.
  Líneas SVG con pathLength, nodos secuenciales y chevrons en movimiento.
*/
export default function SystemFlow({
  steps = [],
  className = '',
  variant = 'horizontal',
}) {
  const reduce = useReducedMotion()

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.3, duration: 0.85, ease: 'easeInOut' },
        opacity: { delay: i * 0.3, duration: 0.2 },
      },
    }),
  }

  const chevronMove = reduce
    ? {}
    : {
        x: [0, 6, 0],
        opacity: [0.4, 1, 0.4],
        transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
      }

  if (variant === 'pipeline' && steps.length >= 4) {
    return (
      <div className={`relative ${className}`}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 80"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M20 40 H380"
            stroke="#E5E7EB"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={reduce ? undefined : draw}
            initial={reduce ? false : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.4 }}
            custom={0}
          />
          {[80, 160, 240, 320].map((x, i) => (
            <motion.path
              key={x}
              d={`M${x} 40 H${x + 40}`}
              stroke={i === steps.length - 1 ? '#FF6B00' : '#D1D5DB'}
              strokeWidth="2"
              strokeLinecap="round"
              variants={reduce ? undefined : draw}
              initial={reduce ? false : 'hidden'}
              whileInView={reduce ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.4 }}
              custom={i + 1}
            />
          ))}
          <motion.text
            x="200"
            y="28"
            textAnchor="middle"
            fontFamily="'Geist Mono', monospace"
            fontSize="12"
            fill="#FF6B00"
            animate={chevronMove}
          >
            {'>'}
          </motion.text>
        </svg>

        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.45 }}
              className="flex flex-col items-center gap-2 rounded-lg border border-line bg-white px-2 py-3 text-center"
            >
              <SignalNode active={i === steps.length - 1} pulse={i === steps.length - 1} size="sm" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-tech">
                0{i + 1}
              </span>
              <span className="font-heading text-[11px] font-semibold leading-tight text-carbon">
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        className="h-full w-full"
        viewBox="0 0 320 120"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M20 60 H140"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
        />
        <motion.path
          d="M140 60 H200"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          custom={1}
        />
        <motion.path
          d="M200 60 H300"
          stroke="#FF6B00"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={reduce ? undefined : draw}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.4 }}
          custom={2}
        />

        {[20, 140, 200, 300].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={60}
            r={i === 3 ? 5 : 4}
            fill={i === 3 ? '#FF6B00' : i === 1 ? '#111111' : '#6B7280'}
          />
        ))}

        <motion.text
          x="170"
          y="45"
          fontFamily="'Geist Mono', monospace"
          fontSize="14"
          fill="#FF6B00"
          animate={chevronMove}
        >
          {'>'}
        </motion.text>
      </svg>

      {steps.length > 0 && (
        <div className="mt-2 flex justify-between px-1">
          {steps.map((step, i) => (
            <span
              key={step}
              className={`max-w-[4.5rem] text-center font-mono text-[9px] uppercase leading-tight tracking-wider ${
                i === steps.length - 1 ? 'text-orange' : 'text-tech'
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
