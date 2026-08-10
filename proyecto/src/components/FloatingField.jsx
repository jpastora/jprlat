import { useState } from 'react'

const fieldInput =
  'contact-field-input peer w-full min-h-[2.75rem] appearance-none border-0 border-b border-line bg-transparent px-0 pb-2 pt-6 font-body text-base text-carbon outline-none transition-colors duration-200 placeholder:text-transparent focus:border-orange disabled:opacity-60'

function FieldMessage({ id, error, errorMessage }) {
  return (
    <p
      id={id}
      className={`mt-1.5 min-h-[1.125rem] font-body text-[0.875rem] leading-tight ${
        error ? 'text-orange' : 'text-transparent'
      }`}
      aria-live="polite"
    >
      {error ? errorMessage : '\u00A0'}
    </p>
  )
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
}) {
  const [focused, setFocused] = useState(false)
  const filled = Boolean(value && String(value).length > 0)
  const active = focused || filled
  const borderClass = error ? 'border-orange' : active ? 'border-orange' : 'border-line'

  const labelClass = `pointer-events-none absolute left-0 origin-left transition-all duration-200 ${
    active
      ? 'top-1 translate-y-0 text-[0.875rem] text-orange'
      : 'top-6 -translate-y-1/2 text-base text-tech'
  }`

  const wrapperClass = 'contact-field relative min-h-[4.25rem]'

  if (as === 'select') {
    return (
      <div className={wrapperClass}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={Boolean(error)}
          aria-describedby={`err-${name}`}
          className={`${fieldInput} ${borderClass} cursor-pointer`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <label htmlFor={id} className={labelClass}>
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
          className={`${fieldInput} ${borderClass} min-h-[7.5rem] resize-y`}
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
        className={`${fieldInput} ${borderClass}`}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <FieldMessage id={`err-${name}`} error={error} errorMessage={errorMessage} />
    </div>
  )
}
