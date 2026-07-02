import { motion, useReducedMotion } from 'framer-motion'

/*
  SystemLines — SVG animado que representa flujo de datos / lógica de sistema.
  Las líneas se dibujan progresivamente con pathLength y terminan en nodos.
  Respeta prefers-reduced-motion (muestra el trazo final sin animación).
*/
export default function SystemLines({ className = '' }) {
  const reduce = useReducedMotion()

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.35, duration: 0.9, ease: 'easeInOut' },
        opacity: { delay: i * 0.35, duration: 0.2 },
      },
    }),
  }

  const nodePulse = reduce
    ? {}
    : {
        scale: [1, 1.35, 1],
        opacity: [0.7, 1, 0.7],
        transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
      }

  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Trazos de flujo: entrada -> proceso -> salida */}
      <motion.path
        d="M10 40 H120 V100 H210"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        variants={reduce ? undefined : draw}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.5 }}
        custom={0}
      />
      <motion.path
        d="M10 160 H90 V100 H210"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        variants={reduce ? undefined : draw}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.5 }}
        custom={1}
      />
      <motion.path
        d="M210 100 H300"
        stroke="#FF6B00"
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={reduce ? undefined : draw}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.5 }}
        custom={2}
      />

      {/* Nodos de entrada */}
      <circle cx="10" cy="40" r="4" fill="#6B7280" />
      <circle cx="10" cy="160" r="4" fill="#6B7280" />
      {/* Nodo de proceso */}
      <circle cx="210" cy="100" r="5" fill="#111111" />
      {/* Nodo de salida (naranja, con pulso) */}
      <motion.circle cx="300" cy="100" r="6" fill="#FF6B00" animate={nodePulse} />
    </svg>
  )
}
