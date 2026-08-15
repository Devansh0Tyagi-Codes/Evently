/**
 * Badge — light theme inline label chip
 *
 * variant: 'default' | 'orange' | 'green' | 'amber' | 'gray' | 'dark'
 *          (legacy names 'blue'|'purple' map to 'default' for compatibility)
 * size:    'sm' | 'md'
 */
export default function Badge({ variant = 'default', size = 'md', className = '', children }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  }

  /* Map legacy dark-theme variant names → light-theme equivalents */
  const resolved = ({ blue: 'default', purple: 'default', indigo: 'default' })[variant] ?? variant

  const variants = {
    default: 'bg-surface-muted text-ink-secondary border border-border',
    orange:  'bg-orange-50 text-orange-700 border border-orange-200',
    green:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber:   'bg-amber-50 text-amber-700 border border-amber-200',
    gray:    'bg-surface-muted text-ink-muted border border-border',
    dark:    'bg-ink text-white border border-ink',
  }

  return (
    <span
      className={[
        'inline-flex items-center gap-1 font-medium rounded-full',
        sizes[size],
        variants[resolved] ?? variants.default,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
