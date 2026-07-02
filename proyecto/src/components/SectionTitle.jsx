import { motion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'
import SignalNode from './SignalNode.jsx'

export default function SectionTitle({ tag, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} gap-4`}>
      {tag && (
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-tech"
        >
          <SignalNode active size="sm" />
          <span className="text-orange">{'>'}</span>
          {tag}
        </motion.span>
      )}
      <motion.h2
        variants={itemVariants}
        className="font-heading text-3xl font-bold tracking-tight text-carbon sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2"
        aria-hidden="true"
      >
        <span className="h-0.5 w-16 rounded-full bg-orange" />
        <SignalNode active size="sm" />
        <span className="h-px w-8 bg-line" />
      </motion.div>
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`max-w-2xl font-body text-base leading-relaxed text-tech sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
