import { siteConfig, isCalendlyConfigured } from '../config/site.config.js'
import { contactInfo } from '../data/translations.js'
import { track } from './analytics.js'

let loadPromise = null

function loadCalendlyScript() {
  if (window.Calendly) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Calendly script failed to load'))
    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Abre Calendly popup o WhatsApp si la URL es placeholder.
 * @param {string} [whatsappMessage]
 */
export async function openCalendly(whatsappMessage) {
  track('calendly_open', { source: 'cta' })

  if (!isCalendlyConfigured()) {
    const msg = encodeURIComponent(whatsappMessage ?? '')
    window.open(`https://wa.me/${contactInfo.whatsappDigits}?text=${msg}`, '_blank', 'noopener')
    track('whatsapp_click', { source: 'calendly_fallback' })
    return false
  }

  await loadCalendlyScript()
  window.Calendly.initPopupWidget({ url: siteConfig.calendlyUrl })
  return true
}
