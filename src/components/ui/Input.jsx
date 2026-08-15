/**
 * Input — light theme base text input
 */
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-ink">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          'w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-ink placeholder-ink-muted',
          'shadow-input transition-all duration-150 outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/15'
            : 'border-border hover:border-border-strong focus:border-ink focus:ring-2 focus:ring-ink/10',
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
