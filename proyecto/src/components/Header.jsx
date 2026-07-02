import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import SignalNode from './SignalNode.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { scrollToSection } from '../utils/scroll.js'
import { SECTIONS } from '../data/navigation.js'

export default function Header() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-line bg-white/90 shadow-[0_1px_0_0_rgba(229,231,235,1)] backdrop-blur-md'
          : 'border-transparent bg-white/50 backdrop-blur-sm'
      }`}
    >
      {/* Línea naranja activa al hacer scroll */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-orange"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button
          type="button"
          onClick={() => go('inicio')}
          className="group flex items-center gap-2.5"
          aria-label="Joseph Pastora — inicio"
        >
          <AnimatedLogoMark size={36} />
          <span className="hidden font-heading text-sm font-semibold tracking-tight text-carbon sm:block">
            Joseph Pastora
            <span className="ml-1.5 inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-widest text-tech">
              <SignalNode active={scrolled} pulse={scrolled} size="sm" />
              Performance OS
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Navegación principal">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              className="group relative rounded-md px-3 py-2 font-body text-sm text-tech transition-colors duration-200 hover:text-orange"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="font-mono text-[9px] text-orange opacity-0 transition-opacity group-hover:opacity-100">
                  {'>'}
                </span>
                {t.nav[s.key]}
              </span>
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => go('contacto')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-carbon px-4 py-2 font-body text-sm font-medium text-white transition-colors duration-300 hover:bg-orange"
          >
            {t.cta.talk}
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.cta.closeMenu : t.cta.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-carbon transition-colors hover:border-orange hover:text-orange"
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
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-3 text-left font-body text-base text-carbon transition-colors hover:text-orange"
                  >
                    <SignalNode active size="sm" />
                    {t.nav[s.key]}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <button
                  type="button"
                  onClick={() => go('contacto')}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-carbon px-4 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-orange"
                >
                  {t.cta.talk}
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
