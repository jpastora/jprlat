import { useEffect } from 'react'
import { track } from '../lib/analytics.js'
import { ALL_SECTIONS } from '../data/navigation.js'

export function useSectionTracking() {
  useEffect(() => {
    const seen = new Set()
    const observers = []

    for (const s of ALL_SECTIONS) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seen.has(s.id)) {
            seen.add(s.id)
            track('section_view', { section: s.id })
          }
        },
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])
}
