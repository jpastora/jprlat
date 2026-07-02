# Joseph Pastora — Portafolio freelance · Performance OS

Portafolio one-page, responsivo e interactivo para **Joseph Pastora Ramos**, freelance
estratégico que integra **ingeniería de software, marketing digital y análisis de datos**.

> **Desarrollo soluciones digitales con lógica de negocio.**
> Estrategia digital con lógica de sistema · Foco • Claridad • Sistema • Resultados

El sitio carga **en español por defecto**; el inglés aparece solo al usar el switch **ES / EN**.

---

## Stack

- **React** + **Vite** (JavaScript)
- **TailwindCSS v4** (plugin `@tailwindcss/vite`)
- **Framer Motion** (sistema de movimiento)
- **@emailjs/browser** (formulario de contacto)
- **lucide-react** (íconos de línea)
- Despliegue en **Vercel**

---

## Instalación

```bash
cd proyecto
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

Otros comandos:

```bash
npm run build     # build de producción -> dist/
npm run preview   # sirve el build de producción
npm run lint      # análisis estático con oxlint
```

---

## Variables de entorno (EmailJS)

Crea un archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

```txt
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Consigue estos valores en [emailjs.com](https://www.emailjs.com):

1. Crea una cuenta y un **Email Service** → obtén el `SERVICE_ID`.
2. Crea un **Email Template** con variables `from_name`, `reply_to`, `project_type`, `message` → obtén el `TEMPLATE_ID`.
3. En **Account → API Keys** copia la **Public Key** → `PUBLIC_KEY`.

> Si las variables faltan, el formulario funciona en **modo demo**: valida, muestra un
> aviso en pantalla y registra los datos en consola **sin romper la aplicación**.

---

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **New Project** → importa el repo.
3. Configura:
   - **Root Directory**: `proyecto`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Agrega las variables de entorno `VITE_EMAILJS_*` en **Settings → Environment Variables**.
5. Deploy.

---

## Estructura de carpetas

```txt
proyecto/
  index.html
  .env.example
  README.md
  entrega.txt
  public/
    favicon.svg
  src/
    main.jsx
    App.jsx
    assets/
      logo/            # jp-logo.svg, jp-logo-compact.svg, favicon.svg (SVG editables)
      images/          # placeholders de proyectos (fallback visual si no existen)
      cv/              # joseph-pastora-cv.pdf (placeholder, reemplazar)
    components/        # Header, Hero, secciones, tarjetas y componentes de movimiento
    context/           # LanguageContext (idioma ES/EN)
    data/              # translations.js, projects.js, services.js, values.js
    utils/             # scroll.js, validation.js
    styles/            # index.css (Tailwind v4 + tokens Performance OS)
```

---

## Identidad: Performance OS

Interfaz premium, minimalista y técnica: fondo blanco dominante, líneas finas, dot grids,
brackets, nodos, chevrons `>` y tarjetas modulares. El naranja `#FF6B00` se usa solo como
señal de acción/performance (CTAs, hover, nodos activos, foco). Movimiento basado en la
lógica **entrada → proceso → salida**, siempre respetando `prefers-reduced-motion`.

### Assets a reemplazar (placeholders)

- `src/assets/logo/*.svg` — logo `JP>` y favicon (SVG editables).
- `public/favicon.svg` — copia del favicon usada por `index.html`.
- `src/assets/cv/joseph-pastora-cv.pdf` — CV real.
- `src/assets/images/projects/*.png` — imágenes reales de proyectos (hay fallback visual).

---

## URL del portafolio

Portfolio: `[PENDIENTE]`
