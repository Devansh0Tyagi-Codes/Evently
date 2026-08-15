/**
 * ActionButtons — Heart (favorite) and Eye (watched) icon buttons.
 * Self-contained: reads/writes localStorage directly.
 *
 * Props:
 *   eventId   {string}  required
 *   className {string}  optional wrapper class
 */
import { useState } from 'react'
import { Heart, Eye } from 'lucide-react'
import { isFavorite, toggleFavorite, isWatched, toggleWatched } from '../../utils/userPrefs'

export default function ActionButtons({ eventId, className = '' }) {
  const [fav,     setFav]     = useState(() => isFavorite(eventId))
  const [watched, setWatched] = useState(() => isWatched(eventId))

  const handleFav = (e) => {
    e.preventDefault()  // stop Link navigation if inside a card
    e.stopPropagation()
    const next = toggleFavorite(eventId)
    setFav(next.includes(eventId))
  }

  const handleWatch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = toggleWatched(eventId)
    setWatched(next.includes(eventId))
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={handleWatch}
        aria-label={watched ? 'Remove from watched' : 'Mark as watched'}
        title={watched ? 'Remove from watched' : 'Mark as watched'}
        className={[
          'w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-150',
          watched
            ? 'bg-ink text-white border-ink'
            : 'bg-white/90 text-ink-muted border-border hover:border-border-strong hover:text-ink',
        ].join(' ')}
      >
        <Eye size={13} />
      </button>

      <button
        onClick={handleFav}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        title={fav ? 'Remove from favorites' : 'Add to favorites'}
        className={[
          'w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-150',
          fav
            ? 'bg-accent text-white border-accent'
            : 'bg-white/90 text-ink-muted border-border hover:border-border-strong hover:text-ink',
        ].join(' ')}
      >
        <Heart size={13} className={fav ? 'fill-white' : ''} />
      </button>
    </div>
  )
}
