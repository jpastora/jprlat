import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  Mail,
  MessageCircle,
  Globe,
  Send,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons.jsx'
import AnimatedSection from './AnimatedSection.jsx'
import { itemVariants } from '../utils/motion.js'
import SectionTitle from './SectionTitle.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { validateContactForm } from '../utils/validation.js'
// CV placeholder — reemplazar en src/assets/cv/joseph-pastora-cv.pdf
import cvUrl from '../assets/cv/joseph-pastora-cv.pdf'

// Configuración EmailJS (variables de entorno; ver .env.example)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

if (!EMAILJS_CONFIGURED) {
  // Aviso claro en consola sin romper la app (modo demo).
  console.warn(
    '[Contacto] EmailJS no está configurado. Define VITE_EMAILJS_SERVICE_ID, ' +
      'VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY en tu archivo .env ' +
      '(ver .env.example). El formulario funciona en modo demo.',
  )
}

const EMPTY = { name: '', email: '', projectType: '', message: '' }

export default function Contact() {
  const { language, t } = useLanguage()
  const c = t.contact

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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

    // Modo demo: sin credenciales, no rompe; registra y muestra aviso.
    if (!EMAILJS_CONFIGURED) {
      console.info('[Contacto] (modo demo) Datos del formulario:', params)
      setTimeout(() => {
        setStatus('success')
        setForm(EMPTY)
      }, 800)
      return
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      console.error('[Contacto] Error al enviar con EmailJS:', err)
      setStatus('error')
    }
  }

  const inputBase =
    'w-full rounded-lg border bg-white px-3.5 py-2.5 font-body text-sm text-carbon placeholder:text-cool transition-colors focus:outline-none'
  const borderFor = (field) =>
    errors[field] ? 'border-orange' : 'border-line focus:border-carbon'

  const channels = [
    { icon: Mail, label: contactInfo.email, href: `mailto:${contactInfo.email}` },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${contactInfo.whatsappDigits}`,
    },
    { icon: LinkedinMark, label: 'LinkedIn', href: contactInfo.linkedin },
    { icon: GithubMark, label: 'GitHub', href: contactInfo.github },
    { icon: Globe, label: contactInfo.website.replace('https://', ''), href: contactInfo.website },
  ]

  return (
    <AnimatedSection id="contacto" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle tag={c.tag} title={c.title} subtitle={c.text} />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Formulario */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 rounded-xl border border-line bg-soft/50 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-tech">
                  {c.fields.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={c.placeholders.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={`${inputBase} ${borderFor('name')}`}
                />
                {errors.name && (
                  <p id="err-name" className="mt-1 font-mono text-xs text-orange">
                    {c.errors[errors.name]}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-tech">
                  {c.fields.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={c.placeholders.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={`${inputBase} ${borderFor('email')}`}
                />
                {errors.email && (
                  <p id="err-email" className="mt-1 font-mono text-xs text-orange">
                    {c.errors[errors.email]}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="projectType" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-tech">
                {c.fields.projectType}
              </label>
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={errors.projectType ? 'err-projectType' : undefined}
                className={`${inputBase} ${borderFor('projectType')} ${form.projectType ? 'text-carbon' : 'text-cool'}`}
              >
                <option value="" disabled>
                  {c.placeholders.projectType}
                </option>
                {c.projectTypes.map((type) => (
                  <option key={type} value={type} className="text-carbon">
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p id="err-projectType" className="mt-1 font-mono text-xs text-orange">
                  {c.errors[errors.projectType]}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-tech">
                {c.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={c.placeholders.message}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'err-message' : undefined}
                className={`${inputBase} ${borderFor('message')} resize-y`}
              />
              {errors.message && (
                <p id="err-message" className="mt-1 font-mono text-xs text-orange">
                  {c.errors[errors.message]}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors duration-300 hover:bg-carbon disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Send size={16} aria-hidden="true" />
                )}
                {status === 'sending' ? c.sending : c.submit}
              </button>

              <a
                href={cvUrl}
                download="joseph-pastora-cv.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-cool px-5 py-2.5 font-body text-sm font-semibold text-carbon transition-colors duration-300 hover:border-orange hover:text-orange"
              >
                <Download size={16} aria-hidden="true" />
                {t.cta.downloadCv}
              </a>
            </div>

            {/* Mensajes de estado (no dependen solo del color: incluyen ícono y texto) */}
            <div aria-live="polite" className="mt-4">
              {status === 'success' && (
                <p className="inline-flex items-center gap-2 rounded-lg border border-orange/30 bg-orange/5 px-3 py-2 font-body text-sm text-carbon">
                  <CheckCircle2 size={16} className="text-orange" aria-hidden="true" />
                  {EMAILJS_CONFIGURED ? c.success : c.notConfigured}
                </p>
              )}
              {status === 'error' && (
                <p className="inline-flex items-center gap-2 rounded-lg border border-orange/40 bg-orange/5 px-3 py-2 font-body text-sm text-carbon">
                  <AlertCircle size={16} className="text-orange" aria-hidden="true" />
                  {c.error}
                </p>
              )}
              {!EMAILJS_CONFIGURED && status === 'idle' && (
                <p className="font-mono text-xs text-tech">
                  <span className="text-orange">{'>'}</span> {c.notConfigured}
                </p>
              )}
            </div>
          </motion.form>

          {/* Canales directos */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <span className="font-mono text-[11px] uppercase tracking-widest text-tech">
                <span className="text-orange">{'>'}</span> {c.directLabel}
              </span>
              <ul className="mt-4 flex flex-col gap-2">
                {channels.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-orange"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-soft text-carbon transition-colors group-hover:border-orange group-hover:text-orange">
                        <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="font-body text-sm text-carbon">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-tech">
                {language === 'en'
                  ? 'Response within business hours (Costa Rica, GMT-6).'
                  : 'Respuesta en horario laboral (Costa Rica, GMT-6).'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
