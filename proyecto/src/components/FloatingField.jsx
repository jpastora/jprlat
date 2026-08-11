import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const fieldInput =
  'contact-field-input peer w-full rounded-lg border bg-soft/80 px-4 pb-2.5 pt-7 font-body text-base leading-[1.5] text-carbon outline-none transition-colors duration-200 placeholder:text-transparent focus:border-orange disabled:opacity-60 dark:bg-soft/40'

function FieldMessage({ id, error, errorMessage }) {
  return (
    <p
      id={id}
      className={`mt-1.5 min-h-[1.25rem] font-body text-[0.875rem] leading-[1.5] ${
        error ? 'text-orange' : 'text-transparent'
      }`}
      aria-live="polite"
    >
      {error ? errorMessage : '\u00A0'}
    </p>
  )
}

function useFloatingLabel(focused, filled) {
  const active = focused || filled
  const labelClass = `pointer-events-none absolute left-4 origin-left transition-all duration-200 ${
    active
      ? 'top-2 translate-y-0 text-[0.875rem] text-orange'
      : 'top-1/2 -translate-y-1/2 text-base text-tech'
  }`
  return { active, labelClass }
}

export default function FloatingField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  errorMessage,
  as = 'input',
  options,
  rows = 5,
  placeholder,
  inputClassName = '',
}) {
  const [focused, setFocused] = useState(false)
  const filled = Boolean(value && String(value).length > 0)
  const { labelClass } = useFloatingLabel(focused, filled)
  const borderClass = error ? 'border-orange' : focused ? 'border-orange' : 'border-line'
  const wrapperClass = 'contact-field relative'

  if (as === 'select') {
    const selectLabelClass = `pointer-events-none absolute left-4 top-2 text-[0.875rem] text-tech`
    return (
      <div className={wrapperClass}>
        <div className="relative">
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-invalid={Boolean(error)}
            aria-describedby={`err-${name}`}
            className={`${fieldInput} ${borderClass} cursor-pointer appearance-none pr-10 ${
              filled ? 'text-carbon' : 'text-tech'
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-[calc(50%+0.25rem)] -translate-y-1/2 text-tech"
            aria-hidden="true"
          />
        </div>
        <label htmlFor={id} className={selectLabelClass}>
          {label}
        </label>
        <FieldMessage id={`err-${name}`} error={error} errorMessage={errorMessage} />
      </div>
    )
  }

  if (as === 'textarea') {
    return (
      <div className={wrapperClass}>
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={`err-${name}`}
          className={`${fieldInput} ${borderClass} min-h-[8rem] resize-y ${inputClassName}`}
        />
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <FieldMessage id={`err-${name}`} error={error} errorMessage={errorMessage} />
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        aria-invalid={Boolean(error)}
        aria-describedby={`err-${name}`}
        className={`${fieldInput} ${borderClass} min-h-[3.25rem]`}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <FieldMessage id={`err-${name}`} error={error} errorMessage={errorMessage} />
    </div>
  )
}

/** Honeypot — hidden from users, traps bots */
export function HoneypotField({ value, onChange }) {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
