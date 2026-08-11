import { siteConfig } from '../config/site.config.js'

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

/** Lazy-load Calendly assets and open the popup. Analytics run in scheduler.js. */
export async function loadCalendlyAndOpen() {
  await loadCalendlyScript()
  window.Calendly.initPopupWidget({ url: siteConfig.calendlyUrl })
}

/**
 * @deprecated Use openScheduler from scheduler.js
 * @param {string} [_whatsappMessage]
 */
export async function openCalendly(_whatsappMessage) {
  const { openScheduler } = await import('./scheduler.js')
  return openScheduler({ whatsappMessage: _whatsappMessage })
}
