import { motion, useReducedMotion } from 'framer-motion'

/*
  BracketFrame — marco de brackets reutilizable.
  Revela esquinas con animación y punto naranja activo.
*/
export default function BracketFrame({
  children,
  className = '',
  innerClassName = '',
  size = 'md',
  showActivePoint = true,
}) {
  const reduce = useReducedMotion()

  const bracketSize = size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'

  const corner = (position) => {
    const positions = {
      tl: `absolute -left-1 -top-1 ${bracketSize} border-l-2 border-t-2 border-carbon`,
      tr: `absolute -right-1 -top-1 ${bracketSize} border-r-2 border-t-2 border-cool`,
      bl: `absolute -bottom-1 -left-1 ${bracketSize} border-b-2 border-l-2 border-cool`,
      br: `absolute -bottom-1 -right-1 ${bracketSize} border-b-2 border-r-2 border-orange`,
    }
    return positions[position]
  }

  const reveal = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div className={`relative ${className}`}>
      {['tl', 'tr', 'bl', 'br'].map((pos, i) => (
        <motion.span
          key={pos}
          className={corner(pos)}
          variants={reduce ? undefined : reveal}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          custom={i}
          aria-hidden="true"
        />
      ))}

      {showActivePoint && (
        <motion.span
          className="absolute -right-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.3 }}
          aria-hidden="true"
        />
      )}

      <div className={innerClassName}>{children}</div>
    </div>
  )
}
