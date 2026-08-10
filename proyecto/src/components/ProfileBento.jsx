import { Blend } from 'lucide-react'
import CountUp from './CountUp.jsx'
import ProfilePhoto from './ProfilePhoto.jsx'
import StackIcons from './StackIcons.jsx'
import ProcessIllustration from '../assets/illustrations/ProcessIllustration.jsx'
import { useLanguage } from '../context/LanguageContext.js'

const cell =
  'flex h-full min-h-[5.5rem] flex-col rounded-xl border border-line bg-white p-4 dark:bg-soft/50 sm:p-5'

export default function ProfileBento({ profile }) {
  const { t } = useLanguage()
  const b = t.profile.bento

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
      <div className="w-full shrink-0 lg:w-[min(38%,22rem)]">
        <ProfilePhoto compact showGazeAccent={false} className="w-full" />
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          className={`col-span-2 flex flex-col justify-between border-orange bg-orange text-white sm:col-span-2 ${cell}`}
        >
          <p className="font-body text-base leading-[1.5] text-white/90">{b.experienceLabel}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <CountUp value={profile.experienceValue} className="font-heading text-4xl font-bold sm:text-5xl" />
            <span className="font-heading text-3xl font-bold sm:text-4xl">+</span>
            <span className="ml-1 font-body text-base text-white/90 sm:text-lg">{profile.experienceUnit}</span>
          </div>
        </div>

        <div className={`col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 ${cell}`}>
          <p className="font-body text-base text-tech">{b.brandsLabel}</p>
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

        <div className={`col-span-1 ${cell}`}>
          <p className="font-body text-base text-tech">{b.hybridLabel}</p>
          <div className="mt-2 flex items-start gap-2">
            <Blend size={20} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
            <p className="font-body text-base leading-[1.5] text-carbon">{b.hybridHint}</p>
          </div>
        </div>

        <div className={`col-span-1 ${cell}`}>
          <p className="mb-3 font-body text-base text-tech">{b.stackLabel}</p>
          <StackIcons />
        </div>

        <div className={`col-span-2 flex flex-col justify-between gap-3 sm:col-span-4 ${cell}`}>
          <div>
            <p className="font-body text-base text-tech">{b.locationLabel}</p>
            <p className="mt-2 font-body text-base leading-[1.5] text-carbon">{b.locationValue}</p>
            <p className="mt-1 font-body text-base leading-[1.5] text-tech">{b.availability}</p>
          </div>
          <ProcessIllustration className="h-14 w-full max-w-[7rem] self-end text-tech opacity-70" />
        </div>
      </div>
    </div>
  )
}
