export default function ServicesIllustration({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      role="img"
      aria-labelledby="services-illustration-title"
    >
      <title id="services-illustration-title">Capacidades integradas de servicios</title>
      <rect x="12" y="20" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 38 H48 M24 46 H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="84" cy="38" r="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M84 28 V48 M74 38 H94" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="120" y="24" width="68" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M132 38 H176" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M36 68 L84 68 L120 68 L156 68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
      <circle cx="36" cy="68" r="3" fill="#FF6B00" />
      <circle cx="84" cy="68" r="3" fill="currentColor" />
      <circle cx="156" cy="68" r="3" fill="#FF6B00" />
      <path d="M48 88 H152 M72 96 H128" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}
