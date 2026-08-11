import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { scrollToSection } from '../utils/scroll.js'
import { track } from '../lib/analytics.js'
import { EASE_EXPO } from '../utils/motion.js'

const DELTA_THRESHOLD = 8
const TOGGLE_DISTANCE = 48

export default function StickyMobileCTA() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  const stateRef = useRef({
    lastY: 0,
    direction: 'down',
    accumulated: 0,
    shown: false,
    contactInView: false,
    inputFocused: false,
    rafId: 0,
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const state = stateRef.current

    const contactEl = document.getElementById('contacto')
    const contactObs = contactEl
      ? new IntersectionObserver(
          ([entry]) => {
            state.contactInView = entry.isIntersecting && entry.intersectionRatio > 0.15
          },
          { threshold: [0, 0.15, 0.35] },
        )
      : null
    contactObs?.observe(contactEl)

    const onFocusIn = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        state.inputFocused = true
      }
    }
    const onFocusOut = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        requestAnimationFrame(() => {
          state.inputFocused = document.activeElement?.matches('input, textarea, select') ?? false
        })
      }
    }

    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)

    const evaluate = () => {
      if (!mq.matches) {
        if (state.shown) {
          state.shown = false
          setVisible(false)
        }
        return
      }

      const y = window.scrollY
      const pastHero = y > window.innerHeight * 0.75
      const blocked = state.contactInView || state.inputFocused

      let next = state.shown
      if (!pastHero || blocked) {
        next = false
        state.accumulated = 0
      } else if (state.direction === 'up' && state.accumulated >= TOGGLE_DISTANCE) {
        next = true
      } else if (state.direction === 'down' && state.accumulated >= TOGGLE_DISTANCE) {
        next = false
      }

      if (next !== state.shown) {
        state.shown = next
        setVisible(next)
      }
    }

    const onScroll = () => {
      if (state.rafId) return
      state.rafId = requestAnimationFrame(() => {
        state.rafId = 0

        if (!mq.matches) {
          evaluate()
          return
        }

        const y = window.scrollY
        const delta = y - state.lastY

        if (Math.abs(delta) >= DELTA_THRESHOLD) {
          const dir = delta > 0 ? 'down' : 'up'
          if (dir !== state.direction) {
            state.direction = dir
            state.accumulated = Math.abs(delta)
          } else {
            state.accumulated += Math.abs(delta)
          }
          state.lastY = y
        }

        evaluate()
      })
    }

    state.lastY = window.scrollY
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(state.rafId)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
      contactObs?.disconnect()
    }
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
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-line dark:bg-carbon/95 md:hidden"
        >
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <MagneticButton
              type="button"
              onClick={() => {
                track('cta_click', { label: 'talk', source: 'sticky_mobile' })
                scrollToSection('contacto')
              }}
              wrapperClassName="block min-w-0 flex-1"
              className="inline-flex w-full min-w-0 items-center justify-center whitespace-nowrap rounded-lg bg-carbon px-5 py-3 font-body text-base font-semibold text-white"
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
