import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import MagneticButton from './MagneticButton.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToSection } from '../utils/scroll.js'
import { track } from '../lib/analytics.js'
import { SECTIONS } from '../data/navigation.js'

export default function Header() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id)
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line/80 bg-white/85 backdrop-blur-md dark:bg-white/5'
          : 'bg-white/60 backdrop-blur-sm dark:bg-white/5'
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[76rem] items-center justify-between px-5">
        <button
          type="button"
          onClick={() => go('inicio')}
          className="flex items-center gap-3"
          aria-label="Joseph Pastora — inicio"
        >
          <AnimatedLogoMark size={32} className="shrink-0" />
          <span className="hidden flex-col items-start sm:flex">
            <span className="font-heading text-base font-semibold leading-none text-carbon">
              Joseph Pastora
            </span>
            <span className="mt-1 font-body text-[0.875rem] leading-none text-tech">
              {t.meta.role}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {SECTIONS.map((s) => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3.5 py-2 font-body text-base transition-colors duration-200 ${
                  isActive ? 'text-carbon' : 'text-tech hover:text-carbon'
                }`}
              >
                {t.nav[s.key]}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2.5 -bottom-0.5 h-0.5 bg-orange"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageToggle />
          <MagneticButton
            type="button"
            onClick={() => {
              track('cta_click', { label: 'talk', source: 'header' })
              go('contacto')
            }}
            data-cursor="cta"
            className="rounded-lg bg-orange px-5 py-2.5 font-body text-base font-medium text-white transition-colors duration-300 hover:bg-carbon"
          >
            {t.cta.talk}
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MagneticButton
            type="button"
            onClick={() => {
              track('cta_click', { label: 'talk', source: 'header_mobile' })
              go('contacto')
            }}
            data-cursor="cta"
            wrapperClassName="shrink-0"
            className="inline-flex min-w-[6.75rem] items-center justify-center whitespace-nowrap rounded-lg bg-orange px-4 py-2 font-body text-base font-medium text-white transition-colors hover:bg-carbon"
          >
            {t.cta.talk}
          </MagneticButton>
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.cta.closeMenu : t.cta.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-carbon transition-colors hover:border-carbon"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegación móvil"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-white md:hidden dark:bg-white/5"
          >
            <ul className="mx-auto flex max-w-[76rem] flex-col px-5 py-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    className={`w-full rounded-md px-2 py-3 text-left font-body text-base transition-colors ${
                      active === s.id ? 'text-orange' : 'text-carbon hover:text-orange'
                    }`}
                  >
                    {t.nav[s.key]}
                  </button>
                </li>
              ))}
              <li className="mt-2 pb-2">
                <button
                  type="button"
                  onClick={() => go('contacto')}
                  className="inline-flex w-full min-w-0 items-center justify-center whitespace-nowrap rounded-lg bg-orange px-6 py-3 font-body text-base font-medium text-white"
                >
                  {t.cta.talk}
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
