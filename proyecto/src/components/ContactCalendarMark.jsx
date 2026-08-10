import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import LottieMark from './LottieMark.jsx'
import calendarSchedule from '../assets/lottie/calendar-schedule.json'

export default function ContactCalendarMark() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '40px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduce])

  if (reduce) {
    return (
      <span className="inline-flex h-28 w-28 shrink-0 items-center justify-center text-orange" aria-hidden="true">
        <Calendar size={72} strokeWidth={1.5} />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className="inline-flex h-28 w-28 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {active ? (
        <LottieMark
          animationData={calendarSchedule}
          loop
          autoplay
          className="h-28 w-28"
          fallback={<Calendar size={72} className="text-orange" strokeWidth={1.5} />}
        />
      ) : (
        <Calendar size={72} className="text-tech" strokeWidth={1.5} />
      )}
    </span>
  )
}
