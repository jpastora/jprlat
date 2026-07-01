import { motion, useReducedMotion } from 'framer-motion'

/*
  AnimatedSection — wrapper de <section> con reveal al entrar en viewport.
  Usa stagger para animar hijos que declaren `variants={itemVariants}`
  (importado desde utils/motion.js). Respeta prefers-reduced-motion.
*/
export default function AnimatedSection({
  id,
  className = '',
  children,
  as = 'section',
  stagger = 0.12,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.section

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: 0.05 },
    },
  }

  if (reduce) {
    const Tag = as
    return (
      <Tag id={id} className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
