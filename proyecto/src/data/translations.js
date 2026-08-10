/*
  Sistema de idiomas — Joseph Pastora portfolio
  Idioma por defecto: ESPAÑOL ("es").
*/

export const DEFAULT_LANGUAGE = 'es'

export const translations = {
  es: {
    meta: {
      brand: 'Joseph Pastora',
      role: 'Marketing · Software · Datos',
      slogan: 'Estrategia digital con lógica de sistema.',
      secondary: 'Foco · Claridad · Sistema · Resultados',
    },
    nav: {
      home: 'Inicio',
      profile: 'Perfil',
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    cta: {
      talk: 'Contactar',
      viewProjects: 'Explorar',
      downloadCv: 'Descargar',
      schedule: 'Agendar',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      scrollTop: 'Volver arriba',
    },
    hero: {
      eyebrow: 'Freelance estratégico',
      title: 'Estrategia digital con lógica de sistema.',
      subtitle:
        'Combino ingeniería de software, marketing digital y análisis de datos para crear productos web funcionales, medibles y orientados al crecimiento.',
    },
    profile: {
      title: 'Estrategia con experiencia real',
      subtitle:
        'Más de quince años conectando marketing, tecnología y resultados de negocio en Centroamérica.',
      statement: [
        { text: 'Quince años uniendo ' },
        { text: 'estrategia', accent: true },
        { text: ', ' },
        { text: 'software', accent: true },
        { text: ' y ' },
        { text: 'datos', accent: true },
        { text: ' con lógica de negocio.' },
      ],
      experienceValue: 15,
      experienceUnit: 'años',
      credibilityLabel: 'Experiencia con marcas y agencias como',
      credibility: [
        'Tigo',
        'Gollo',
        'Coca-Cola',
        'Nestlé',
        'McCann',
        'Havas',
        'Y&R',
      ],
      roles: {
        agencies: { title: 'Agencias', items: ['McCann', 'Havas', 'Y&R'] },
        brands: { title: 'Marcas', items: ['Tigo', 'Gollo', 'Coca-Cola', 'Nestlé'] },
      },
      about:
        'Soy Joseph Pastora Ramos, profesional costarricense con más de quince años de experiencia en marketing digital, performance media y estrategia de crecimiento para marcas líderes de Centroamérica. Mi formación en Ingeniería de Software complementa esta trayectoria y me permite construir soluciones digitales con una visión integral: estrategia, tecnología, datos y resultados de negocio.',
      technical: {
        title: 'Pensamiento técnico con visión comercial',
        text: 'Conecto programación, analítica, plataformas digitales y medición para construir soluciones funcionales, medibles y escalables.',
      },
      human: {
        title: 'Liderazgo que conecta áreas',
        text: 'Articulo equipos multidisciplinarios, proveedores, agencias y áreas comerciales para transformar necesidades de negocio en soluciones concretas.',
      },
      mission: {
        title: 'Misión',
        text: 'Brindar soluciones digitales a la medida que combinen desarrollo de software con visión estratégica de marketing, ayudando a PYMES, emprendedores y profesionales a transformar sus necesidades de negocio en productos técnicos funcionales, medibles y rentables.',
      },
      vision: {
        title: 'Visión',
        text: 'Consolidarme como un freelance de referencia por la integración entre ingeniería de software y marketing digital, ofreciendo un portafolio diversificado de servicios que entreguen valor real a cada cliente.',
      },
      missionVisionIntro:
        'Dos principios que guían cada proyecto: impacto medible y claridad desde el primer día.',
      photoAlt: 'Joseph Pastora — retrato profesional',
      bento: {
        experienceLabel: 'Años de experiencia',
        brandsLabel: 'Marcas y agencias',
        hybridLabel: 'Perfil híbrido',
        hybridValue: 'Tech + growth',
        hybridHint: 'Software, marketing y datos en un solo flujo.',
        stackLabel: 'Stack principal',
        locationLabel: 'Ubicación y disponibilidad',
        locationValue: 'Costa Rica · remoto LATAM',
        availability: 'Disponible para nuevos proyectos',
        numbersTitle: 'En números',
      },
    },
    services: {
      title: 'Servicios freelance',
      stickyTitle: 'Servicios que construyen sistemas',
      subtitle:
        'Cuatro capacidades integradas para ordenar, construir, medir y escalar tu presencia digital.',
      intro:
        'Cada servicio conecta estrategia, ejecución técnica y medición para que el crecimiento sea deliberado, no accidental.',
    },
    projects: {
      title: 'Proyectos seleccionados',
      subtitle:
        'Casos que muestran decisiones técnicas y resultados de negocio en un mismo relato.',
      intro:
        'Cada caso combina arquitectura, stack y métricas de crecimiento para mostrar el perfil híbrido en acción.',
      statusBadge: 'Casos en revisión',
      filterLabel: 'Filtrar por categoría',
      all: 'Todos',
      viewCase: 'Ver caso',
      open: 'Abrir',
      code: 'Código',
      placeholder: 'Vista previa',
      empty: 'No hay proyectos en esta categoría.',
      caseStudy: {
        problem: 'Problema',
        decisions: 'Decisiones',
        architecture: 'Arquitectura y código',
        marketing: 'Estrategia y resultados',
        close: 'Cerrar caso de estudio',
        todo: 'TODO · caso de ejemplo',
      },
    },
    testimonials: {
      title: 'Lo que dicen quienes han trabajado conmigo',
      subtitle:
        'Relatos breves de colaboración real. Reemplazar con testimonios verificados.',
      intro:
        'La confianza se construye con resultados medibles y comunicación clara en cada etapa.',
      todo: 'TODO · testimonio de ejemplo',
    },
    process: {
      title: 'Cómo trabajo',
      subtitle:
        'Un proceso claro que conecta diagnóstico, estrategia, construcción y medición.',
      steps: {
        diagnose: {
          title: 'Diagnóstico',
          text: 'Entiendo el negocio, el contexto y las prioridades antes de proponer soluciones.',
        },
        strategy: {
          title: 'Estrategia',
          text: 'Defino arquitectura digital, foco y métricas con lógica de sistema y negocio.',
        },
        build: {
          title: 'Construcción',
          text: 'Desarrollo web, integraciones y automatización con calidad técnica y claridad.',
        },
        measure: {
          title: 'Medición y optimización',
          text: 'Implemento analítica, aprendo del uso real y optimizo para crecer con datos.',
        },
      },
    },
    contact: {
      title: 'Hablemos de tu proyecto',
      text: '¿Tenés una idea, proceso o proyecto digital que necesita estructura? Escríbeme y lo revisamos juntos.',
      intro:
        'Cuéntame tu contexto y te respondo con foco, prioridades claras y un siguiente paso concreto.',
      calendlyLead: '¿Preferís agendar una llamada de 30 minutos?',
      responseNote: 'Respuesta en horario laboral (Costa Rica, GMT-6).',
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
      submit: 'Enviar',
      sending: 'Enviando…',
      success: '¡Mensaje enviado! Te responderé pronto.',
      error: 'No se pudo enviar el mensaje. Escríbeme directo a info@jpr.lat.',
      notConfigured:
        'Formulario en modo demo: falta configurar EmailJS. Puedes escribir a info@jpr.lat.',
      directLabel: 'También puedes contactarme por',
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
      slogan: 'Estrategia digital con lógica de sistema.',
      rights: 'Todos los derechos reservados.',
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
      role: 'Marketing · Software · Data',
      slogan: 'Digital strategy with system logic.',
      secondary: 'Focus · Clarity · System · Results',
    },
    nav: {
      home: 'Home',
      profile: 'Profile',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
    },
    cta: {
      talk: 'Contact',
      viewProjects: 'Explore',
      downloadCv: 'Download',
      schedule: 'Schedule',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      scrollTop: 'Back to top',
    },
    hero: {
      eyebrow: 'Strategic freelance',
      title: 'Digital strategy with system logic.',
      subtitle:
        'I combine software engineering, digital marketing, and data analysis to create functional, measurable, growth-oriented web products.',
    },
    profile: {
      title: 'Strategy backed by real experience',
      subtitle:
        'Over fifteen years connecting marketing, technology, and business results across Central America.',
      statement: [
        { text: 'Fifteen years uniting ' },
        { text: 'strategy', accent: true },
        { text: ', ' },
        { text: 'software', accent: true },
        { text: ', and ' },
        { text: 'data', accent: true },
        { text: ' with business logic.' },
      ],
      experienceValue: 15,
      experienceUnit: 'years',
      credibilityLabel: 'Experience with brands and agencies such as',
      credibility: [
        'Tigo',
        'Gollo',
        'Coca-Cola',
        'Nestlé',
        'McCann',
        'Havas',
        'Y&R',
      ],
      roles: {
        agencies: { title: 'Agencies', items: ['McCann', 'Havas', 'Y&R'] },
        brands: { title: 'Brands', items: ['Tigo', 'Gollo', 'Coca-Cola', 'Nestlé'] },
      },
      about:
        'I am Joseph Pastora Ramos, a Costa Rican professional with more than fifteen years of experience in digital marketing, performance media, and growth strategy for leading brands in Central America. My Software Engineering background complements this experience and allows me to build digital solutions with an integrated vision: strategy, technology, data, and business results.',
      technical: {
        title: 'Technical thinking with business vision',
        text: 'I connect programming, analytics, digital platforms, and measurement to build functional, measurable, and scalable solutions.',
      },
      human: {
        title: 'Leadership that connects teams',
        text: 'I align multidisciplinary teams, vendors, agencies, and commercial areas to transform business needs into concrete solutions.',
      },
      mission: {
        title: 'Mission',
        text: 'To provide tailored digital solutions that combine software development with strategic marketing vision, helping SMEs, entrepreneurs, and professionals transform business needs into functional, measurable, and profitable technical products.',
      },
      vision: {
        title: 'Vision',
        text: 'To become a reference freelance professional by integrating software engineering and digital marketing, offering a diversified portfolio of services that delivers real value to each client.',
      },
      missionVisionIntro:
        'Two principles guide every project: measurable impact and clarity from day one.',
      photoAlt: 'Joseph Pastora — professional portrait',
      bento: {
        experienceLabel: 'Years of experience',
        brandsLabel: 'Brands and agencies',
        hybridLabel: 'Hybrid profile',
        hybridValue: 'Tech + growth',
        hybridHint: 'Software, marketing, and data in one flow.',
        stackLabel: 'Core stack',
        locationLabel: 'Location and availability',
        locationValue: 'Costa Rica · remote LATAM',
        availability: 'Available for new projects',
        numbersTitle: 'By the numbers',
      },
    },
    services: {
      title: 'Freelance services',
      stickyTitle: 'Services that build systems',
      subtitle:
        'Four integrated capabilities to organize, build, measure, and scale your digital presence.',
      intro:
        'Each service connects strategy, technical execution, and measurement so growth is deliberate, not accidental.',
    },
    projects: {
      title: 'Selected projects',
      subtitle:
        'Cases that show technical decisions and business outcomes in one narrative.',
      intro:
        'Each case combines architecture, stack, and growth metrics to show the hybrid profile in action.',
      statusBadge: 'Cases under review',
      filterLabel: 'Filter by category',
      all: 'All',
      viewCase: 'View case',
      open: 'Open',
      code: 'Code',
      placeholder: 'Preview',
      empty: 'No projects in this category.',
      caseStudy: {
        problem: 'Problem',
        decisions: 'Decisions',
        architecture: 'Architecture & code',
        marketing: 'Strategy & results',
        close: 'Close case study',
        todo: 'TODO · sample case',
      },
    },
    testimonials: {
      title: 'What clients say about working with me',
      subtitle: 'Brief stories from real collaboration. Replace with verified testimonials.',
      intro: 'Trust is built through measurable results and clear communication at every stage.',
      todo: 'TODO · sample testimonial',
    },
    process: {
      title: 'How I work',
      subtitle:
        'A clear process connecting diagnosis, strategy, build, and measurement.',
      steps: {
        diagnose: {
          title: 'Diagnosis',
          text: 'I understand the business, context, and priorities before proposing solutions.',
        },
        strategy: {
          title: 'Strategy',
          text: 'I define digital architecture, focus, and metrics with system and business logic.',
        },
        build: {
          title: 'Build',
          text: 'I deliver web, integrations, and automation with technical quality and clarity.',
        },
        measure: {
          title: 'Measurement & optimization',
          text: 'I implement analytics, learn from real usage, and optimize for data-driven growth.',
        },
      },
    },
    contact: {
      title: "Let's talk about your project",
      text: 'Do you have an idea, process, or digital project that needs structure? Write to me and we can review it together.',
      intro:
        'Share your context and I will respond with focus, clear priorities, and a concrete next step.',
      calendlyLead: 'Prefer to book a 30-minute call?',
      responseNote: 'Response within business hours (Costa Rica, GMT-6).',
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
      success: "Message sent! I'll get back to you soon.",
      error: 'The message could not be sent. Write to me directly at info@jpr.lat.',
      notConfigured:
        'Form in demo mode: EmailJS is not configured. You can email info@jpr.lat.',
      directLabel: 'You can also reach me via',
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
      slogan: 'Digital strategy with system logic.',
      rights: 'All rights reserved.',
    },
    whatsapp: {
      aria: 'Message on WhatsApp',
      message:
        'Hi Joseph, I saw your portfolio and would like to discuss a digital project.',
    },
  },
}

export const contactInfo = {
  email: 'info@jpr.lat',
  whatsapp: '+50660427930',
  whatsappDigits: '50660427930',
  linkedin: 'https://www.linkedin.com/in/jpastora/',
  github: 'https://github.com/jpastora',
  website: 'https://jpr.lat',
}

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

export function getContent(language) {
  const lang = language === 'en' ? 'en' : DEFAULT_LANGUAGE
  return deepMerge(translations.es, translations[lang])
}
