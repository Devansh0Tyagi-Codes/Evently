/**
 * Badge — inline label chip
 *
 * Props:
 *   variant: 'blue' | 'purple' | 'green' | 'amber' | 'gray'  (default: 'blue')
 *   size:    'sm' | 'md'                                       (default: 'md')
 */
export default function Badge({ variant = 'blue', size = 'md', className = '', children }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  }

  const variants = {
    blue: 'bg-brand-blue/15 text-blue-400 border border-brand-blue/30',
    purple: 'bg-brand-purple/15 text-purple-400 border border-brand-purple/30',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    gray: 'bg-white/5 text-gray-400 border border-white/10',
  }

  return (
    <span
      className={[
        'inline-flex items-center gap-1 font-medium rounded-full',
        sizes[size],
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
