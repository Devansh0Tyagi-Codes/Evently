/**
 * Button — Primary and Secondary variants
 *
 * Props:
 *   variant: 'primary' | 'secondary' | 'ghost'  (default: 'primary')
 *   size:    'sm' | 'md' | 'lg'                  (default: 'md')
 *   fullWidth: boolean
 *   disabled: boolean
 *   onClick, type, className, children
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-dark-500 text-white border border-white/10 hover:bg-dark-400 hover:border-white/20 active:scale-[0.98]',
    ghost:
      'bg-transparent text-gray-300 hover:text-white hover:bg-dark-500 active:scale-[0.98]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        sizes[size],
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}
