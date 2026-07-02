import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageContext } from './context/LanguageContext.js'
import { DEFAULT_LANGUAGE, getContent } from './data/translations.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import StrategicProfile from './components/StrategicProfile.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import AnimatedDivider from './components/AnimatedDivider.jsx'

export default function App() {
  // Idioma por defecto: ESPAÑOL. El usuario cambia manualmente a inglés.
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === 'es' ? 'en' : 'es')),
    [],
  )

  // Contenido con fallback a español para claves ausentes.
  const t = useMemo(() => getContent(language), [language])

  // Mantiene el atributo lang del <html> sincronizado.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const contextValue = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t],
  )

  // Barra de progreso de scroll (sistema de movimiento global).
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <LanguageContext.Provider value={contextValue}>
      {/* Indicador de progreso de scroll */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-orange"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* Salto de accesibilidad al contenido principal */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-carbon focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-white"
      >
        {language === 'en' ? 'Skip to content' : 'Saltar al contenido'}
      </a>

      <Header />

      <main>
        <Hero />
        <AnimatedDivider />
        <StrategicProfile />
        <AnimatedDivider />
        <Services />
        <AnimatedDivider />
        <Projects />
        <AnimatedDivider />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
      <WhatsAppButton />
    </LanguageContext.Provider>
  )
}
