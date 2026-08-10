import { CheckCircle2 } from 'lucide-react'
import LottieMark from './LottieMark.jsx'
import successCheck from '../assets/lottie/success-check.json'

export default function ContactSuccessMark({ playKey }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center" aria-hidden="true">
      <LottieMark
        playKey={playKey}
        animationData={successCheck}
        loop={false}
        autoplay
        className="h-12 w-12"
        fallback={<CheckCircle2 size={48} className="text-orange" />}
      />
    </span>
  )
}
