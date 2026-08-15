import { CalendarX } from 'lucide-react'
import Button from './Button'

/**
 * EmptyState — friendly zero-results message
 *
 * Props: icon (Lucide component), title, description, action { label, onClick }
 */
export default function EmptyState({
  icon: Icon = CalendarX,
  title = 'Nothing here yet',
  description = 'Check back soon or try a different search.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-dark-600 border border-white/5 flex items-center justify-center">
        <Icon size={28} className="text-gray-500" />
      </div>
      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
