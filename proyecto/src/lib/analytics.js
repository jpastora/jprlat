/*
  Analytics wrapper — listo para GA4 sin vendor lock.
  Define VITE_GA4_ID en .env para activar gtag en producción.
*/

const GA4_ID = import.meta.env.VITE_GA4_ID
const isDev = import.meta.env.DEV
let initialized = false

export function initAnalytics() {
  if (initialized || !GA4_ID || isDev) return
  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, { send_page_view: true })
}

/**
 * @param {string} event
 * @param {Record<string, string | number | boolean>} [params]
 */
export function track(event, params = {}) {
  if (isDev) {
    console.log('[analytics]', event, params)
  }
  if (GA4_ID && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}
