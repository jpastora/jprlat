import CountUp from './CountUp.jsx'
import { useLanguage } from '../context/LanguageContext.js'
import ProcessIllustration from '../assets/illustrations/ProcessIllustration.jsx'

export default function ProfileBento({ profile }) {
  const { t } = useLanguage()
  const b = t.profile.bento

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:grid-rows-3">
      <div className="col-span-2 row-span-1 flex flex-col justify-between rounded-xl border border-orange bg-orange p-5 text-white sm:col-span-3 sm:row-span-1">
        <p className="font-body text-base leading-[1.5] text-white/90">{b.experienceLabel}</p>
        <div className="mt-3 flex items-baseline gap-1">
          <CountUp value={profile.experienceValue} className="font-heading text-5xl font-bold" />
          <span className="font-heading text-4xl font-bold">+</span>
          <span className="ml-1 font-body text-lg">{profile.experienceUnit}</span>
        </div>
      </div>

      <div className="col-span-2 row-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 sm:col-span-3">
        <p className="font-body text-[0.875rem] text-tech">{b.brandsLabel}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {profile.credibility.slice(0, 6).map((brand) => (
            <li
              key={brand}
              className="rounded-md border border-line px-2 py-1 font-body text-[0.875rem] text-carbon"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1 row-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50">
        <p className="font-body text-[0.875rem] text-tech">{b.hybridLabel}</p>
        <p className="mt-2 font-heading text-[1.375rem] font-semibold text-carbon">{b.hybridValue}</p>
        <p className="mt-1 font-body text-base leading-[1.5] text-tech">{b.hybridHint}</p>
      </div>

      <div className="col-span-1 row-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50">
        <p className="font-body text-[0.875rem] text-tech">{b.stackLabel}</p>
        <p className="mt-2 font-mono text-[0.875rem] leading-[1.5] text-carbon">
          React · Node · GA4 · GTM
        </p>
      </div>

      <div className="col-span-2 row-span-2 flex items-center justify-center rounded-xl border border-line bg-white p-4 text-tech dark:bg-soft/50 sm:col-span-2 sm:row-span-2">
        <ProcessIllustration className="h-28 w-full max-w-[10rem] opacity-80" />
      </div>

      <div className="col-span-2 row-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 sm:col-span-4">
        <p className="font-body text-[0.875rem] text-tech">{b.locationLabel}</p>
        <p className="mt-2 font-body text-base leading-[1.5] text-carbon">{b.locationValue}</p>
        <p className="mt-1 font-body text-base leading-[1.5] text-tech">{b.availability}</p>
      </div>
    </div>
  )
}
