/*
  Variantes de movimiento compartidas (Framer Motion).
  Se aíslan aquí para no romper el fast-refresh de los componentes.
*/
export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
