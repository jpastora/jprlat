import { motion, useReducedMotion } from 'framer-motion'

/*
  MotionBackground — elementos abstractos del sistema en movimiento suave:
  brackets, puntos, líneas, chevrons y nodos flotando a distintas velocidades.
  Decorativo (aria-hidden). Respeta prefers-reduced-motion (queda estático).
*/
export default function MotionBackground({ className = '' }) {
  const reduce = useReducedMotion()

  const float = (dur, distance = 10) =>
    reduce
      ? {}
      : {
          y: [0, -distance, 0],
          transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
        }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Bracket flotante */}
      <motion.span
        className="absolute left-[8%] top-[18%] h-10 w-10 border-l-2 border-t-2 border-cool/70"
        animate={float(7, 12)}
      />
      {/* Bracket naranja */}
      <motion.span
        className="absolute right-[10%] top-[28%] h-8 w-8 border-b-2 border-r-2 border-orange/60"
        animate={float(9, 14)}
      />
      {/* Nodo naranja */}
      <motion.span
        className="absolute left-[18%] top-[60%] h-2.5 w-2.5 rounded-full bg-orange/70"
        animate={float(6, 16)}
      />
      {/* Nodo gris */}
      <motion.span
        className="absolute right-[22%] top-[70%] h-2 w-2 rounded-full bg-cool"
        animate={float(8, 10)}
      />
      {/* Chevron ">" */}
      <motion.span
        className="absolute right-[16%] top-[50%] font-mono text-lg text-tech/50"
        animate={float(10, 8)}
      >
        {'>'}
      </motion.span>
      {/* Línea fina diagonal */}
      <svg className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <line
          x1="0"
          y1="90%"
          x2="40%"
          y2="60%"
          stroke="#E5E7EB"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  )
}
