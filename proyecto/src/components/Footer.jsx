import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { SECTIONS } from '../data/navigation.js'
import { scrollToSection } from '../utils/scroll.js'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <AnimatedLogoMark size={28} />
          <span className="font-heading text-base font-semibold text-carbon">
            Joseph Pastora
          </span>
          <span className="hidden text-cool sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="font-body text-base text-tech">{t.footer.slogan}</span>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  className="font-body text-base text-tech transition-colors hover:text-orange"
                >
                  {t.nav[s.key]}
                </button>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-body text-base text-tech transition-colors hover:text-orange"
              >
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-[76rem] px-5 py-4 font-body text-[0.875rem] text-tech">
          © {year} Joseph Pastora Ramos. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
