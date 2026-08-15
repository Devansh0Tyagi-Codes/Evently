import { Search } from 'lucide-react'

/**
 * SearchInput — premium light-theme search bar
 */
export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search events, workshops, cities…',
  className = '',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) onSubmit(value)
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={17}
        className="absolute left-4 text-ink-muted pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={[
          'w-full bg-white border border-border rounded-xl',
          'pl-11 pr-4 py-3 text-sm text-ink placeholder-ink-muted',
          'shadow-input transition-all duration-150 outline-none',
          'hover:border-border-strong',
          'focus:border-ink focus:ring-2 focus:ring-ink/10',
        ].join(' ')}
      />
      {value && onSubmit && (
        <button
          onClick={() => onSubmit(value)}
          className="absolute right-2.5 bg-ink text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:bg-ink/80 transition-colors"
        >
          Search
        </button>
      )}
    </div>
  )
}
