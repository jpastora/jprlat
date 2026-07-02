/*
  Validación del formulario de contacto.
  Devuelve un objeto de errores con claves de traducción por campo.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return EMAIL_RE.test(String(email).trim())
}

/**
 * Valida los campos del formulario.
 * @returns {{ [field: string]: string }} claves de error (i18n) por campo
 */
export function validateContactForm({ name, email, projectType, message }) {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'nameRequired'
  }

  if (!email || !email.trim()) {
    errors.email = 'emailRequired'
  } else if (!isValidEmail(email)) {
    errors.email = 'emailInvalid'
  }

  if (!projectType || !projectType.trim()) {
    errors.projectType = 'projectTypeRequired'
  }

  if (!message || !message.trim()) {
    errors.message = 'messageRequired'
  } else if (message.trim().length < 10) {
    errors.message = 'messageShort'
  }

  return errors
}
