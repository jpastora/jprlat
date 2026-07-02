/*
  PerformanceGrid — fondo decorativo de dot grid.
  Compone: dot grid, líneas finas, nodos, brackets y acentos naranja.
  Es puramente decorativo (aria-hidden). Se usa en hero, projects y footer.
*/
export default function PerformanceGrid({ className = '', variant = 'default' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div className="pos-dotgrid absolute inset-0 opacity-60" />

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
        fill="none"
      >
        {/* Líneas finas */}
        <line x1="0" y1="60" x2="400" y2="60" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="70" y1="0" x2="70" y2="300" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="330" y1="0" x2="330" y2="300" stroke="#E5E7EB" strokeWidth="1" />

        {/* Nodos */}
        <circle cx="70" cy="60" r="3" fill="#D1D5DB" />
        <circle cx="330" cy="60" r="3" fill="#D1D5DB" />
        <circle cx="70" cy="240" r="3" fill="#D1D5DB" />
        <circle cx="330" cy="240" r="4" fill="#FF6B00" />

        {variant === 'default' && (
          <circle cx="200" cy="150" r="3" fill="#FF6B00" opacity="0.8" />
        )}
      </svg>

      {/* Brackets en esquinas */}
      <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-cool" />
      <span className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-cool" />
      <span className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-cool" />
      <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-orange/70" />
    </div>
  )
}
