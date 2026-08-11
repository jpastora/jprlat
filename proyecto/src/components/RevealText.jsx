import { motion, useReducedMotion } from 'framer-motion'
import { EASE_EXPO, STAGGER_MS } from '../utils/motion.js'

/*
  RevealText — revela palabras o líneas con clip-path / translate.
*/
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  mode = 'words',
  delay = 0,
}) {
  const reduce = useReducedMotion()
  const units =
    mode === 'lines'
      ? text.split('\n').filter(Boolean)
      : text.split(/(\s+)/).filter(Boolean)

  if (reduce) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {units.map((unit, i) => {
        const isSpace = mode === 'words' && /^\s+$/.test(unit)
        if (isSpace) return unit

        return (
          <span key={`${unit}-${i}`} className="inline-block overflow-hidden pb-[0.14em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: delay + i * STAGGER_MS,
                duration: 0.55,
                ease: EASE_EXPO,
              }}
            >
              {unit}
              {mode === 'lines' ? ' ' : ''}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
