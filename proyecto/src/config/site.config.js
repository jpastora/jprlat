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
  /** URL de Calendly — si contiene "TODO", el botón abre WhatsApp */
  calendlyUrl: 'https://calendly.com/TODO',
}

export function isCalendlyConfigured() {
  return Boolean(siteConfig.calendlyUrl) && !siteConfig.calendlyUrl.includes('TODO')
}
