/*
  Configuración del sitio — editar aquí sin tocar componentes.
  TODO: reemplazar valores marcados antes de producción.
*/

export const siteConfig = {
  url: 'https://jpr.lat',
  /** Ruta pública de la foto de perfil (colocar archivo en /public/profile.jpg) */
  profileImage: '/profile.jpg',
  /** URL de Calendly — si contiene "TODO", el botón abre WhatsApp */
  calendlyUrl: 'https://calendly.com/TODO',
}

export function isCalendlyConfigured() {
  return Boolean(siteConfig.calendlyUrl) && !siteConfig.calendlyUrl.includes('TODO')
}
