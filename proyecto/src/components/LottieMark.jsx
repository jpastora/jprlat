import '../lib/setupDotLottie.js'
import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Player = typeof DotLottieReact === 'function' ? DotLottieReact : null

function toAnimationData(animationData) {
  if (!animationData) return null
  if (typeof animationData === 'string') return animationData
  try {
    return JSON.stringify(animationData)
  } catch {
    return null
  }
}

export default function LottieMark({
  animationData,
  loop = false,
  autoplay = true,
  className = '',
  playKey,
  onComplete,
  fallback = null,
}) {
  const reduce = useReducedMotion()
  const data = useMemo(() => toAnimationData(animationData), [animationData])
  const instanceRef = useRef(null)

  useEffect(() => {
    const instance = instanceRef.current
    if (!instance || !onComplete) return undefined

    const handler = () => onComplete()
    instance.addEventListener('complete', handler)
    return () => instance.removeEventListener('complete', handler)
  }, [onComplete, data, playKey])

  useEffect(() => {
    const instance = instanceRef.current
    if (!instance || reduce) return
    if (autoplay) instance.play()
  }, [autoplay, data, playKey, reduce])

  if (reduce || !Player || !data) return fallback

  return (
    <Player
      key={playKey}
      data={data}
      loop={loop}
      autoplay={autoplay}
      className={className}
      dotLottieRefCallback={(instance) => {
        instanceRef.current = instance
      }}
      aria-hidden="true"
    />
  )
}
