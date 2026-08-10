export default function ProjectsEmptyIllustration({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 140"
      fill="none"
      role="img"
      aria-labelledby="projects-empty-title"
    >
      <title id="projects-empty-title">Vista previa de caso de estudio</title>
      <rect x="16" y="16" width="208" height="108" rx="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <rect x="28" y="28" width="80" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 48 H96 M40 60 H80 M40 72 H72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M120 36 H200 M120 52 H184 M120 68 H168 M120 84 H192" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <rect x="120" y="96" width="40" height="16" rx="3" stroke="#FF6B00" strokeWidth="1.5" />
      <rect x="168" y="96" width="32" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M60 100 L76 88 L92 96 L116 72" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="116" cy="72" r="3" fill="#FF6B00" />
    </svg>
  )
}
