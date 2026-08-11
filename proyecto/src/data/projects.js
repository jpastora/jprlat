export const projects = [
  {
    id: 'p2wallet',
    title: 'P2Wallet',
    category: 'Fintech',
    cover: '/projects/p2wallet.png',
    summary: {
      es: 'Billetera digital y pasarela de cobros entre usuarios y comercios, con paneles por rol y pago por QR.',
      en: 'Digital wallet and payment gateway between users and merchants, with role-based panels and QR payments.',
    },
    problem: {
      es: 'Se necesitaba una plataforma de pagos con roles diferenciados (usuario, comercio y administrador), transacciones trazables y una experiencia consistente en toda la aplicación.',
      en: 'The goal was a payments platform with differentiated roles (user, merchant, admin), traceable transactions, and a consistent experience across the app.',
    },
    decisions: {
      es: [
        'Arquitectura en capas separando la aplicación web del acceso a datos, con un patrón CRUD Factory para construir las transacciones.',
        'Refactor del método de construcción de transacciones con manejo seguro de valores nulos de base de datos y métodos helper tipados.',
        'Sistema de autorización por rol: el administrador accede a todo y cada usuario solo a los comercios y entidades asignados.',
        'Unificación del sistema de diseño con un patrón de páginas consistente para reducir deuda visual.',
      ],
      en: [
        'Layered architecture separating the web app from data access, using a CRUD Factory pattern to build transactions.',
        'Refactored the transaction-building method with safe handling of null database values and typed helper methods.',
        'Role-based authorization: the admin sees everything, each user only their assigned merchants and entities.',
        'Unified design system with a consistent page pattern to reduce visual debt.',
      ],
    },
    architecture: {
      es: 'Aplicación .NET con Razor Pages sobre una arquitectura por capas (WebApp + DataAccess), persistencia en SQL e interfaz con Bootstrap.',
      en: 'A .NET application with Razor Pages over a layered architecture (WebApp + DataAccess), SQL persistence, and a Bootstrap UI.',
    },
    businessImpact: {
      es: [
        'Modelo de dos lados que conecta usuarios y comercios en un mismo circuito de cobro.',
        'Generación de solicitudes de cobro, promociones por comercio y panel de estado de solicitudes.',
      ],
      en: [
        'Two-sided model connecting users and merchants in a single payment circuit.',
        'Payment request generation, per-merchant promotions, and a request-status panel.',
      ],
    },
    stack: ['C#', '.NET', 'Razor Pages', 'SQL', 'Bootstrap'],
    links: { repo: 'https://github.com/jpastora/P2Wallet' },
  },
  {
    id: 'vibetickets',
    title: 'VibeTickets',
    category: 'E-commerce',
    cover: '/projects/vibetickets.png',
    summary: {
      es: 'Plataforma de compra de entradas a eventos, de extremo a extremo: catálogo, carrito, pago y ticket con código QR.',
      en: 'End-to-end event ticketing platform: catalog, cart, checkout, and QR-coded tickets.',
    },
    problem: {
      es: 'Construir un flujo de comercio electrónico completo para eventos, desde explorar el catálogo hasta emitir un ticket válido con código QR, con autenticación segura y panel de administración.',
      en: 'Build a complete e-commerce flow for events, from browsing the catalog to issuing a valid QR ticket, with secure authentication and an admin panel.',
    },
    decisions: {
      es: [
        'Arquitectura MVC en Express con separación clara de controladores, modelos, rutas, middleware y vistas.',
        'Modelo de datos en MongoDB con entidades de evento, carrito, orden, ticket, tarjeta de pago y eventos guardados.',
        'Autenticación con sesiones y hashing de contraseñas, protegida por middleware de verificación de rol de usuario y administrador.',
        'Emisión de tickets con código QR y notificaciones por correo transaccional; carga de imágenes gestionada en el servidor.',
        'Adaptación a entorno serverless para despliegue, envolviendo la aplicación en una función con reescritura de rutas.',
      ],
      en: [
        'MVC architecture in Express with clear separation of controllers, models, routes, middleware, and views.',
        'MongoDB data model with event, cart, order, ticket, payment-card, and saved-event entities.',
        'Session-based authentication with password hashing, protected by user and admin role-check middleware.',
        'QR-coded ticket issuance and transactional email notifications; server-side image uploads.',
        'Serverless adaptation for deployment, wrapping the app in a function with route rewrites.',
      ],
    },
    architecture: {
      es: 'Aplicación Node.js con Express y vistas EJS, base de datos MongoDB con Mongoose, sesiones para autenticación, generación de QR y correo transaccional, desplegable en entorno serverless.',
      en: 'A Node.js app with Express and EJS views, MongoDB via Mongoose, session-based auth, QR generation, transactional email, and serverless-ready deployment.',
    },
    businessImpact: {
      es: [
        'Ciclo de compra completo: carrito, pago, emisión de ticket y confirmación por correo.',
        'Función de eventos guardados como gancho de recurrencia del usuario.',
      ],
      en: [
        'Complete purchase cycle: cart, payment, ticket issuance, and email confirmation.',
        'Saved-events feature as a user recurrence hook.',
      ],
    },
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'EJS', 'QR', 'MailerSend'],
    links: { repo: 'https://github.com/jpastora/VibeTickets-Final' },
  },
  {
    id: 'lamanoa',
    title: 'La Manoa',
    category: 'Web',
    cover: '/projects/lamanoa.png',
    summary: {
      es: 'Sitio web en producción para una sala de eventos: presenta los espacios y capta solicitudes por formulario y WhatsApp.',
      en: 'Live website for an events venue: showcases the spaces and captures inquiries via form and WhatsApp.',
    },
    problem: {
      es: 'El negocio necesitaba una presencia digital profesional que comunicara sus espacios y convirtiera visitantes en solicitudes de reserva, con un canal de contacto directo y de baja fricción.',
      en: 'The business needed a professional digital presence that communicated its spaces and turned visitors into booking inquiries, with a direct, low-friction contact channel.',
    },
    decisions: {
      es: [
        'Sitio en WordPress para dar autonomía de edición de contenido al cliente.',
        'Formulario de captación con campo de fecha de interés del evento como señal de calificación temprana, junto a un llamado directo a WhatsApp.',
        'Metadatos Open Graph y estructura orientada a posicionamiento local.',
      ],
      en: [
        'WordPress site to give the client content-editing autonomy.',
        'Lead form with an event-date field as an early qualification signal, alongside a direct WhatsApp call to action.',
        'Open Graph metadata and a structure oriented toward local search.',
      ],
    },
    architecture: {
      es: 'Sitio WordPress con composición visual de los espacios, formulario de contacto e integración directa con WhatsApp. Diseño, desarrollo y montaje realizados de forma íntegra e individual.',
      en: 'A WordPress site with a visual layout of the spaces, a contact form, and direct WhatsApp integration. Design, development, and setup done entirely solo.',
    },
    businessImpact: {
      es: [
        'Enfoque en conversión a consulta mediante WhatsApp y formulario.',
        'Los espacios presentados como argumento visual de venta.',
      ],
      en: [
        'Focus on converting visits into inquiries via WhatsApp and form.',
        'The spaces presented as a visual selling argument.',
      ],
    },
    stack: ['WordPress', 'SEO', 'Open Graph'],
    links: { site: 'https://fincamanoa.com' },
  },
  {
    id: 'diagnostico-medico',
    title: {
      es: 'Diagnóstico estratégico y arquitectura digital',
      en: 'Strategic diagnosis and digital architecture',
    },
    category: 'Estrategia',
    cover: '/projects/diagnostico.png',
    confidential: true,
    summary: {
      es: 'Consultoría de estrategia digital para una práctica médica premium: diagnóstico del ecosistema digital y diseño de la arquitectura de captación, medición y CRM.',
      en: 'Digital strategy consulting for a premium medical practice: diagnosis of the digital ecosystem and design of the acquisition, measurement, and CRM architecture.',
    },
    problem: {
      es: 'Una práctica con reputación sólida pero sin sistema: captación completamente por recomendación, sin trazabilidad ni atribución, y con la mayoría de los activos digitales fuera del control verificable del titular.',
      en: 'A practice with a strong reputation but no system: acquisition entirely by referral, no traceability or attribution, and most digital assets outside the owner\'s verifiable control.',
    },
    decisions: {
      es: [
        'Auditoría de 17 activos digitales con una matriz de estado, riesgo y acción, más un mapa de riesgos priorizado.',
        'Diseño de un embudo comercial de cinco etapas con registro obligatorio del motivo de no cierre como fuente de aprendizaje.',
        'Arquitectura de medición y atribución de extremo a extremo para cerrar el circuito entre el CRM y la inversión publicitaria a nivel de paciente.',
        'Evaluación comparativa de plataformas de CRM con criterios ponderados y decisión de plataforma web sustentada en una auditoría de 32 hallazgos.',
      ],
      en: [
        'Audit of 17 digital assets with a status, risk, and action matrix, plus a prioritized risk map.',
        'Design of a five-stage commercial funnel with a mandatory no-close reason as a learning source.',
        'End-to-end measurement and attribution architecture to close the loop between CRM and ad spend at the patient level.',
        'Weighted comparative evaluation of CRM platforms and a web-platform decision backed by a 32-finding audit.',
      ],
    },
    architecture: {
      es: 'Diseño de un sistema por capas: identidad y propiedad de activos, captación, filtrado, gestión en CRM, medición y atribución, retorno del dato hacia las plataformas de pauta, y retención.',
      en: 'Design of a layered system: identity and asset ownership, acquisition, filtering, CRM management, measurement and attribution, data return to ad platforms, and retention.',
    },
    businessImpact: {
      es: [
        'Definición del perfil de cliente ideal y de las señales de calificación del prospecto.',
        'Gobernanza de propiedad de activos a nombre del titular y lineamiento de comunicación conforme al marco regulatorio.',
        'Roadmap de implementación modular con inversión estimada.',
      ],
      en: [
        'Definition of the ideal client profile and prospect qualification signals.',
        'Asset-ownership governance under the owner\'s name and a communication guideline aligned with the regulatory framework.',
        'Modular implementation roadmap with estimated investment.',
      ],
    },
    stack: ['Estrategia digital', 'GA4', 'GTM', 'CRM', 'Atribución'],
    links: {},
  },
]
