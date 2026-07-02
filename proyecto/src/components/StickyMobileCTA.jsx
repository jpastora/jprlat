import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { scrollToSection } from '../utils/scroll.js'
import { track } from '../lib/analytics.js'
import { EASE_EXPO } from '../utils/motion.js'

export default function StickyMobileCTA() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onScroll = () => {
      if (!mq.matches) {
        setVisible(false)
        return
      }
      const y = window.scrollY
      const pastHero = y > window.innerHeight * 0.85
      const scrollingUp = y < lastY.current - 4
      setVisible(pastHero && scrollingUp)
      lastY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = `https://wa.me/${contactInfo.whatsappDigits}?text=${encodeURIComponent(t.whatsapp.message)}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_EXPO }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/90 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:bg-white/10 md:hidden"
        >
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <MagneticButton
              type="button"
              onClick={() => {
                track('cta_click', { label: 'talk', source: 'sticky_mobile' })
                scrollToSection('contacto')
              }}
              className="flex-1 rounded-lg bg-carbon py-3 font-body text-sm font-semibold text-white"
            >
              {t.cta.talk}
            </MagneticButton>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              aria-label={t.whatsapp.aria}
              onClick={() => track('whatsapp_click', { source: 'sticky_mobile' })}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange text-white"
            >
              <MessageCircle size={20} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
