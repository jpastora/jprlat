import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageContext } from './context/LanguageContext.js'
import { ThemeProvider } from './hooks/useTheme.jsx'
import { DEFAULT_LANGUAGE, getContent } from './data/translations.js'
import { initAnalytics } from './lib/analytics.js'
import { useSectionTracking } from './hooks/useSectionTracking.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import StrategicProfile from './components/StrategicProfile.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import PageGuide from './components/PageGuide.jsx'
import SeoHead from './components/SeoHead.jsx'
import SignatureCursor from './components/SignatureCursor.jsx'
import StickyMobileCTA from './components/StickyMobileCTA.jsx'
import SectionErrorBoundary from './components/SectionErrorBoundary.jsx'

const ProcessSection = lazy(() => import('./components/ProcessSection.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))

function AppContent() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === 'es' ? 'en' : 'es')),
    [],
  )

  const t = useMemo(() => getContent(language), [language])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    initAnalytics()
  }, [])

  useSectionTracking()

  const contextValue = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t],
  )

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <LanguageContext.Provider value={contextValue}>
      <SeoHead />
      <SignatureCursor />

      <motion.div
        className="fixed inset-x-0 top-[4.25rem] z-[60] h-px origin-left bg-orange"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-carbon focus:px-4 focus:py-2 focus:font-body focus:text-base focus:text-white"
      >
        {language === 'en' ? 'Skip to content' : 'Saltar al contenido'}
      </a>

      <PageGuide />
      <Header />

      <main className="relative">
        <Hero />
        <StrategicProfile />
        <Services />
        <Suspense fallback={null}>
          <SectionErrorBoundary message="El proceso no pudo cargarse.">
            <ProcessSection />
          </SectionErrorBoundary>
        </Suspense>
        <Projects />
        <Suspense fallback={null}>
          <SectionErrorBoundary message="El contacto no pudo cargarse.">
            <Contact />
          </SectionErrorBoundary>
        </Suspense>
      </main>

      <Footer />
      <ScrollTop />
      <WhatsAppButton />
      <StickyMobileCTA />
    </LanguageContext.Provider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
