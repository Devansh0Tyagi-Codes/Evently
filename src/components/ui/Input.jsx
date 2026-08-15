/**
 * Input — base text input
 *
 * Props: label, placeholder, value, onChange, type, error, disabled, className
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
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          'w-full bg-dark-600 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500',
          'transition-all duration-200 outline-none',
          'focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/40',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/30'
            : 'border-white/10 hover:border-white/20',
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
