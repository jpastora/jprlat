import { siteConfig, isSchedulerConfigured, getActiveSchedulerUrl } from '../config/site.config.js'
import { contactInfo } from '../data/translations.js'
import { track } from './analytics.js'

const BRAND_COLOR = '#FF6B00'

let calApiPromise = null

function trackSchedulerOpen(source) {
  const provider = siteConfig.schedulerProvider
  track('scheduler_open', { source, provider })
  track('calendly_open', { source })
}

function openWhatsAppFallback(whatsappMessage) {
  const msg = encodeURIComponent(whatsappMessage ?? '')
  window.open(`https://wa.me/${contactInfo.whatsappDigits}?text=${msg}`, '_blank', 'noopener')
  track('whatsapp_click', { source: 'scheduler_fallback' })
}

/** @param {string} url */
export function getCalLinkFromUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.pathname.replace(/^\/+|\/+$/g, '')
  } catch {
    return ''
  }
}

async function loadCalApi() {
  if (!calApiPromise) {
    calApiPromise = import('@calcom/embed-react').then(({ getCalApi }) => getCalApi())
  }
  return calApiPromise
}

/** @param {'light' | 'dark'} theme */
function buildCalUiConfig(theme) {
  return {
    theme,
    branding: { brandColor: BRAND_COLOR },
    cssVarsPerTheme: {
      light: {
        'cal-brand': BRAND_COLOR,
        'cal-brand-emphasis': '#E55F00',
        'cal-brand-text': '#FFFFFF',
      },
      dark: {
        'cal-brand': BRAND_COLOR,
        'cal-brand-emphasis': '#FF8533',
        'cal-brand-text': '#FFFFFF',
      },
    },
  }
}

/** @param {{ theme: 'light' | 'dark' }} opts */
async function openCalModal({ theme }) {
  const cal = await loadCalApi()
  const calLink = getCalLinkFromUrl(siteConfig.schedulerUrl)
  cal('ui', buildCalUiConfig(theme))
  cal('modal', { calLink })
}

async function openCalendlyModal() {
  const { loadCalendlyAndOpen } = await import('./calendly.js')
  await loadCalendlyAndOpen()
}

/**
 * Open scheduling modal (Cal.com or Calendly) or WhatsApp when unconfigured.
 * @param {{ source?: string, theme?: 'light' | 'dark', whatsappMessage?: string }} [opts]
 */
export async function openScheduler({
  source = 'unknown',
  theme = 'light',
  whatsappMessage,
} = {}) {
  trackSchedulerOpen(source)

  if (!isSchedulerConfigured()) {
    openWhatsAppFallback(whatsappMessage)
    return false
  }

  if (siteConfig.schedulerProvider === 'calendly') {
    await openCalendlyModal()
    return true
  }

  await openCalModal({ theme })
  return true
}

/** @returns {string} Active scheduler URL for the current provider. */
export function getSchedulerUrl() {
  return getActiveSchedulerUrl()
}
