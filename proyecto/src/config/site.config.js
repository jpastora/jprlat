/*
  Configuración del sitio — editar aquí sin tocar componentes.
  TODO: reemplazar valores marcados antes de producción.

  FOTO DE PERFIL — dirección de mirada:
  La persona en la foto debe mirar hacia el titular/headline adyacente.
  - profileGaze: 'left' → foto a la izquierda, texto a la derecha (mirada hacia el titular).
  - profileGaze: 'right' → foto a la derecha, texto a la izquierda.
  Colocar el archivo en /public/profile.jpg (ver profileImage).
*/

export const siteConfig = {
  url: 'https://jpr.lat',
  /** Ruta pública de la foto de perfil (colocar archivo en /public/profile.jpg) */
  profileImage: '/profile.jpg',
  /** 'left' | 'right' — controla orden del grid según dirección de mirada */
  profileGaze: 'left',
  /**
   * Agendamiento — Cal.com (primario) o Calendly (fallback vía schedulerProvider).
   * Si schedulerUrl contiene "TODO", el botón abre WhatsApp.
   */
  schedulerUrl: 'https://cal.com/TODO/30min',
  /** 'cal' | 'calendly' — proveedor del embed de agendamiento */
  schedulerProvider: 'cal',
  /** Solo se usa cuando schedulerProvider === 'calendly' */
  calendlyUrl: 'https://calendly.com/TODO',
}

/** URL activa según el proveedor configurado. */
export function getActiveSchedulerUrl() {
  return siteConfig.schedulerProvider === 'calendly'
    ? siteConfig.calendlyUrl
    : siteConfig.schedulerUrl
}

/** true cuando la URL del proveedor activo está lista (sin placeholder TODO). */
export function isSchedulerConfigured() {
  const url = getActiveSchedulerUrl()
  return Boolean(url) && !url.includes('TODO')
}

/** @deprecated Usar isSchedulerConfigured() */
export function isCalendlyConfigured() {
  return isSchedulerConfigured()
}
