export default function ContactIllustration({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      fill="none"
      role="img"
      aria-labelledby="contact-illustration-title"
    >
      <title id="contact-illustration-title">Comunicación y contacto</title>
      <rect x="20" y="24" width="120" height="72" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 40 H140" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="32" cy="32" r="4" fill="#FF6B00" />
      <circle cx="44" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="56" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 60 H124 M36 72 H100 M36 84 H80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M108 76 L124 88 L108 100" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
