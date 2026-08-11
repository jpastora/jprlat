import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import LottieMark from './LottieMark.jsx'
import calendarSchedule from '../assets/lottie/calendar-schedule.json'

const MARK_SIZE = 'h-[7.5rem] w-[7.5rem]'

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
      <span
        className={`inline-flex ${MARK_SIZE} shrink-0 items-center justify-center text-orange`}
        aria-hidden="true"
      >
        <Calendar size={80} strokeWidth={1.5} />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={`inline-flex ${MARK_SIZE} shrink-0 items-center justify-center`}
      aria-hidden="true"
    >
      {active ? (
        <LottieMark
          animationData={calendarSchedule}
          loop
          autoplay
          className={MARK_SIZE}
          fallback={<Calendar size={80} className="text-orange" strokeWidth={1.5} />}
        />
      ) : (
        <Calendar size={80} className="text-tech" strokeWidth={1.5} />
      )}
    </span>
  )
}
