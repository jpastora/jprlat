import { motion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

/*
  ValueCard — principio operativo. En hover activa un nodo naranja
  y el conector lateral. Movimiento sutil, plano y elegante.
*/
export default function ValueCard({ value }) {
  const { language } = useLanguage()

  return (
    <motion.li
      variants={itemVariants}
      className="group relative flex items-start gap-3 rounded-lg border border-line bg-white p-4 transition-colors duration-300 hover:border-cool"
    >
      {/* Nodo que se activa en hover */}
      <span className="mt-1.5 flex h-3 w-3 shrink-0 items-center justify-center" aria-hidden="true">
        <span className="h-2 w-2 rounded-full border border-cool bg-white transition-all duration-300 group-hover:border-orange group-hover:bg-orange" />
      </span>
      <div>
        <h4 className="font-heading text-sm font-semibold text-carbon">
          {value.name[language] ?? value.name.es}
        </h4>
        <p className="mt-0.5 font-body text-xs leading-relaxed text-tech">
          {value.description[language] ?? value.description.es}
        </p>
      </div>
    </motion.li>
  )
}
