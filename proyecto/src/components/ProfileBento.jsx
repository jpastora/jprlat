import { Blend } from 'lucide-react'
import CountUp from './CountUp.jsx'
import ProfilePhoto from './ProfilePhoto.jsx'
import StackIcons from './StackIcons.jsx'
import ProcessIllustration from '../assets/illustrations/ProcessIllustration.jsx'
import { useLanguage } from '../context/LanguageContext.js'

export default function ProfileBento({ profile }) {
  const { t } = useLanguage()
  const b = t.profile.bento

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 lg:grid-rows-[auto_auto_auto]">
      {/* A — Photo (tall, 2 cols × 3 rows on lg) */}
      <div className="col-span-2 row-span-2 min-h-[14rem] sm:min-h-[18rem] lg:col-span-2 lg:row-span-3 lg:min-h-0">
        <ProfilePhoto compact className="h-full" />
      </div>

      {/* B — Experience (orange accent) */}
      <div className="col-span-2 flex flex-col justify-between rounded-xl border border-orange bg-orange p-4 sm:p-5 lg:col-span-2 lg:col-start-3 lg:row-start-1">
        <p className="font-body text-base leading-[1.5] text-white/90">{b.experienceLabel}</p>
        <div className="mt-2 flex items-baseline gap-1">
          <CountUp value={profile.experienceValue} className="font-heading text-4xl font-bold text-white sm:text-5xl" />
          <span className="font-heading text-3xl font-bold text-white sm:text-4xl">+</span>
          <span className="ml-1 font-body text-base text-white/90 sm:text-lg">{profile.experienceUnit}</span>
        </div>
      </div>

      {/* C — Brands */}
      <div className="col-span-2 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 lg:col-span-2 lg:col-start-5 lg:row-span-2 lg:row-start-1">
        <p className="font-body text-[0.875rem] text-tech">{b.brandsLabel}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {profile.credibility.map((brand) => (
            <li
              key={brand}
              className="rounded-md border border-line px-2.5 py-1 font-body text-base text-carbon"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* D — Hybrid profile */}
      <div className="col-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 lg:col-span-1 lg:col-start-3 lg:row-start-2">
        <p className="font-body text-[0.875rem] text-tech">{b.hybridLabel}</p>
        <div className="mt-2 flex items-start gap-2">
          <Blend size={20} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
          <p className="font-body text-base leading-[1.5] text-carbon">{b.hybridHint}</p>
        </div>
      </div>

      {/* E — Stack icons */}
      <div className="col-span-1 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 lg:col-span-1 lg:col-start-4 lg:row-start-2">
        <p className="mb-3 font-body text-[0.875rem] text-tech">{b.stackLabel}</p>
        <StackIcons />
      </div>

      {/* F — Location + illustration */}
      <div className="col-span-2 flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-4 dark:bg-soft/50 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-3">
        <div>
          <p className="font-body text-[0.875rem] text-tech">{b.locationLabel}</p>
          <p className="mt-2 font-body text-base leading-[1.5] text-carbon">{b.locationValue}</p>
          <p className="mt-1 font-body text-base leading-[1.5] text-tech">{b.availability}</p>
        </div>
        <ProcessIllustration className="h-16 w-full max-w-[8rem] self-end text-tech opacity-70" />
      </div>
    </div>
  )
}
