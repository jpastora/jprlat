import { motion, useReducedMotion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.jsx'
import { EASE_EXPO } from '../utils/motion.js'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-carbon transition-colors hover:border-cool dark:border-line dark:text-carbon"
    >
      <motion.span
        key={theme}
        initial={reduce ? false : { opacity: 0, rotate: -30, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_EXPO }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.span>
    </button>
  )
}
