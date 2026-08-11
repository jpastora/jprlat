import { useState, lazy, Suspense, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Mail,
  MessageCircle,
  Send,
  Loader2,
  AlertCircle,
  Info,
  ArrowUpRight,
} from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons.jsx'
import PageSection from './PageSection.jsx'
import FloatingField, { HoneypotField } from './FloatingField.jsx'
import MagneticButton from './MagneticButton.jsx'
import SchedulerButton from './SchedulerButton.jsx'
import SectionTitle from './SectionTitle.jsx'
import SectionErrorBoundary from './SectionErrorBoundary.jsx'
import ContactIllustration from '../assets/illustrations/ContactIllustration.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { validateContactForm } from '../utils/validation.js'
import { track } from '../lib/analytics.js'
import {
  classifyEmailjsError,
  getEmailjsConfig,
  isEmailjsConfigured,
} from '../lib/emailjs.js'

const ContactSuccessMark = lazy(() => import('./ContactSuccessMark.jsx'))
const ContactCalendarMark = lazy(() => import('./ContactCalendarMark.jsx'))

const SUBMIT_THROTTLE_MS = 30_000
const EMPTY = { name: '', email: '', projectType: '', message: '', website: '' }

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const emailjsConfigured = isEmailjsConfigured()
  const { serviceId, templateId, publicKey } = getEmailjsConfig()

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorType, setErrorType] = useState(null)
  const [successKey, setSuccessKey] = useState(0)
  const [throttledUntil, setThrottledUntil] = useState(0)

  useEffect(() => {
    if (!throttledUntil || Date.now() >= throttledUntil) return undefined
    const delay = throttledUntil - Date.now()
    const id = window.setTimeout(() => setThrottledUntil(0), delay)
    return () => window.clearTimeout(id)
  }, [throttledUntil])

  const isThrottled = throttledUntil > 0 && Date.now() < throttledUntil
  const isSending = status === 'sending'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'error') {
      setStatus('idle')
      setErrorType(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.website) return

    if (Date.now() < throttledUntil) return

    const validation = validateContactForm(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setStatus('idle')
      return
    }

    setErrors({})
    setErrorType(null)
    setStatus('sending')

    const params = {
      from_name: form.name,
      reply_to: form.email,
      project_type: form.projectType,
      message: form.message,
    }

    try {
      if (!emailjsConfigured) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setSuccessKey((k) => k + 1)
        setStatus('demo-success')
        setForm(EMPTY)
        setThrottledUntil(Date.now() + SUBMIT_THROTTLE_MS)
        track('form_submit', { mode: 'demo', status: 'success' })
        return
      }

      await emailjs.send(serviceId, templateId, params, { publicKey })
      setSuccessKey((k) => k + 1)
      setStatus('success')
      setForm(EMPTY)
      setThrottledUntil(Date.now() + SUBMIT_THROTTLE_MS)
      track('form_submit', { mode: 'emailjs', status: 'success' })
    } catch (err) {
      console.error('[Contacto] Error al enviar con EmailJS:', err)
      const type = classifyEmailjsError(err)
      setErrorType(type)
      setStatus('error')
      track('form_submit', { mode: 'emailjs', status: 'error', error_type: type })
    }
  }

  const errorMessage = errorType ? c.submitErrors[errorType] : c.error
  const whatsappHref = `https://wa.me/${contactInfo.whatsappDigits}`
  const mailtoHref = `mailto:${contactInfo.email}`

  const channels = [
    { icon: Mail, label: contactInfo.email, href: mailtoHref, trackLabel: 'email' },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: whatsappHref,
      trackLabel: 'whatsapp',
    },
    { icon: LinkedinMark, label: 'LinkedIn', href: contactInfo.linkedin, trackLabel: 'linkedin' },
    { icon: GithubMark, label: 'GitHub', href: contactInfo.github, trackLabel: 'github' },
  ]

  return (
    <PageSection id="contacto" wide className="pb-32 pt-20 max-md:pb-44 sm:pb-40 sm:pt-28">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-stretch lg:gap-20">
        <motion.div variants={itemVariants} className="order-1 lg:col-span-5 lg:row-start-1">
          <SectionTitle title={c.title} subtitle={c.intro} />

          <ContactIllustration className="mt-8 h-auto w-full max-w-[10rem] text-carbon opacity-80" />

          <p className="mt-6 max-w-prose font-body text-base leading-[1.5] text-tech">{c.text}</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="order-2 flex lg:col-span-7 lg:row-span-2 lg:row-start-1"
        >
          <form onSubmit={handleSubmit} noValidate className="contact-field flex h-full w-full flex-col gap-4">
            <HoneypotField value={form.website} onChange={handleChange} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FloatingField
                id="name"
                name="name"
                label={c.fields.name}
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                errorMessage={c.errors[errors.name]}
              />
              <FloatingField
                id="email"
                name="email"
                type="email"
                label={c.fields.email}
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                errorMessage={c.errors[errors.email]}
              />
            </div>

            <FloatingField
              id="projectType"
              name="projectType"
              as="select"
              label={c.fields.projectType}
              value={form.projectType}
              onChange={handleChange}
              placeholder={c.placeholders.projectType}
              options={c.projectTypes}
              error={errors.projectType}
              errorMessage={c.errors[errors.projectType]}
            />

            <FloatingField
              id="message"
              name="message"
              as="textarea"
              label={c.fields.message}
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              errorMessage={c.errors[errors.message]}
              rows={8}
              inputClassName="lg:min-h-[12rem]"
            />

            <div className="mt-auto space-y-4 pt-2">
              <MagneticButton
                type="submit"
                disabled={isSending || isThrottled}
                className="relative inline-flex min-w-[11rem] items-center justify-center gap-2 overflow-hidden rounded-lg bg-orange px-6 py-3 font-body text-base font-semibold text-white transition-colors duration-300 hover:bg-carbon disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'success' && (
                  <motion.span
                    layoutId="submit-flash"
                    className="absolute inset-0 bg-carbon"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.35 }}
                    style={{ originX: 0 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {isSending ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={16} aria-hidden="true" />
                  )}
                  {isSending ? c.sending : c.submit}
                </span>
              </MagneticButton>
            </div>

            <div aria-live="polite" className="min-h-[4.5rem] pt-2">
              {status === 'success' && (
                <p className="flex items-start gap-3 font-body text-base leading-[1.5] text-carbon">
                  <Suspense fallback={<span className="inline-block h-12 w-12 shrink-0" aria-hidden="true" />}>
                    <SectionErrorBoundary message="La animación de éxito no pudo cargarse.">
                      <ContactSuccessMark playKey={successKey} />
                    </SectionErrorBoundary>
                  </Suspense>
                  <span className="pt-3">{c.success}</span>
                </p>
              )}
              {status === 'demo-success' && (
                <div
                  role="status"
                  className="rounded-lg border border-dashed border-tech/40 bg-soft/60 px-4 py-3 dark:bg-soft/20"
                >
                  <p className="flex items-start gap-3 font-body text-base leading-[1.5] text-tech">
                    <Info size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
                    <span>
                      <span className="mb-1 block font-semibold uppercase tracking-wide text-orange">
                        {c.demoBadge}
                      </span>
                      {c.notConfigured}
                    </span>
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="space-y-2">
                  <p className="flex items-start gap-2 font-body text-base leading-[1.5] text-carbon">
                    <AlertCircle size={16} className="mt-1 shrink-0 text-orange" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </p>
                  <p className="font-body text-[0.875rem] leading-[1.5] text-tech">
                    {c.submitFallback}{' '}
                    <a href={mailtoHref} className="text-orange underline-offset-2 hover:underline">
                      {contactInfo.email}
                    </a>{' '}
                    {c.submitFallbackOr}{' '}
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange underline-offset-2 hover:underline"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div variants={itemVariants} className="order-3 lg:col-span-5 lg:row-start-2 lg:self-end">
          <p className="font-body text-base text-tech">{c.directLabel}</p>
          <ul className="mt-4 space-y-1">
            {channels.map(({ icon: Icon, label, href, trackLabel }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  onClick={() => {
                    if (trackLabel === 'whatsapp') {
                      track('whatsapp_click', { source: 'contact' })
                    }
                  }}
                  className="group inline-flex items-center gap-2 py-2 font-body text-base text-carbon transition-colors hover:text-orange"
                >
                  <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  {label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-16 w-full border-t border-line pt-12 sm:mt-20 sm:pt-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Suspense fallback={<span className="inline-block h-[7.5rem] w-[7.5rem]" aria-hidden="true" />}>
            <SectionErrorBoundary message="La animación de calendario no pudo cargarse.">
              <ContactCalendarMark />
            </SectionErrorBoundary>
          </Suspense>
          <p className="mt-6 w-full text-balance font-heading text-[1.375rem] font-semibold leading-[1.35] text-carbon text-pretty sm:text-[1.5rem]">
            {c.schedulerLead}
          </p>
          <div className="mt-6">
            <SchedulerButton variant="primary" source="contact" />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center font-body text-base leading-[1.5] text-tech">
          {c.responseNote}
        </p>
      </div>
    </PageSection>
  )
}
