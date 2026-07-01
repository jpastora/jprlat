/*
  Utilidades de scroll y navegación por anclas.
  Respetan prefers-reduced-motion (evitan smooth scroll si el usuario lo pide).
*/

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const HEADER_OFFSET = 80

/** Desplaza suavemente hasta una sección por id (sin cambiar el hash). */
export function scrollToSection(id) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior })
}

/** Vuelve al inicio de la página. */
export function scrollToTop() {
  if (typeof window === 'undefined') return
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
}
