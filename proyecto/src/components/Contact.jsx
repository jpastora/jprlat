import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Mail,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons.jsx'
import PageSection from './PageSection.jsx'
import FloatingField from './FloatingField.jsx'
import MagneticButton from './MagneticButton.jsx'
import CalendlyButton from './CalendlyButton.jsx'
import SectionTitle from './SectionTitle.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { validateContactForm } from '../utils/validation.js'
import { track } from '../lib/analytics.js'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

if (!EMAILJS_CONFIGURED) {
  console.warn(
    '[Contacto] EmailJS no está configurado. El formulario funciona en modo demo.',
  )
}

const EMPTY = { name: '', email: '', projectType: '', message: '' }

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validateContactForm(form)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setStatus('idle')
      return
    }
    setErrors({})
    setStatus('sending')

    const params = {
      from_name: form.name,
      reply_to: form.email,
      project_type: form.projectType,
      message: form.message,
    }

    if (!EMAILJS_CONFIGURED) {
      console.info('[Contacto] (modo demo) Datos del formulario:', params)
      setTimeout(() => {
        setStatus('success')
        setForm(EMPTY)
        track('form_submit', { mode: 'demo' })
      }, 800)
      return
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
      setStatus('success')
      setForm(EMPTY)
      track('form_submit', { mode: 'emailjs' })
    } catch (err) {
      console.error('[Contacto] Error al enviar con EmailJS:', err)
      setStatus('error')
    }
  }

  const channels = [
    { icon: Mail, label: contactInfo.email, href: `mailto:${contactInfo.email}`, trackLabel: 'email' },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${contactInfo.whatsappDigits}`,
      trackLabel: 'whatsapp',
    },
    { icon: LinkedinMark, label: 'LinkedIn', href: contactInfo.linkedin, trackLabel: 'linkedin' },
    { icon: GithubMark, label: 'GitHub', href: contactInfo.github, trackLabel: 'github' },
  ]

  return (
    <PageSection id="contacto" wide className="pb-32 pt-20 sm:pb-40 sm:pt-28 max-md:pb-36">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <SectionTitle title={c.title} subtitle={c.text} />

          <div className="mt-10">
            <p className="font-body text-sm text-tech">{c.directLabel}</p>
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
                    className="group inline-flex items-center gap-2 py-2 font-body text-sm text-carbon transition-colors hover:text-orange"
                  >
                    <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
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
            <div className="mt-8 border-t border-line pt-8">
              <p className="font-body text-sm text-tech">{c.calendlyLead}</p>
              <div className="mt-4">
                <CalendlyButton variant="primary" source="contact" />
              </div>
            </div>
            <p className="mt-8 font-body text-sm text-tech">{c.responseNote}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-line bg-white p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

            <div className="mt-5">
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
            </div>

            <div className="mt-5">
              <FloatingField
                id="message"
                name="message"
                as="textarea"
                label={c.fields.message}
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                errorMessage={c.errors[errors.message]}
              />
            </div>

            <div className="mt-8">
              <MagneticButton
                type="submit"
                disabled={status === 'sending'}
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-orange px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:bg-carbon disabled:cursor-not-allowed disabled:opacity-70"
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
                  {status === 'sending' ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={16} aria-hidden="true" />
                  )}
                  {status === 'sending' ? c.sending : c.submit}
                </span>
              </MagneticButton>
            </div>

            <div aria-live="polite" className="mt-4">
              {status === 'success' && (
                <p className="flex items-center gap-2 font-body text-sm text-carbon">
                  <CheckCircle2 size={16} className="text-orange" aria-hidden="true" />
                  {EMAILJS_CONFIGURED ? c.success : c.notConfigured}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 font-body text-sm text-carbon">
                  <AlertCircle size={16} className="text-orange" aria-hidden="true" />
                  {c.error}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </PageSection>
  )
}
