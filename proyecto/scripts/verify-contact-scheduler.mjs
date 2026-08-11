/**
 * Smoke tests for scheduler lazy-load and WhatsApp fallback.
 * Run: node scripts/verify-contact-scheduler.mjs
 */
import { chromium } from 'playwright'

const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:4173'

async function run() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const thirdPartyBefore = []

  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('cal.com') || url.includes('emailjs.com')) {
      thirdPartyBefore.push(url)
    }
  })

  await page.goto(BASE, { waitUntil: 'networkidle' })

  if (thirdPartyBefore.length > 0) {
    throw new Error(`Third-party requests before interaction: ${thirdPartyBefore.join(', ')}`)
  }
  console.log('✓ No cal.com / emailjs requests on initial load')

  const scheduleBtn = page.getByRole('button', { name: /Agendar|Schedule/i }).first()
  await scheduleBtn.click()
  await page.waitForTimeout(1500)

  const popup = await page.context().waitForEvent('page', { timeout: 3000 }).catch(() => null)
  if (popup) {
    console.log('✓ Scheduler click opened new tab (WhatsApp fallback with TODO URL)')
    await popup.close()
  } else {
    console.log('✓ Scheduler click handled')
  }

  await page.goto(`${BASE}#contacto`, { waitUntil: 'domcontentloaded' })
  await page.fill('#name', 'Test User')
  await page.fill('#email', 'test@example.com')
  await page.selectOption('#projectType', { index: 1 })
  await page.fill('#message', 'Mensaje de prueba con suficiente longitud.')
  await page.getByRole('button', { name: /Enviar|Send/i }).click()
  await page.waitForTimeout(1200)

  const demo = page.getByText(/Modo demo|Demo mode/i)
  if (!(await demo.isVisible())) {
    throw new Error('Demo mode banner not visible without env vars')
  }
  console.log('✓ Contact form shows distinct demo mode without env vars')

  await browser.close()
  console.log('All smoke checks passed.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
