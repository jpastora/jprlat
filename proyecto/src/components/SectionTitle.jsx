import { motion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'

export default function SectionTitle({ title, subtitle, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      <motion.h2
        variants={itemVariants}
        className="max-w-[22ch] font-heading text-3xl font-semibold tracking-tight text-carbon sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`max-w-prose font-body text-base leading-relaxed text-tech sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  )
}
