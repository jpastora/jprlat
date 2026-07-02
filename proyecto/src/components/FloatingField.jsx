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
  const filled = Boolean(value)
  const base =
    'peer w-full rounded-lg border bg-white px-3.5 pb-2.5 pt-5 font-body text-sm text-carbon transition-colors duration-200 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/15'
  const border = error ? 'border-orange' : 'border-line'

  const labelClass =
    'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-body text-sm text-tech transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-orange peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs'

  if (as === 'select') {
    return (
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `err-${name}` : undefined}
          className={`${base} ${border} appearance-none ${filled ? 'pt-5' : ''}`}
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
        <label
          htmlFor={id}
          className={`absolute left-3.5 transition-all duration-200 ${
            filled
              ? 'top-3 text-xs text-tech'
              : 'top-1/2 -translate-y-1/2 text-sm text-tech'
          }`}
        >
          {label}
        </label>
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
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `err-${name}` : undefined}
          className={`${base} ${border} resize-y`}
        />
        <label htmlFor={id} className={`${labelClass} peer-focus:top-4`}>
          {label}
        </label>
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
        placeholder=" "
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${name}` : undefined}
        className={`${base} ${border}`}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {error && (
        <p id={`err-${name}`} className="mt-1.5 font-body text-xs text-orange">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
