import PageSection from './PageSection.jsx'
import MaskReveal from './MaskReveal.jsx'
import ServiceRow from './ServiceRow.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { services } from '../data/services.js'

export default function Services() {
  const { t } = useLanguage()

  return (
    <PageSection id="servicios" wide className="pb-28 pt-16 sm:pb-36 sm:pt-24">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <MaskReveal>
            <p className="font-body text-sm font-medium text-tech">{t.services.title}</p>
            <h2 className="mt-3 max-w-[14ch] font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-carbon sm:text-4xl">
              {t.services.stickyTitle}
            </h2>
            <p className="mt-5 max-w-prose font-body text-base leading-relaxed text-tech">
              {t.services.subtitle}
            </p>
          </MaskReveal>
        </div>

        <div className="mt-12 lg:col-span-8 lg:mt-0">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </PageSection>
  )
}
