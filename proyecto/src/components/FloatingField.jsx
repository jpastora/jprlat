import { useState } from 'react'

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
  rows = 4,
  placeholder,
}) {
  const [focused, setFocused] = useState(false)
  const filled = Boolean(value)
  const active = focused || filled

  const base =
    'peer w-full border-0 border-b bg-transparent px-0 pb-2 pt-6 font-body text-sm text-carbon placeholder:text-transparent transition-colors duration-200 focus:outline-none'
  const border = error ? 'border-orange' : active ? 'border-orange' : 'border-line'

  const labelClass = `pointer-events-none absolute left-0 transition-all duration-300 ${
    active
      ? 'top-0 text-xs text-orange'
      : 'top-5 text-sm text-tech'
  }`

  const underline = (
    <span
      className={`absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-300 ${
        error ? 'bg-orange' : 'bg-orange'
      } ${active ? 'scale-x-100' : 'scale-x-0'}`}
      aria-hidden="true"
    />
  )

  if (as === 'select') {
    return (
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `err-${name}` : undefined}
          className={`${base} ${border} appearance-none border-b`}
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
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {underline}
        {error && (
          <p id={`err-${name}`} className="mt-1.5 font-body text-xs text-orange">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }

  if (as === 'textarea') {
    return (
      <div className="relative">
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
          aria-describedby={error ? `err-${name}` : undefined}
          className={`${base} ${border} resize-y border-b`}
        />
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {underline}
        {error && (
          <p id={`err-${name}`} className="mt-1.5 font-body text-xs text-orange">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
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
        aria-describedby={error ? `err-${name}` : undefined}
        className={`${base} ${border} border-b`}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {underline}
      {error && (
        <p id={`err-${name}`} className="mt-1.5 font-body text-xs text-orange">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
