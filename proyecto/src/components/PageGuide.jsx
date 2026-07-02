import { useEffect, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ALL_SECTIONS } from '../data/navigation.js'

export default function PageGuide() {
  const reduce = useReducedMotion()
  const [nodeY, setNodeY] = useState(96)
  const [activeId, setActiveId] = useState('inicio')

  const { scrollYProgress } = useScroll()
  const lineScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.08, 1]),
    { stiffness: 90, damping: 26 },
  )

  useEffect(() => {
    const updateNode = () => {
      const active = ALL_SECTIONS.find((s) => s.id === activeId)
      const el = active ? document.getElementById(active.id) : null
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = window.scrollY + rect.top + rect.height * 0.22
      setNodeY(center)
    }

    updateNode()
    window.addEventListener('scroll', updateNode, { passive: true })
    window.addEventListener('resize', updateNode)
    return () => {
      window.removeEventListener('scroll', updateNode)
      window.removeEventListener('resize', updateNode)
    }
  }, [activeId])

  useEffect(() => {
    const observers = []
    for (const s of ALL_SECTIONS) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id)
        },
        { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  if (reduce) {
    return (
      <div
        className="pointer-events-none fixed inset-y-0 left-[max(1.25rem,calc(50%-42rem))] z-0 hidden w-px bg-line lg:block"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-[max(1.25rem,calc(50%-42rem))] z-0 hidden lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 w-px bg-line/70" />
      <motion.div
        className="absolute inset-x-0 top-0 w-px origin-top bg-orange/40"
        style={{ scaleY: lineScale, height: '100%' }}
      />
      <motion.span
        className="absolute h-2 w-2 -translate-x-[3.5px] rounded-full bg-orange"
        animate={{ top: nodeY }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{ willChange: 'top' }}
      />
    </div>
  )
}
