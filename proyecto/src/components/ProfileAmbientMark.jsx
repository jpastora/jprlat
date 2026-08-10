import LottieMark from './LottieMark.jsx'
import flowAmbient from '../assets/lottie/flow-ambient.json'

export default function ProfileAmbientMark() {
  return (
    <LottieMark
      animationData={flowAmbient}
      loop
      autoplay
      className="pointer-events-none absolute right-0 top-6 hidden h-20 w-32 opacity-[0.12] lg:block"
      fallback={null}
    />
  )
}
