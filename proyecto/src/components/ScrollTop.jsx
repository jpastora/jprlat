import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToTop } from '../utils/scroll.js'

/*
  ScrollTop — aparece tras hacer scroll. Se ubica en la esquina inferior
  derecha, POR ENCIMA del botón de WhatsApp (no se solapan).
*/
export default function ScrollTop() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label={t.cta.scrollTop}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
          whileHover={reduce ? undefined : { y: -3 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-carbon shadow-sm transition-colors hover:border-orange hover:text-orange"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
