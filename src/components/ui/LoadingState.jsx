/**
 * LoadingState — skeleton / spinner placeholder
 *
 * Props: message, variant ('spinner' | 'skeleton'), count (for skeleton cards)
 */
export default function LoadingState({
  message = 'Loading…',
  variant = 'spinner',
  count = 3,
}) {
  if (variant === 'skeleton') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-dark-500" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-dark-500 rounded-full w-3/4" />
              <div className="h-3 bg-dark-500 rounded-full w-1/2" />
              <div className="h-3 bg-dark-500 rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-10 h-10 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}
