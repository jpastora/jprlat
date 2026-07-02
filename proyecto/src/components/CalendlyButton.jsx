import { Calendar } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { openCalendly } from '../lib/calendly.js'
import { track } from '../lib/analytics.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function CalendlyButton({
  className = '',
  variant = 'secondary',
  source = 'unknown',
}) {
  const { t } = useLanguage()

  const handleClick = () => {
    track('cta_click', { label: 'calendly', source })
    openCalendly(t.whatsapp.message)
  }

  const styles =
    variant === 'primary'
      ? 'rounded-lg bg-orange px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-carbon'
      : 'inline-flex items-center gap-2 rounded-lg border border-cool px-6 py-3 font-body text-sm font-semibold text-carbon transition-colors hover:border-orange hover:text-orange'

  return (
    <MagneticButton
      type="button"
      onClick={handleClick}
      data-cursor="cta"
      className={`${styles} ${className}`}
    >
      <Calendar size={16} aria-hidden="true" />
      {t.cta.schedule}
    </MagneticButton>
  )
}
