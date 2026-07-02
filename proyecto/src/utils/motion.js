/*
  Motion tokens compartidos — Framer Motion
*/
export const EASE_EXPO = [0.16, 1, 0.3, 1]
export const STAGGER_MS = 0.07
export const STAGGER_CHILD = 0.075

export const springMagnetic = { stiffness: 300, damping: 22, mass: 0.4 }
export const springSoft = { stiffness: 120, damping: 28, mass: 0.35 }

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_EXPO },
  },
}

export const maskReveal = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
}

export const lineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER_MS,
      duration: 0.5,
      ease: EASE_EXPO,
    },
  }),
}
