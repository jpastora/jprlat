import { Mail, Globe, MessageCircle, Download } from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons.jsx'
import AnimatedLogoMark from './AnimatedLogoMark.jsx'
import PerformanceGrid from './PerformanceGrid.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import { contactInfo } from '../data/translations.js'
import { SECTIONS } from '../data/navigation.js'
import { scrollToSection } from '../utils/scroll.js'
// CV placeholder — reemplazar en src/assets/cv/joseph-pastora-cv.pdf
import cvUrl from '../assets/cv/joseph-pastora-cv.pdf'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const social = [
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
    { icon: MessageCircle, href: `https://wa.me/${contactInfo.whatsappDigits}`, label: 'WhatsApp' },
    { icon: LinkedinMark, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: GithubMark, href: contactInfo.github, label: 'GitHub' },
    { icon: Globe, href: contactInfo.website, label: 'Website' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-soft">
      <PerformanceGrid variant="minimal" className="opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <AnimatedLogoMark size={38} />
              <div>
                <p className="font-heading text-sm font-semibold text-carbon">
                  Joseph Pastora
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-tech">
                  Performance OS
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-tech">
              {t.footer.tagline}
            </p>
            <p className="mt-3 font-mono text-xs text-tech">
              <span className="text-orange">{'>'}</span> {t.footer.slogan}
            </p>
            <a
              href={cvUrl}
              download="joseph-pastora-cv.pdf"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cool px-4 py-2 font-body text-xs font-semibold text-carbon transition-colors hover:border-orange hover:text-orange"
            >
              <Download size={14} aria-hidden="true" />
              {t.cta.downloadCv}
            </a>
          </div>

          {/* Navegación */}
          <nav aria-label={t.footer.navTitle}>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-tech">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(s.id)}
                    className="font-body text-sm text-carbon transition-colors hover:text-orange"
                  >
                    {t.nav[s.key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-tech">
              {t.footer.followTitle}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {social.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-carbon transition-colors hover:border-orange hover:text-orange"
                  >
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-tech">
            © {year} Joseph Pastora Ramos. {t.footer.rights}
          </p>
          <p className="font-mono text-[11px] text-tech">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
