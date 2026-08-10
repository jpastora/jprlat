# Joseph Pastora — Portafolio freelance

Portafolio one-page, responsivo e interactivo para **Joseph Pastora Ramos**, freelance
estratégico que integra **ingeniería de software, marketing digital y análisis de datos**.

> **Estrategia digital con lógica de sistema.**

El sitio carga **en español por defecto**; el inglés aparece solo al usar el switch **ES / EN**.

---

## Stack

- **React** + **Vite** (JavaScript)
- **TailwindCSS v4** (plugin `@tailwindcss/vite`)
- **Framer Motion** (sistema de movimiento)
- **@emailjs/browser** (formulario de contacto)
- **lucide-react** (íconos de línea)
- Tipografías self-hosted vía **@fontsource**
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
npm run build            # genera assets + build de producción -> dist/
npm run generate:assets  # og.png, favicon.ico, apple-touch-icon
npm run preview          # sirve el build de producción
npm run lint             # análisis estático con oxlint
```

---

## Variables de entorno

Crea un archivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

### EmailJS (formulario de contacto)

Crea un servicio y plantilla en [emailjs.com](https://www.emailjs.com) y agrega:

```txt
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

#### Configuración de la plantilla EmailJS

En el panel de EmailJS, crea una plantilla de email con estas variables (nombres exactos):

| Variable en plantilla | Origen en el formulario |
|----------------------|-------------------------|
| `{{from_name}}` | Nombre del remitente |
| `{{reply_to}}` | Correo para responder |
| `{{project_type}}` | Tipo de proyecto seleccionado |
| `{{message}}` | Cuerpo del mensaje |

El formulario envía estos campos automáticamente vía `@emailjs/browser`. Si las tres variables de entorno están definidas, el envío es real; si faltan, funciona en **modo demo** (simula éxito sin enviar).

Pasos rápidos:

1. Regístrate en EmailJS y crea un **Email Service** (Gmail, Outlook, etc.).
2. Crea un **Email Template** con las variables de la tabla.
3. Copia Service ID, Template ID y Public Key a tu `.env`.
4. En Vercel, agrega las mismas variables en **Settings → Environment Variables**.
5. Redeploy.

Si faltan, el formulario funciona en **modo demo**.

### Google Analytics 4 (opcional)

```txt
VITE_GA4_ID=G-XXXXXXXXXX
```

El wrapper en `src/lib/analytics.js` expone `track(event, params)`:

- En **desarrollo**: registra eventos en consola (`[analytics] event {…}`).
- En **producción sin `VITE_GA4_ID`**: no-op (sin vendor lock).
- Con **`VITE_GA4_ID`**: inyecta gtag y reenvía eventos.

Eventos instrumentados: `cta_click`, `whatsapp_click`, `calendly_open`, `cv_download`, `form_submit`, `section_view`, `lang_toggle`, `theme_toggle`.

---

## Configuración editable sin tocar componentes

| Archivo | Qué editar |
|---------|------------|
| `src/config/site.config.js` | URL del sitio, foto de perfil (`profileImage`), dirección de mirada (`profileGaze`), URL de Calendly |
| `src/data/testimonials.js` | Citas de testimonios (ES/EN) |
| `src/data/translations.js` | Todo el copy del sitio |
| `public/profile.jpg` | Foto de perfil (fallback: monograma JP>) |

### Foto de perfil y dirección de mirada (`profileGaze`)

La persona en la foto debe mirar hacia el titular/headline adyacente en la sección de perfil estratégico.

1. Coloca tu imagen en `public/profile.jpg` (o actualiza `profileImage` en `site.config.js`).
2. Ajusta `profileGaze` según la dirección de la mirada en la foto:
   - **`left`** — la foto va a la izquierda y el texto a la derecha (la persona mira hacia el titular).
   - **`right`** — la foto va a la derecha y el texto a la izquierda.

`StrategicProfile.jsx` y `ProfilePhoto.jsx` leen `siteConfig.profileGaze` para ordenar el grid y mostrar el indicador visual de mirada.

---

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **New Project** → importa el repo.
3. Configura:
   - **Root Directory**: `proyecto`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Agrega las variables `VITE_EMAILJS_*` y opcionalmente `VITE_GA4_ID` en **Settings → Environment Variables**.
5. Deploy.

---

## Estructura de carpetas

```txt
proyecto/
  index.html
  .env.example
  public/
    favicon.svg, favicon.ico, apple-touch-icon.png
    og.png, robots.txt, sitemap.xml, site.webmanifest
    profile.jpg          # TODO: tu foto
  scripts/
    generate-assets.mjs  # OG + iconos desde SVG
  src/
    config/site.config.js
    lib/analytics.js, calendly.js
    data/testimonials.js, process.js, translations.js
    hooks/useTheme.jsx, useSectionTracking.js
    components/          # secciones + cursor, testimonios, proceso, etc.
```

---

## URL del portafolio

Producción: [https://jpr.lat](https://jpr.lat)
