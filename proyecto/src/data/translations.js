/*
  ============================================================
  Sistema de idiomas — Performance OS
  Idioma por defecto: ESPAÑOL ("es"). El inglés ("en") es
  secundario y solo aparece si el usuario usa el switch ES/EN.
  Si falta una clave de traducción, el fallback es español.
  ============================================================
*/

export const DEFAULT_LANGUAGE = 'es'

export const translations = {
  es: {
    meta: {
      brand: 'Joseph Pastora',
      role: 'Performance OS',
      slogan: 'Estrategia digital con lógica de sistema.',
      secondary: 'Foco • Claridad • Sistema • Resultados',
    },
    nav: {
      home: 'Inicio',
      profile: 'Perfil',
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    cta: {
      talk: 'Hablemos',
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      scrollTop: 'Volver arriba',
    },
    hero: {
      eyebrow: 'Freelance estratégico en software, marketing y datos',
      title: 'Desarrollo soluciones digitales con lógica de negocio.',
      paragraph:
        'Combino ingeniería de software, marketing digital y análisis de datos para crear productos web funcionales, medibles y orientados al crecimiento.',
      systemLabel: 'Sistema activo',
      flow: { input: 'Entrada', process: 'Proceso', output: 'Salida' },
      metrics: [
        { label: 'Foco', value: 'Alto' },
        { label: 'Sistema', value: 'On' },
        { label: 'Resultados', value: '↑' },
      ],
    },
    profile: {
      tag: '02 · Perfil estratégico',
      title: 'Perfil estratégico',
      subtitle:
        'Ingeniería de software, marketing y datos integrados en una sola visión.',
      about:
        'Soy Joseph Pastora Ramos, profesional costarricense con más de quince años de experiencia en marketing digital, performance media y estrategia de crecimiento para marcas líderes de Centroamérica. Mi formación en Ingeniería de Software complementa esta trayectoria y me permite construir soluciones digitales con una visión integral: estrategia, tecnología, datos y resultados de negocio.',
      technical: {
        label: 'Diferenciador técnico',
        title: 'Pensamiento técnico con visión comercial',
        text: 'Conecto programación, analítica, plataformas digitales y medición para construir soluciones funcionales, medibles y escalables.',
      },
      human: {
        label: 'Diferenciador humano',
        title: 'Liderazgo que conecta áreas',
        text: 'Tengo experiencia articulando equipos multidisciplinarios, proveedores, agencias y áreas comerciales para transformar necesidades de negocio en soluciones concretas.',
      },
      mission: {
        title: 'Misión',
        text: 'Brindar soluciones digitales a la medida que combinen desarrollo de software con visión estratégica de marketing, ayudando a PYMES, emprendedores y profesionales a transformar sus necesidades de negocio en productos técnicos funcionales, medibles y rentables.',
      },
      vision: {
        title: 'Visión',
        text: 'Consolidarme como un freelance de referencia por la integración entre ingeniería de software y marketing digital, ofreciendo un portafolio diversificado de servicios —web, automatización, APIs y analítica— que entreguen valor real y diferenciado a cada cliente.',
      },
      valuesTitle: 'Valores',
      valuesLabel: 'Principios operativos',
    },
    services: {
      tag: '03 · Servicios',
      title: 'Servicios freelance',
      subtitle: 'Soluciones digitales diseñadas para ordenar, medir y escalar.',
      techLabel: 'Stack',
    },
    projects: {
      tag: '04 · Proyectos',
      title: 'Proyectos',
      subtitle:
        'Galería en construcción con casos que integran software, experiencia y lógica de negocio.',
      all: 'Todos',
      viewDemo: 'Ver demo',
      repo: 'Repositorio',
      placeholder: 'Vista previa en construcción',
    },
    contact: {
      tag: '05 · Contacto',
      title: 'Contacto',
      text: '¿Tenés una idea, proceso o proyecto digital que necesita estructura? Conversemos.',
      fields: {
        name: 'Nombre',
        email: 'Correo electrónico',
        projectType: 'Tipo de proyecto',
        message: 'Mensaje',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tucorreo@ejemplo.com',
        projectType: 'Selecciona una opción',
        message: 'Contame sobre tu proyecto…',
      },
      projectTypes: [
        'Desarrollo web',
        'Automatización y APIs',
        'Analítica y medición',
        'Optimización digital',
        'Otro',
      ],
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: '¡Mensaje enviado! Te responderé pronto.',
      error: 'No se pudo enviar el mensaje. Escríbeme directo a info@jpr.lat.',
      notConfigured:
        'Formulario en modo demo: falta configurar EmailJS. Se registra en consola y puedes escribir a info@jpr.lat.',
      directLabel: 'Canales directos',
      errors: {
        nameRequired: 'Ingresa tu nombre.',
        emailRequired: 'Ingresa tu correo.',
        emailInvalid: 'Correo no válido.',
        projectTypeRequired: 'Selecciona un tipo de proyecto.',
        messageRequired: 'Escribe un mensaje.',
        messageShort: 'El mensaje es muy corto.',
      },
    },
    footer: {
      tagline: 'Desarrollo soluciones digitales con lógica de negocio.',
      slogan: 'Estrategia digital con lógica de sistema.',
      navTitle: 'Navegación',
      contactTitle: 'Contacto',
      followTitle: 'Redes',
      rights: 'Todos los derechos reservados.',
      builtWith: 'Construido con React, Vite, TailwindCSS y Framer Motion.',
    },
    whatsapp: {
      aria: 'Escribir por WhatsApp',
      message:
        'Hola Joseph, vi tu portafolio y me gustaría conversar sobre un proyecto digital.',
    },
  },

  en: {
    meta: {
      brand: 'Joseph Pastora',
      role: 'Performance OS',
      slogan: 'Digital strategy with system logic.',
      secondary: 'Focus • Clarity • System • Results',
    },
    nav: {
      home: 'Home',
      profile: 'Profile',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
    },
    cta: {
      talk: "Let’s Talk",
      viewProjects: 'View Projects',
      downloadCv: 'Download CV',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      scrollTop: 'Back to top',
    },
    hero: {
      eyebrow: 'Strategic freelance professional in software, marketing, and data',
      title: 'I build digital solutions with business logic.',
      paragraph:
        'I combine software engineering, digital marketing, and data analysis to create functional, measurable, growth-oriented web products.',
      systemLabel: 'System active',
      flow: { input: 'Input', process: 'Process', output: 'Output' },
      metrics: [
        { label: 'Focus', value: 'High' },
        { label: 'System', value: 'On' },
        { label: 'Results', value: '↑' },
      ],
    },
    profile: {
      tag: '02 · Strategic profile',
      title: 'Strategic Profile',
      subtitle:
        'Software engineering, marketing, and data integrated into a single vision.',
      about:
        'I am Joseph Pastora Ramos, a Costa Rican professional with more than fifteen years of experience in digital marketing, performance media, and growth strategy for leading brands in Central America. My Software Engineering background complements this experience and allows me to build digital solutions with an integrated vision: strategy, technology, data, and business results.',
      technical: {
        label: 'Technical differentiator',
        title: 'Technical thinking with business vision',
        text: 'I connect programming, analytics, digital platforms, and measurement to build functional, measurable, and scalable solutions.',
      },
      human: {
        label: 'Human differentiator',
        title: 'Leadership that connects teams',
        text: 'I have experience aligning multidisciplinary teams, vendors, agencies, and commercial areas to transform business needs into concrete solutions.',
      },
      mission: {
        title: 'Mission',
        text: 'To provide tailored digital solutions that combine software development with strategic marketing vision, helping SMEs, entrepreneurs, and professionals transform business needs into functional, measurable, and profitable technical products.',
      },
      vision: {
        title: 'Vision',
        text: 'To become a reference freelance professional by integrating software engineering and digital marketing, offering a diversified portfolio of services —web, automation, APIs, and analytics— that delivers real and differentiated value to each client.',
      },
      valuesTitle: 'Values',
      valuesLabel: 'Operating principles',
    },
    services: {
      tag: '03 · Services',
      title: 'Freelance Services',
      subtitle: 'Digital solutions designed to organize, measure, and scale.',
      techLabel: 'Stack',
    },
    projects: {
      tag: '04 · Projects',
      title: 'Projects',
      subtitle:
        'Gallery under construction with cases that integrate software, experience, and business logic.',
      all: 'All',
      viewDemo: 'View demo',
      repo: 'Repository',
      placeholder: 'Preview under construction',
    },
    contact: {
      tag: '05 · Contact',
      title: 'Contact',
      text: 'Do you have an idea, process, or digital project that needs structure? Let’s talk.',
      fields: {
        name: 'Name',
        email: 'Email',
        projectType: 'Project type',
        message: 'Message',
      },
      placeholders: {
        name: 'Your name',
        email: 'you@example.com',
        projectType: 'Select an option',
        message: 'Tell me about your project…',
      },
      projectTypes: [
        'Web Development',
        'Automation and APIs',
        'Analytics and Measurement',
        'Digital Optimization',
        'Other',
      ],
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Message sent! I’ll get back to you soon.',
      error: 'The message could not be sent. Write to me directly at info@jpr.lat.',
      notConfigured:
        'Form in demo mode: EmailJS is not configured. It is logged to the console and you can email info@jpr.lat.',
      directLabel: 'Direct channels',
      errors: {
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email.',
        emailInvalid: 'Invalid email.',
        projectTypeRequired: 'Please select a project type.',
        messageRequired: 'Please write a message.',
        messageShort: 'The message is too short.',
      },
    },
    footer: {
      tagline: 'I build digital solutions with business logic.',
      slogan: 'Digital strategy with system logic.',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      followTitle: 'Social',
      rights: 'All rights reserved.',
      builtWith: 'Built with React, Vite, TailwindCSS and Framer Motion.',
    },
    whatsapp: {
      aria: 'Message on WhatsApp',
      message:
        'Hi Joseph, I saw your portfolio and would like to discuss a digital project.',
    },
  },
}

// Datos de contacto reales (compartidos entre idiomas)
export const contactInfo = {
  email: 'info@jpr.lat',
  whatsapp: '+50660427930',
  whatsappDigits: '50660427930',
  linkedin: 'https://www.linkedin.com/in/jpastora/',
  github: 'https://github.com/jpastora',
  website: 'https://jpr.lat',
}

/*
  Deep-merge con fallback a español: cualquier clave ausente en el
  idioma solicitado se completa con el valor en "es".
*/
function deepMerge(base, override) {
  if (Array.isArray(base)) return override ?? base
  if (typeof base !== 'object' || base === null) {
    return override === undefined ? base : override
  }
  const result = { ...base }
  const src = override && typeof override === 'object' ? override : {}
  for (const key of Object.keys(base)) {
    result[key] = deepMerge(base[key], src[key])
  }
  return result
}

/**
 * Devuelve el diccionario para el idioma dado con fallback a español.
 * @param {'es'|'en'} language
 */
export function getContent(language) {
  const lang = language === 'en' ? 'en' : DEFAULT_LANGUAGE
  return deepMerge(translations.es, translations[lang])
}
