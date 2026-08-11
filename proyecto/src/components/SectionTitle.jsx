import { motion, useReducedMotion } from 'framer-motion'
import { itemVariants, maskReveal } from '../utils/motion.js'

export default function SectionTitle({ title, subtitle, align = 'left', className = '' }) {
  const reduce = useReducedMotion()
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  const reveal = reduce ? (
    <h2 className="max-w-[22ch] font-heading text-[2rem] font-semibold leading-[1.5] tracking-tight text-carbon sm:text-[2.5rem]">
      {title}
    </h2>
  ) : (
    <div className="overflow-hidden pb-[0.12em]">
      <motion.h2
        variants={maskReveal}
        className="max-w-[22ch] font-heading text-[2rem] font-semibold leading-[1.5] tracking-tight text-carbon sm:text-[2.5rem]"
      >
        {title}
      </motion.h2>
    </div>
  )

  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      <motion.div variants={itemVariants}>{reveal}</motion.div>
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`max-w-prose font-body text-base leading-[1.5] text-tech ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  )
}
