import { motion, useReducedMotion } from 'framer-motion'

/*
  AnimatedLogoMark — logo compacto JP> animado.
  - Reveal por opacidad + entrada lateral suave.
  - Chevron ">" naranja con pulso sutil.
  - Sin 3D. Respeta prefers-reduced-motion.

  PLACEHOLDER: la versión estática vive en src/assets/logo/jp-logo-compact.svg
*/
export default function AnimatedLogoMark({ size = 40, className = '' }) {
  const reduce = useReducedMotion()

  const chevronAnim = reduce
    ? {}
    : {
        opacity: [1, 0.55, 1],
        x: [0, 1.5, 0],
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
      }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="JP>"
      className={className}
      initial={reduce ? false : { opacity: 0, x: -8 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#111111" />
      <text
        x="12"
        y="42"
        fontFamily="'Geist', system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        JP
      </text>
      <motion.path
        d="M45 22 L54 32 L45 42"
        stroke="#FF6B00"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={chevronAnim}
      />
    </motion.svg>
  )
}
