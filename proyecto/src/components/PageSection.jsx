import { motion, useReducedMotion } from 'framer-motion'

/*
  PageSection — contenedor de sección con ritmo editorial variable.
  Sin números, sin labels internos, sin grids decorativos.
*/
export default function PageSection({
  id,
  children,
  className = '',
  tone = 'white',
  wide = false,
  stagger = 0.08,
}) {
  const reduce = useReducedMotion()
  const toneClass =
    tone === 'soft' ? 'bg-soft' : tone === 'bleed-soft' ? 'bg-soft/60' : 'bg-white'

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
  }

  const inner = (
    <div
      className={`relative mx-auto px-5 ${wide ? 'max-w-[76rem]' : 'max-w-6xl'} ${className}`}
    >
      {children}
    </div>
  )

  if (reduce) {
    return (
      <section id={id} className={`relative ${toneClass}`}>
        {inner}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={`relative ${toneClass}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {inner}
    </motion.section>
  )
}
