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
  profileImage: '/profile-photo.jpg',
  /** 'left' | 'right' — controla orden del grid según dirección de mirada */
  profileGaze: 'left',
  /**
   * Agendamiento vía Cal.com.
   * Si schedulerUrl contiene "TODO", el botón Agendar abre WhatsApp.
   */
  schedulerUrl: 'https://cal.com/joseph-pastora-efc6wa/30min',
}

/** true cuando schedulerUrl está listo (no vacío y sin placeholder TODO). */
export function isSchedulerConfigured() {
  return Boolean(siteConfig.schedulerUrl) && !siteConfig.schedulerUrl.includes('TODO')
}
