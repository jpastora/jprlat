/*
  Casos de estudio — estructura lista para 4–5 entradas reales.
  TODO: reemplazar copy marcado antes de producción.
*/

export const projects = [
  {
    id: 'venue-platform',
    todo: true,
    title: {
      es: 'Plataforma web para sala de eventos',
      en: 'Event venue web platform',
    },
    category: 'Web',
    status: {
      es: 'TODO · caso de ejemplo',
      en: 'TODO · sample case',
    },
    cover: null,
    summary: {
      es: 'Sitio orientado a conversión para reservas, consultas y presentación de espacios con lógica de negocio clara.',
      en: 'Conversion-focused site for bookings, inquiries, and space presentation with clear business logic.',
    },
    problem: {
      es: 'La sala dependía de WhatsApp y PDFs para cotizar. No había medición ni flujo digital unificado entre marketing y operaciones.',
      en: 'The venue relied on WhatsApp and PDFs for quotes. There was no measurement or unified digital flow between marketing and operations.',
    },
    decisions: {
      es: [
        'Arquitectura modular con secciones reutilizables y CMS ligero.',
        'Formularios con validación y eventos de analítica desde el día uno.',
        'Priorizar mobile-first por el tráfico de redes sociales.',
      ],
      en: [
        'Modular architecture with reusable sections and a lightweight CMS.',
        'Forms with validation and analytics events from day one.',
        'Mobile-first priority due to social media traffic.',
      ],
    },
    stack: ['React', 'Vite', 'TailwindCSS', 'GA4', 'EmailJS'],
    architecture: {
      es: 'Frontend estático con componentes por tipo de espacio, capa de datos desacoplada y hooks de medición en cada CTA.',
      en: 'Static frontend with components per space type, decoupled data layer, and measurement hooks on every CTA.',
    },
    marketingImpact: {
      es: [
        'Embudo de consulta trazable de anuncio a formulario.',
        'Reducción de fricción en la primera conversación comercial.',
        'Base lista para campañas de performance con landing dinámica.',
      ],
      en: [
        'Traceable inquiry funnel from ad to form.',
        'Reduced friction in the first commercial conversation.',
        'Foundation ready for performance campaigns with dynamic landing.',
      ],
    },
    metrics: [
      { label: { es: 'Tiempo de respuesta', en: 'Response time' }, value: '-40%' },
      { label: { es: 'Leads medibles', en: 'Measurable leads' }, value: '+3x' },
    ],
    links: { demo: '#', repo: '#' },
  },
  {
    id: 'wallet-app',
    todo: true,
    title: {
      es: 'Billetera digital B2B',
      en: 'B2B digital wallet',
    },
    category: 'App',
    status: {
      es: 'TODO · caso de ejemplo',
      en: 'TODO · sample case',
    },
    cover: null,
    summary: {
      es: 'Aplicación para operaciones digitales con foco en UX, trazabilidad y escalabilidad técnica.',
      en: 'Application for digital operations focused on UX, traceability, and technical scalability.',
    },
    problem: {
      es: 'Procesos manuales generaban errores en conciliación y poca visibilidad para el equipo comercial.',
      en: 'Manual processes caused reconciliation errors and poor visibility for the commercial team.',
    },
    decisions: {
      es: [
        'Estado centralizado con persistencia local como respaldo.',
        'API REST documentada para integraciones futuras.',
        'Diseño de flujos con validación en cada paso crítico.',
      ],
      en: [
        'Centralized state with local persistence as fallback.',
        'Documented REST API for future integrations.',
        'Flow design with validation at every critical step.',
      ],
    },
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    architecture: {
      es: 'SPA con capa de servicios, autenticación por token y módulos separados para operaciones y reportes.',
      en: 'SPA with service layer, token authentication, and separate modules for operations and reporting.',
    },
    marketingImpact: {
      es: [
        'Narrativa de producto alineada con pain points del buyer B2B.',
        'Métricas de adopción visibles para stakeholders.',
        'Material de ventas apoyado en demos funcionales.',
      ],
      en: [
        'Product narrative aligned with B2B buyer pain points.',
        'Adoption metrics visible to stakeholders.',
        'Sales material supported by functional demos.',
      ],
    },
    metrics: [
      { label: { es: 'Errores operativos', en: 'Operational errors' }, value: '-55%' },
      { label: { es: 'Adopción interna', en: 'Internal adoption' }, value: '92%' },
    ],
    links: { demo: '#', repo: '#' },
  },
  {
    id: 'ticket-commerce',
    todo: true,
    title: {
      es: 'Comercio de tickets',
      en: 'Ticket commerce',
    },
    category: 'E-commerce',
    status: {
      es: 'TODO · caso de ejemplo',
      en: 'TODO · sample case',
    },
    cover: null,
    summary: {
      es: 'Flujo de consulta, selección y compra con analítica de embudo y optimización continua.',
      en: 'Browse, select, and purchase flow with funnel analytics and continuous optimization.',
    },
    problem: {
      es: 'Checkout fragmentado y sin datos unificados entre campañas, web y ventas.',
      en: 'Fragmented checkout with no unified data between campaigns, web, and sales.',
    },
    decisions: {
      es: [
        'Checkout en pasos con abandono medible por etapa.',
        'Integración de pixels y eventos de conversión estandarizados.',
        'Componentes de UI reutilizables para temporadas y promociones.',
      ],
      en: [
        'Step checkout with measurable drop-off per stage.',
        'Standardized pixel and conversion event integration.',
        'Reusable UI components for seasons and promotions.',
      ],
    },
    stack: ['Next.js', 'Stripe', 'GA4', 'GTM'],
    architecture: {
      es: 'SSR selectivo para SEO, carrito en cliente con sincronización de inventario y capa de eventos de marketing.',
      en: 'Selective SSR for SEO, client cart with inventory sync, and marketing event layer.',
    },
    marketingImpact: {
      es: [
        'Embudo completo desde impresión hasta compra.',
        'Tests A/B sobre CTA y orden de pasos.',
        'Reportes ejecutivos con ROAS y conversión por canal.',
      ],
      en: [
        'Full funnel from impression to purchase.',
        'A/B tests on CTA and step order.',
        'Executive reports with ROAS and conversion by channel.',
      ],
    },
    metrics: [
      { label: { es: 'Conversión checkout', en: 'Checkout conversion' }, value: '+18%' },
      { label: { es: 'ROAS campañas', en: 'Campaign ROAS' }, value: '2.4x' },
    ],
    links: { demo: '#', repo: '#' },
  },
  {
    id: 'growth-dashboard',
    todo: true,
    title: {
      es: 'Dashboard de crecimiento y datos',
      en: 'Growth and data dashboard',
    },
    category: 'Data',
    status: {
      es: 'TODO · caso de ejemplo',
      en: 'TODO · sample case',
    },
    cover: null,
    summary: {
      es: 'Panel unificado para marketing y producto con métricas accionables, segmentación y alertas de rendimiento.',
      en: 'Unified panel for marketing and product with actionable metrics, segmentation, and performance alerts.',
    },
    problem: {
      es: 'Los equipos consultaban hojas de cálculo desactualizadas y no compartían una misma lectura del embudo ni del LTV.',
      en: 'Teams relied on outdated spreadsheets and lacked a shared view of the funnel and LTV.',
    },
    decisions: {
      es: [
        'Modelo de datos en capas con ETL ligero y cache para consultas frecuentes.',
        'Visualizaciones modulares por rol: marketing, producto y dirección.',
        'Eventos de negocio estandarizados desde web, CRM y campañas.',
      ],
      en: [
        'Layered data model with lightweight ETL and cache for frequent queries.',
        'Modular visualizations per role: marketing, product, and leadership.',
        'Standardized business events from web, CRM, and campaigns.',
      ],
    },
    stack: ['React', 'Node.js', 'BigQuery', 'GA4', 'Looker Studio'],
    architecture: {
      es: 'Frontend con widgets configurables, API de agregación y jobs programados para sincronizar fuentes heterogéneas.',
      en: 'Frontend with configurable widgets, aggregation API, and scheduled jobs to sync heterogeneous sources.',
    },
    marketingImpact: {
      es: [
        'Visibilidad semanal de CAC, conversión y cohortes sin exportar CSV.',
        'Alertas cuando un canal cae por debajo del umbral acordado.',
        'Narrativa de resultados alineada con objetivos trimestrales.',
      ],
      en: [
        'Weekly visibility on CAC, conversion, and cohorts without CSV exports.',
        'Alerts when a channel drops below the agreed threshold.',
        'Results narrative aligned with quarterly goals.',
      ],
    },
    metrics: [
      { label: { es: 'Tiempo de reporte', en: 'Reporting time' }, value: '-60%' },
      { label: { es: 'Decisiones basadas en datos', en: 'Data-driven decisions' }, value: '+2x' },
    ],
    links: { demo: '#', repo: '#' },
  },
]
