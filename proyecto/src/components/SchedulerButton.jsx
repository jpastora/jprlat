import { Calendar } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import { openScheduler } from '../lib/scheduler.js'
import { track } from '../lib/analytics.js'
import { useLanguage } from '../context/LanguageContext.js'
import { useTheme } from '../hooks/useTheme.jsx'

export default function SchedulerButton({
  className = '',
  variant = 'secondary',
  source = 'unknown',
}) {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const handleClick = () => {
    track('cta_click', { label: 'schedule', source })
    openScheduler(t.whatsapp.message, { source, theme })
  }

  const styles =
    variant === 'primary'
      ? 'inline-flex min-w-[11rem] items-center justify-center gap-2.5 rounded-lg bg-orange px-8 py-3.5 font-body text-base font-semibold text-white transition-colors hover:bg-carbon'
      : 'inline-flex items-center justify-center gap-2 rounded-lg border border-cool px-6 py-3 font-body text-base font-semibold text-carbon transition-colors hover:border-orange hover:text-orange dark:border-cool dark:text-carbon dark:hover:border-orange'

  return (
    <MagneticButton
      type="button"
      onClick={handleClick}
      data-cursor="cta"
      className={`${styles} ${className}`}
    >
      <Calendar size={variant === 'primary' ? 18 : 16} aria-hidden="true" />
      <span>{t.cta.schedule}</span>
    </MagneticButton>
  )
}
