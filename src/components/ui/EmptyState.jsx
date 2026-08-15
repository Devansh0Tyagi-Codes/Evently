import { CalendarX } from 'lucide-react'
import Button from './Button'

/**
 * EmptyState — light theme zero-results message
 */
export default function EmptyState({
  icon: Icon = CalendarX,
  title = 'Nothing here yet',
  description = 'Check back soon or try a different search.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-surface-muted border border-border flex items-center justify-center">
        <Icon size={24} className="text-ink-muted" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="text-ink-secondary text-sm leading-relaxed">{description}</p>
      </div>
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
