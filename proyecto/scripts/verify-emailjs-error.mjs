/**
 * Verify EmailJS real-send attempt surfaces error with placeholder keys.
 * Run after building with VITE_EMAILJS_* placeholder vars.
 */
import { chromium } from 'playwright'

const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:4181'

async function run() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${BASE}#contacto`, { waitUntil: 'domcontentloaded' })

  await page.fill('#name', 'Test User')
  await page.fill('#email', 'test@example.com')
  await page.selectOption('#projectType', { index: 1 })
  await page.fill('#message', 'Mensaje de prueba con suficiente longitud.')
  await page.getByRole('button', { name: /Enviar|Send/i }).click()

  await page.waitForSelector('text=/No hay conexión|servicio de correo|datos del formulario|Too many|connection/i', {
    timeout: 15000,
  })

  const fallback = page.getByText(/info@jpr.lat/)
  if (!(await fallback.first().isVisible())) {
    throw new Error('Fallback email/WhatsApp line not visible on error')
  }

  const submit = page.getByRole('button', { name: /Enviar|Send/i })
  if (await submit.isDisabled()) {
    throw new Error('Submit button stuck in sending state')
  }

  console.log('✓ Placeholder EmailJS keys attempt real send and show error + fallback')
  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
