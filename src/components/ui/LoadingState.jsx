/**
 * LoadingState — light theme skeleton / spinner
 */
export default function LoadingState({
  message = 'Loading…',
  variant = 'spinner',
  count = 3,
}) {
  if (variant === 'skeleton') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-border rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="h-44 bg-surface-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-surface-muted rounded-full w-3/4" />
              <div className="h-3 bg-surface-muted rounded-full w-1/2" />
              <div className="h-3 bg-surface-muted rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-9 h-9 rounded-full border-2 border-ink border-t-transparent animate-spin" />
      <p className="text-ink-secondary text-sm">{message}</p>
    </div>
  )
}
