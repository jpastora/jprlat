import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SignalNode from './SignalNode.jsx'

/*
  AnimatedDivider — divisor horizontal del sistema.
  La línea se dibuja al entrar en viewport; nodo naranja central.
*/
export default function AnimatedDivider({ className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <div
      ref={ref}
      className={`relative mx-auto flex max-w-6xl items-center px-5 py-2 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="h-px flex-1 origin-left bg-line"
        style={reduce ? undefined : { scaleX }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="mx-3 flex items-center gap-1.5">
        <SignalNode active pulse size="sm" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-tech">
          {'>'}
        </span>
        <SignalNode active size="sm" />
      </div>
      <motion.div
        className="h-px flex-1 origin-right bg-line"
        style={reduce ? undefined : { scaleX }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
