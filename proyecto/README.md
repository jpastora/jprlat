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
- **@calcom/embed-react** (agendamiento Cal.com; Calendly como fallback)
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

El formulario lee tres variables de entorno. Si **alguna falta**, funciona en **modo demo** (simula éxito con un aviso visible; no envía correo real).

```txt
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

#### Configuración paso a paso (EmailJS)

1. **Crear cuenta** en [emailjs.com](https://www.emailjs.com).
2. **Agregar un Email Service** (recomendado: Gmail) en **Email Services → Add New Service**.
3. **Crear un Email Template** en **Email Templates → Create New Template** con estas variables exactas:

   | Variable en plantilla | Origen en el formulario |
   |----------------------|-------------------------|
   | `{{from_name}}` | Nombre del remitente |
   | `{{reply_to}}` | Correo para responder |
   | `{{project_type}}` | Tipo de proyecto seleccionado |
   | `{{message}}` | Cuerpo del mensaje |

4. En la plantilla, configura **Reply-To** como `{{reply_to}}`.
5. Copia **Service ID**, **Template ID** y **Public Key** (Account → API Keys).
6. En EmailJS → **Account → API Keys → Allowed Origins**, restringe la Public Key al dominio de producción (p. ej. `https://jpr.lat`).
7. Agrega las tres variables en **Vercel → Settings → Environment Variables** y en tu `.env` local.
8. Redeploy en Vercel para que tome las variables.

**Cuerpo de plantilla de ejemplo:**

```txt
Nuevo mensaje desde jpr.lat

Nombre: {{from_name}}
Correo: {{reply_to}}
Tipo de proyecto: {{project_type}}

Mensaje:
{{message}}
```

El formulario envía exactamente esas claves (`from_name`, `reply_to`, `project_type`, `message`) vía `@emailjs/browser`. Incluye un campo honeypot oculto (`website`) que aborta el envío en silencio si se rellena.

---

### Cal.com (agendamiento)

La URL y el proveedor se configuran en `src/config/site.config.js` (no en `.env`):

```js
schedulerUrl: 'https://cal.com/tu-usuario/30min',
schedulerProvider: 'cal', // 'cal' | 'calendly'
```

#### Configuración paso a paso (Cal.com)

1. **Crear cuenta** en [cal.com](https://cal.com).
2. **Crear un event type** de 30 minutos (p. ej. “Consulta inicial”).
3. **Conectar Google Calendar** en **Settings → Calendars**.
4. Copia el **booking link** del event type (formato `https://cal.com/tu-usuario/30min`).
5. Pégalo en `schedulerUrl` dentro de `src/config/site.config.js`.
6. Commit y deploy.

Si `schedulerUrl` contiene `TODO`, el botón **Agendar** abre WhatsApp con un mensaje precargado en lugar del embed.

#### Volver a Calendly

Cambia `schedulerProvider` a `'calendly'` y configura `calendlyUrl` con tu enlace de Calendly. El embed de Calendly se carga solo al primer clic (igual que Cal.com).

---

### Google Analytics 4 (opcional)

```txt
VITE_GA4_ID=G-XXXXXXXXXX
```

El wrapper en `src/lib/analytics.js` expone `track(event, params)`:

- En **desarrollo**: registra eventos en consola (`[analytics] event {…}`).
- En **producción sin `VITE_GA4_ID`**: no-op (sin vendor lock).
- Con **`VITE_GA4_ID`**: inyecta gtag y reenvía eventos.

Eventos instrumentados: `cta_click`, `whatsapp_click`, `scheduler_open`, `calendly_open` (alias), `cv_download`, `form_submit`, `section_view`, `lang_toggle`, `theme_toggle`.

---

## Configuración editable sin tocar componentes

| Archivo | Qué editar |
|---------|------------|
| `src/config/site.config.js` | URL del sitio, foto de perfil, `profileGaze`, `schedulerUrl`, `schedulerProvider`, `calendlyUrl` |
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
5. Configura `schedulerUrl` en `site.config.js` antes del deploy (o en un commit previo).
6. Deploy.

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
    lib/analytics.js, emailjs.js, scheduler.js, calendly.js
    data/testimonials.js, process.js, translations.js
    hooks/useTheme.jsx, useSectionTracking.js
    components/          # secciones + cursor, testimonios, proceso, etc.
```

---

## URL del portafolio

Producción: [https://jpr.lat](https://jpr.lat)
