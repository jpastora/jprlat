import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import LottieMark from './LottieMark.jsx'
import arrowLoop from '../assets/lottie/arrow-loop.json'

export default function CtaLottieArrow({ light = false }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)

  if (reduce) {
    return <ChevronRight size={16} aria-hidden="true" className={light ? 'text-white' : undefined} />
  }

  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-hidden="true"
    >
      {hover ? (
        <LottieMark
          animationData={arrowLoop}
          loop
          autoplay
          className={`h-4 w-4 ${light ? 'brightness-200' : ''}`}
          fallback={<ChevronRight size={16} />}
        />
      ) : (
        <ChevronRight size={16} className={light ? 'text-white' : undefined} />
      )}
    </span>
  )
}
