/*
  Variantes de movimiento compartidas (Framer Motion).
  Se aíslan aquí para no romper el fast-refresh de los componentes.
*/
export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
