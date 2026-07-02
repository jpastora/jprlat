import { motion } from 'framer-motion'
import PageSection from './PageSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import { itemVariants } from '../utils/motion.js'
import { useLanguage } from '../context/LanguageContext.js'

export default function StrategicProfile() {
  const { t } = useLanguage()
  const p = t.profile

  return (
    <PageSection
      id="perfil"
      tone="bleed-soft"
      wide
      className="-mt-8 pb-28 pt-20 sm:pb-36 sm:pt-28"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionTitle title={p.title} subtitle={p.subtitle} />

          <motion.p
            variants={itemVariants}
            className="mt-10 max-w-prose font-body text-base leading-[1.75] text-carbon sm:text-lg"
          >
            {p.about}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 border-t border-line pt-8"
          >
            <p className="font-body text-sm text-tech">{p.credibilityLabel}</p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
              <li className="mr-3 font-mono text-xs text-orange">{p.experience}</li>
              {p.credibility.map((brand, i) => (
                <li key={brand} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-cool" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span className="font-body text-sm text-carbon">{brand}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col gap-12 lg:col-span-5 lg:pt-4">
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-lg font-medium text-carbon">
              {p.technical.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-tech">
              {p.technical.text}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-line pt-10">
            <h3 className="font-heading text-lg font-medium text-carbon">
              {p.human.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-tech">
              {p.human.text}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-1"
          >
            <div>
              <h3 className="font-heading text-base font-medium text-carbon">
                {p.mission.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.mission.text}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-medium text-carbon">
                {p.vision.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-tech">
                {p.vision.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageSection>
  )
}
