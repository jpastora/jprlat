import { siteConfig, isSchedulerConfigured } from '../config/site.config.js'
import { contactInfo } from '../data/translations.js'
import { track } from './analytics.js'

const BRAND_COLOR = '#FF6B00'

let calApiPromise = null

function openWhatsAppFallback(whatsappMessage, source) {
  const msg = encodeURIComponent(whatsappMessage ?? '')
  window.open(`https://wa.me/${contactInfo.whatsappDigits}?text=${msg}`, '_blank', 'noopener')
  track('scheduler_fallback', { source })
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

/** @param {{ theme: 'light' | 'dark', source: string }} opts */
async function openCalModal({ theme, source }) {
  const cal = await loadCalApi()
  const calLink = getCalLinkFromUrl(siteConfig.schedulerUrl)
  cal('ui', buildCalUiConfig(theme))
  cal('modal', { calLink })
  track('scheduler_open', { source })
}

/**
 * Open Cal.com booking modal or WhatsApp when schedulerUrl is not configured.
 * @param {string} [whatsappMessage]
 * @param {{ source?: string, theme?: 'light' | 'dark' }} [opts]
 */
export async function openScheduler(
  whatsappMessage,
  { source = 'unknown', theme = 'light' } = {},
) {
  if (!isSchedulerConfigured()) {
    openWhatsAppFallback(whatsappMessage, source)
    return false
  }

  await openCalModal({ theme, source })
  return true
}
