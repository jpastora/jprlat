import { motion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'

/*
  SectionTitle — encabezado de sección con etiqueta mono, chevron ">"
  y subrayado naranja. Usa itemVariants para entrar con stagger.
*/
export default function SectionTitle({ tag, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      {tag && (
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-tech"
        >
          <span className="text-orange">{'>'}</span>
          {tag}
        </motion.span>
      )}
      <motion.h2
        variants={itemVariants}
        className="font-heading text-3xl font-semibold tracking-tight text-carbon sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.span
        variants={itemVariants}
        className="h-0.5 w-12 rounded-full bg-orange"
        aria-hidden="true"
      />
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`max-w-2xl font-body text-base text-tech ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
