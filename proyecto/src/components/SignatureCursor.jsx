import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor]'
const LERP = 0.42

export default function SignatureCursor() {
  const reduce = useReducedMotion()
  const elRef = useRef(null)
  const enabledRef = useRef(false)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const angleRef = useRef(0)
  const onCtaRef = useRef(false)
  const glyphRef = useRef(null)

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

      glyph.classList.toggle('text-orange', onCtaRef.current)
      glyph.classList.toggle('text-carbon/50', !onCtaRef.current)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target.closest(INTERACTIVE)
      if (!target) {
        onCtaRef.current = false
        return
      }

      onCtaRef.current =
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
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden font-mono text-xs font-semibold will-change-transform md:block"
      style={{ marginLeft: 10, marginTop: 10 }}
      aria-hidden="true"
    >
      <span ref={glyphRef} className="text-carbon/50">
        {'>'}
      </span>
    </span>
  )
}
