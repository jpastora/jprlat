import AnimatedSection from './AnimatedSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import ServiceCard from './ServiceCard.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { services } from '../data/services.js'

export default function Services() {
  const { t } = useLanguage()

  return (
    <AnimatedSection id="servicios" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          tag={t.services.tag}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        {/* Mapa lateral de servicios (línea fina conectora, decorativa) */}
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-line lg:block"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
