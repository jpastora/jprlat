import { useEffect } from 'react'
import { siteConfig } from '../config/site.config.js'
import { contactInfo } from '../data/translations.js'
import { useLanguage } from '../context/LanguageContext.js'

const META = {
  es: {
    title: 'Joseph Pastora — Freelance estratégico en software, marketing y datos',
    description:
      'Estrategia digital con lógica de sistema. Desarrollo web, automatización, analítica y optimización para marcas y emprendedores.',
  },
  en: {
    title: 'Joseph Pastora — Strategic freelance in software, marketing & data',
    description:
      'Digital strategy with system logic. Web development, automation, analytics, and optimization for brands and entrepreneurs.',
  },
}

export default function SeoHead() {
  const { language } = useLanguage()
  const meta = META[language] ?? META.es
  const url = siteConfig.url

  useEffect(() => {
    document.title = meta.title

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', meta.description)
    setMeta('og:title', meta.title, 'property')
    setMeta('og:description', meta.description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:image', `${url}/og.png`, 'property')
    setMeta('og:locale', language === 'en' ? 'en_US' : 'es_CR', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', meta.title)
    setMeta('twitter:description', meta.description)
    setMeta('twitter:image', `${url}/og.png`)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let jsonLd = document.getElementById('json-ld-person')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'json-ld-person'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Joseph Pastora Ramos',
      jobTitle: 'Freelance Digital Strategist',
      url,
      sameAs: [contactInfo.linkedin, contactInfo.github, contactInfo.website],
      email: contactInfo.email,
    })
  }, [language, meta.title, meta.description, url])

  return null
}
