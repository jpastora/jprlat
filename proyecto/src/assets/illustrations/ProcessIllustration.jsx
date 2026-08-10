export default function ProcessIllustration({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 100"
      fill="none"
      role="img"
      aria-labelledby="process-illustration-title"
    >
      <title id="process-illustration-title">Flujo de proceso de trabajo</title>
      <path
        d="M16 50 H184"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M16 50 H120"
        stroke="#FF6B00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="50" r="5" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="72" cy="50" r="5" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="128" cy="50" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="184" cy="50" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M70 28 H74 L72 22 Z" fill="#FF6B00" />
      <text x="10" y="78" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.6">
        01 → 04
      </text>
    </svg>
  )
}
