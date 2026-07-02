import { motion } from 'framer-motion'
import { itemVariants } from '../utils/motion.js'
import SignalNode from './SignalNode.jsx'
import { useLanguage } from '../context/LanguageContext.js'

export default function ValueCard({ value }) {
  const { language } = useLanguage()

  return (
    <motion.li
      variants={itemVariants}
      className="group relative flex items-start gap-3 rounded-xl border border-line bg-white p-4 transition-all duration-300 hover:border-cool hover:shadow-[0_0_0_1px_rgba(255,107,0,0.15)]"
    >
      {/* Conector lateral */}
      <span
        className="absolute -left-px top-1/2 hidden h-px w-3 -translate-y-1/2 bg-line transition-colors group-hover:bg-orange lg:block"
        aria-hidden="true"
      />

      <span className="mt-1 flex shrink-0 items-center justify-center" aria-hidden="true">
        <SignalNode
          className="transition-all duration-300 group-hover:bg-orange group-hover:border-orange"
          pulse={false}
        />
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
