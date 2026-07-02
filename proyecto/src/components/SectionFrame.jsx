import { motion, useReducedMotion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'
import PerformanceGrid from './PerformanceGrid.jsx'

/*
  SectionFrame — wrapper editorial de sección.
  Incluye reveal al viewport y stagger para hijos con itemVariants.
*/
export default function SectionFrame({
  id,
  number,
  label,
  children,
  className = '',
  bg = 'white',
  showGrid = false,
  gridVariant = 'minimal',
  stagger = 0.1,
}) {
  const reduce = useReducedMotion()
  const bgClass = bg === 'soft' ? 'bg-soft' : 'bg-white'

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: 0.05 },
    },
  }

  const content = (
    <>
      {showGrid && <PerformanceGrid variant={gridVariant} className="opacity-30" />}

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 left-[8%] w-px bg-line/60" />
        <div className="absolute inset-y-0 right-[8%] w-px bg-line/60" />
        <div className="pos-dotgrid absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <motion.span
              variants={itemVariants}
              className="font-mono text-5xl font-medium leading-none tracking-tighter text-line sm:text-6xl"
            >
              {number}
            </motion.span>
            <div>
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-tech"
              >
                <span className="text-orange">[</span>
                {label}
                <span className="text-orange">]</span>
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="mt-2 block h-0.5 w-16 origin-left bg-orange"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {children}
      </div>
    </>
  )

  if (reduce) {
    return (
      <section id={id} className={`relative overflow-hidden ${bgClass} ${className}`}>
        {content}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={`relative overflow-hidden ${bgClass} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {content}
    </motion.section>
  )
}
