import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { track } from '../lib/analytics.js'

/*
  WhatsAppButton — botón flotante en la esquina inferior derecha.
  Botón flotante de WhatsApp. Negro + acento naranja, no verde genérico.
*/
export default function WhatsAppButton() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const href = `https://wa.me/${contactInfo.whatsappDigits}?text=${encodeURIComponent(
    t.whatsapp.message,
  )}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp.aria}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      onClick={() => track('whatsapp_click', { source: 'floating' })}
      className="group fixed bottom-6 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-carbon text-white shadow-lg transition-colors duration-300 hover:bg-orange md:inline-flex"
    >
      <MessageCircle size={22} strokeWidth={1.8} aria-hidden="true" />
      {/* Indicador naranja (pulso sutil) */}
      {!reduce && (
        <motion.span
          className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-orange group-hover:bg-white"
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.a>
  )
}
