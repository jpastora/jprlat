/*
  Servicios freelance
  El campo "icon" referencia un ícono de lucide-react (se resuelve en ServiceCard).
*/
export const services = [
  {
    id: 'web',
    icon: 'Code2',
    title: { es: 'Desarrollo web', en: 'Web Development' },
    description: {
      es: 'Sitios web modernos, responsivos y optimizados para comunicar, convertir y escalar.',
      en: 'Modern, responsive websites optimized to communicate, convert, and scale.',
    },
    technologies: ['React', 'Vite', 'TailwindCSS', 'JavaScript'],
  },
  {
    id: 'automation',
    icon: 'Workflow',
    title: { es: 'Automatización y APIs', en: 'Automation and APIs' },
    description: {
      es: 'Integraciones y flujos que conectan herramientas, datos y procesos de negocio.',
      en: 'Integrations and workflows that connect tools, data, and business processes.',
    },
    technologies: ['JavaScript', 'APIs', 'Webhooks'],
  },
  {
    id: 'analytics',
    icon: 'LineChart',
    title: { es: 'Analítica y medición', en: 'Analytics and Measurement' },
    description: {
      es: 'Implementación de medición digital para tomar decisiones con datos y optimizar resultados.',
      en: 'Digital measurement implementation to make data-driven decisions and optimize results.',
    },
    technologies: ['GA4', 'GTM', 'eventos', 'dashboards'],
  },
  {
    id: 'optimization',
    icon: 'Gauge',
    title: { es: 'Optimización digital', en: 'Digital Optimization' },
    description: {
      es: 'Mejoras UX/UI, performance, conversión y estructura digital para activos existentes.',
      en: 'UX/UI, performance, conversion, and digital structure improvements for existing assets.',
    },
    technologies: ['UX/UI', 'CRO', 'SEO técnico básico', 'performance'],
  },
]
