/**
 * Classify EmailJS send errors for user-facing messages.
 * @param {unknown} err
 * @returns {'network' | 'rateLimit' | 'client' | 'server'}
 */
export function classifyEmailjsError(err) {
  const status =
    typeof err === 'object' && err !== null && 'status' in err
      ? Number(err.status)
      : NaN

  if (!Number.isFinite(status)) {
    return 'network'
  }
  if (status === 429) {
    return 'rateLimit'
  }
  if (status >= 400 && status < 500) {
    return 'client'
  }
  return 'server'
}

export function isEmailjsConfigured() {
  const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
    import.meta.env
  return Boolean(VITE_EMAILJS_SERVICE_ID && VITE_EMAILJS_TEMPLATE_ID && VITE_EMAILJS_PUBLIC_KEY)
}

export function getEmailjsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }
}
