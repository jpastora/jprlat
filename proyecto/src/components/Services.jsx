import PageSection from './PageSection.jsx'
import SectionTitle from './SectionTitle.jsx'
import ServiceRow from './ServiceRow.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { services } from '../data/services.js'

export default function Services() {
  const { t } = useLanguage()

  return (
    <PageSection id="servicios" wide className="pb-28 pt-16 sm:pb-36 sm:pt-24">
      <div className="max-w-4xl">
        <SectionTitle title={t.services.title} subtitle={t.services.subtitle} />
      </div>

      <div className="mt-12 border-b border-line">
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>
    </PageSection>
  )
}
