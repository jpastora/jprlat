import { lazy, Suspense } from 'react'
import { useReducedMotion } from 'framer-motion'

const Lottie = lazy(() =>
  import('lottie-react').then((mod) => {
    const Component =
      typeof mod.default === 'function'
        ? mod.default
        : mod.default?.default ?? mod.LottiePlayer

    if (typeof Component !== 'function') {
      throw new Error('lottie-react did not provide a valid component export')
    }

    return { default: Component }
  }),
)

export default function LottieAnimation({
  animationData,
  loop = false,
  autoplay = true,
  className = '',
  onComplete,
  fallback = null,
}) {
  const reduce = useReducedMotion()

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
