import { Layers, BarChart3, Code2, Database } from 'lucide-react'

const STACK = [
  { id: 'react', Icon: Code2, label: 'React' },
  { id: 'vite', Icon: Layers, label: 'Vite' },
  { id: 'ga4', Icon: BarChart3, label: 'GA4' },
  { id: 'data', Icon: Database, label: 'Node' },
]

export default function StackIcons({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {STACK.map(({ id, Icon, label }) => (
        <li
          key={id}
          className="flex items-center gap-2 rounded-lg border border-line bg-white/60 px-2.5 py-1.5 dark:bg-soft/30"
        >
          <Icon size={18} strokeWidth={1.5} className="shrink-0 text-orange" aria-hidden="true" />
          <span className="font-body text-base text-carbon">{label}</span>
        </li>
      ))}
    </ul>
  )
}
