/*
  Proyectos (datos dummy — galería en construcción).
  Reemplazar fácilmente por casos reales.
  Nota: las rutas de imagen son placeholders; si el archivo no existe,
  ProjectCard muestra un fallback visual (grid + brackets) sin romper la app.
*/
export const projects = [
  {
    id: 1,
    title: {
      es: 'Sitio web para sala de eventos',
      en: 'Event venue website',
    },
    status: {
      es: 'En construcción',
      en: 'Under construction',
    },
    category: 'Web',
    description: {
      es: 'Proyecto dummy para representar un sitio web orientado a presentar espacios, servicios y facilitar solicitudes de información.',
      en: 'Dummy project representing a website designed to showcase spaces, services, and facilitate information requests.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    image: '/src/assets/images/projects/eventos-placeholder.png',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 2,
    title: {
      es: 'Billetera digital',
      en: 'Digital wallet',
    },
    status: {
      es: 'En construcción',
      en: 'Under construction',
    },
    category: 'App',
    description: {
      es: 'Proyecto dummy enfocado en experiencia de usuario, operaciones digitales y estructura funcional de aplicación.',
      en: 'Dummy project focused on user experience, digital operations, and functional app structure.',
    },
    technologies: ['JavaScript', 'UI Logic', 'UX', 'Local State'],
    image: '/src/assets/images/projects/billetera-placeholder.png',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 3,
    title: {
      es: 'Servicio de compra de tickets',
      en: 'Ticket purchase service',
    },
    status: {
      es: 'En construcción',
      en: 'Under construction',
    },
    category: 'E-commerce',
    description: {
      es: 'Proyecto dummy para representar una plataforma de consulta, selección y compra de entradas.',
      en: 'Dummy project representing a platform for browsing, selecting, and purchasing tickets.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Checkout Flow'],
    image: '/src/assets/images/projects/tickets-placeholder.png',
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 4,
    title: {
      es: 'App personal en proceso',
      en: 'Personal app in progress',
    },
    status: {
      es: 'En construcción',
      en: 'Under construction',
    },
    category: 'Product',
    description: {
      es: 'Proyecto dummy orientado a resolver una necesidad digital específica mediante software.',
      en: 'Dummy project focused on solving a specific digital need through software.',
    },
    technologies: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
    image: '/src/assets/images/projects/app-placeholder.png',
    demoUrl: '#',
    repoUrl: '#',
  },
]
