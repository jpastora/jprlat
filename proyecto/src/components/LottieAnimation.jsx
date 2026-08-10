import { lazy, Suspense, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const Lottie = lazy(() => import('lottie-react'))

export default function LottieAnimation({
  animationData,
  loop = false,
  autoplay = true,
  className = '',
  onComplete,
  fallback = null,
}) {
  const reduce = useReducedMotion()
  const playedRef = useRef(false)

  useEffect(() => {
    if (autoplay) playedRef.current = true
  }, [autoplay])

  if (reduce) return fallback

  return (
    <Suspense fallback={fallback ?? <span className={className} aria-hidden="true" />}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className={className}
        onComplete={onComplete}
        aria-hidden="true"
      />
    </Suspense>
  )
}
