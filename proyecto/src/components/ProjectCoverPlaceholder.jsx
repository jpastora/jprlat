const MOTIFS = {
  Fintech: (
    <>
      <rect x="28" y="28" width="56" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 48 H72 M40 56 H64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="72" cy="40" r="6" stroke="#FF6B00" strokeWidth="1.5" />
      <path d="M70 40 H74 M72 38 V42" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  Estrategia: (
    <>
      <circle cx="56" cy="44" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M56 24 V32 M56 56 V64 M36 44 H44 M68 44 H76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="56" cy="44" r="4" fill="#FF6B00" />
    </>
  ),
  Web: (
    <>
      <rect x="20" y="24" width="72" height="52" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 44 H80 M32 56 H68 M32 68 H56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  App: (
    <>
      <rect x="36" y="20" width="40" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="56" cy="76" r="3" fill="#FF6B00" />
      <path d="M44 36 H68 M44 48 H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  'E-commerce': (
    <>
      <path d="M24 36 H88 L96 72 H16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="32" cy="80" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="72" cy="80" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M56 24 V36" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  Growth: (
    <>
      <path d="M20 76 L44 52 L64 60 L92 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="92" cy="28" r="4" fill="#FF6B00" />
      <path d="M20 88 H92" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </>
  ),
  Data: (
    <>
      <ellipse cx="56" cy="36" rx="28" ry="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 36 V64 C28 74 80 74 84 64 V36" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 52 C40 58 72 58 84 52" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

export default function ProjectCoverPlaceholder({ category = 'Web', className = '' }) {
  const motif = MOTIFS[category] ?? MOTIFS.Web

  return (
    <div className={`relative h-full w-full overflow-hidden bg-soft dark:bg-soft/40 ${className}`}>
      <div className="pos-dotgrid absolute inset-0 opacity-40" aria-hidden="true" />
      <svg
        className="relative h-full w-full p-6"
        viewBox="0 0 112 96"
        fill="none"
        role="img"
        aria-hidden="true"
      >
        {motif}
        <path
          d="M8 8 H104 M8 88 H104"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
      <span className="absolute bottom-3 left-3 font-mono text-[0.875rem] text-tech">{category}</span>
    </div>
  )
}
