import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor]'
const LERP = 0.42
const ORANGE = '#FF6B00'

export default function SignatureCursor() {
  const reduce = useReducedMotion()
  const elRef = useRef(null)
  const glyphRef = useRef(null)
  const enabledRef = useRef(false)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const angleRef = useRef(0)
  const interactiveRef = useRef(false)
  const ctaRef = useRef(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const touch = window.matchMedia('(hover: none)').matches
    enabledRef.current = fine && !touch && !reduce

    if (!enabledRef.current) return undefined

    const el = elRef.current
    const glyph = glyphRef.current
    if (!el || !glyph) return undefined

    const tick = () => {
      const { x: tx, y: ty } = targetRef.current
      const pos = posRef.current
      pos.x += (tx - pos.x) * LERP
      pos.y += (ty - pos.y) * LERP

      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angleRef.current}deg)`

      const onCta = ctaRef.current
      const onInteractive = interactiveRef.current
      const scale = onCta ? 1.28 : onInteractive ? 1.14 : 1
      const opacity = onCta ? 1 : onInteractive ? 0.95 : 0.88
      const shadow = onCta
        ? 'drop-shadow(0 0 8px rgba(255,107,0,0.65))'
        : onInteractive
          ? 'drop-shadow(0 0 4px rgba(255,107,0,0.35))'
          : 'drop-shadow(0 1px 2px rgba(255,107,0,0.2))'

      glyph.style.color = ORANGE
      glyph.style.opacity = String(opacity)
      glyph.style.transform = `scale(${scale})`
      glyph.style.filter = shadow

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target.closest(INTERACTIVE)
      if (!target) {
        interactiveRef.current = false
        ctaRef.current = false
        return
      }

      interactiveRef.current = true
      ctaRef.current =
        target.classList.contains('bg-orange') ||
        Boolean(target.closest('.bg-orange')) ||
        target.dataset.cursor === 'cta'

      const rect = target.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      angleRef.current =
        (Math.atan2(cy - e.clientY, cx - e.clientX) * 180) / Math.PI
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [reduce])

  if (reduce) return null

  return (
    <span
      ref={elRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden will-change-transform md:block"
      style={{ marginLeft: 10, marginTop: 10 }}
      aria-hidden="true"
    >
      <span
        ref={glyphRef}
        className="inline-block origin-center font-mono text-sm font-bold leading-none"
        style={{ color: ORANGE }}
      >
        {'>'}
      </span>
    </span>
  )
}
