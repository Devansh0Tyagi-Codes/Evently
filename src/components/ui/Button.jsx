/**
 * Button — redesigned light theme
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'accent'  (default: 'primary')
 * size:    'sm' | 'md' | 'lg'                              (default: 'md')
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
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-40 disabled:cursor-not-allowed select-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-[15px]',
  }

  const variants = {
    /* Black bg, white text */
    primary:
      'bg-ink text-white hover:bg-ink/85 active:scale-[0.98] shadow-sm',
    /* White bg, black border + text */
    secondary:
      'bg-white text-ink border border-border-strong hover:bg-surface-muted active:scale-[0.98]',
    /* Transparent, no border */
    ghost:
      'bg-transparent text-ink-secondary hover:text-ink hover:bg-surface-muted active:scale-[0.98]',
    /* Orange accent — use sparingly */
    accent:
      'bg-accent text-white hover:bg-accent-dark active:scale-[0.98] shadow-sm',
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
