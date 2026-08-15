import { Search } from 'lucide-react'

/**
 * SearchInput — prominent search bar with icon
 *
 * Props: value, onChange, onSubmit, placeholder, className
 */
export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search events, workshops, locations…',
  className = '',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) onSubmit(value)
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={18}
        className="absolute left-4 text-gray-500 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={[
          'w-full bg-dark-600/80 border border-white/10 rounded-2xl',
          'pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500',
          'transition-all duration-200 outline-none',
          'hover:border-white/20 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30',
          'backdrop-blur-sm',
        ].join(' ')}
      />
      {value && onSubmit && (
        <button
          onClick={() => onSubmit(value)}
          className="absolute right-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-semibold px-4 py-1.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      )}
    </div>
  )
}
