import { useLanguage } from '../context/LanguageContext.js'
import { track } from '../lib/analytics.js'

/*
  LanguageToggle — switch ES / EN.
  ES es el idioma por defecto; el usuario cambia manualmente a EN.
  Accesible: role="group", aria-pressed en cada opción.
*/
export default function LanguageToggle({ className = '' }) {
  const { language, setLanguage } = useLanguage()

  const options = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <div
      role="group"
      aria-label="Cambiar idioma / Change language"
      className={`inline-flex items-center rounded-full border border-line bg-white p-0.5 font-mono text-[0.875rem] dark:bg-soft ${className}`}
    >
      {options.map((opt) => {
        const active = language === opt.code
        return (
          <button
            key={opt.code}
            type="button"
            aria-pressed={active}
            aria-label={opt.code === 'es' ? 'Español' : 'English'}
            onClick={() => {
              if (!active) {
                track('lang_toggle', { language: opt.code })
                setLanguage(opt.code)
              }
            }}
            className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${
              active
                ? 'bg-carbon text-white'
                : 'text-tech hover:text-orange'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
