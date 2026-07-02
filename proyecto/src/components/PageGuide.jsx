/*
  PageGuide — línea vertical persistente que conecta visualmente
  todas las secciones. Decorativa, sin texto ni jargon.
*/
export default function PageGuide() {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-[max(1.25rem,calc(50%-42rem))] z-0 hidden w-px bg-line/80 lg:block"
      aria-hidden="true"
    >
      <span className="absolute top-24 h-1.5 w-1.5 -translate-x-[2.5px] rounded-full bg-orange" />
    </div>
  )
}
