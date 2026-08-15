import { Calendar, MapPin, Star, ShieldCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from './Badge'

/**
 * EventCard — premium event summary card.
 *
 * Accepts the full Event shape from src/data/events.js:
 * { id, title, category, image, date, time, location, city,
 *   price, rating, reviewCount, organizer, verified, tags[] }
 */
export default function EventCard({ event = {} }) {
  const {
    id = '#',
    title = 'Untitled Event',
    category = '',
    image = null,
    date = 'TBA',
    time = '',
    location = 'TBA',
    price = 0,
    rating = 0,
    reviewCount = 0,
    organizer = '',
    verified = false,
  } = event

  const priceLabel = price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`
  const ratingDisplay = rating > 0 ? rating.toFixed(1) : null

  /* Category → accent colour mapping */
  const categoryVariant = {
    Technology: 'blue',
    Workshops: 'purple',
    Music: 'amber',
    Sports: 'green',
    Business: 'blue',
    Art: 'amber',
    Community: 'green',
  }[category] ?? 'gray'

  /* Category → gradient for the image placeholder */
  const placeholderGradient = {
    Technology: 'from-blue-900/60 to-dark-700',
    Workshops: 'from-purple-900/60 to-dark-700',
    Music: 'from-amber-900/60 to-dark-700',
    Sports: 'from-emerald-900/60 to-dark-700',
    Business: 'from-blue-900/60 to-dark-700',
    Art: 'from-orange-900/60 to-dark-700',
    Community: 'from-teal-900/60 to-dark-700',
  }[category] ?? 'from-dark-600 to-dark-700'

  /* Category → icon emoji for placeholder */
  const placeholderEmoji = {
    Technology: '💻',
    Workshops: '🛠️',
    Music: '🎵',
    Sports: '🏃',
    Business: '💼',
    Art: '🎨',
    Community: '🤝',
  }[category] ?? '📅'

  return (
    <Link
      to={`/events/${id}`}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col border border-white/[0.06] hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      {/* ── Image area ─────────────────────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${placeholderGradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
          >
            <span className="text-5xl opacity-30 select-none">{placeholderEmoji}</span>
          </div>
        )}

        {/* Top-left: category */}
        <div className="absolute top-3 left-3">
          <Badge variant={categoryVariant} size="sm">{category}</Badge>
        </div>

        {/* Top-right: verified */}
        {verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="green" size="sm">
              <ShieldCheck size={10} />
              Verified
            </Badge>
          </div>
        )}

        {/* Bottom-right: price pill */}
        <div className="absolute bottom-3 right-3">
          <span
            className={[
              'text-xs font-bold px-2.5 py-1 rounded-lg border backdrop-blur-sm',
              price === 0
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-dark-900/70 text-white border-white/10',
            ].join(' ')}
          >
            {priceLabel}
          </span>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-white font-semibold text-[15px] leading-snug group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Meta — date + location */}
        <div className="flex flex-col gap-1.5 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-brand-blue shrink-0" />
            <span>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-brand-purple shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Organizer */}
        {organizer && (
          <p className="text-xs text-gray-500 truncate">by {organizer}</p>
        )}

        {/* ── Footer row ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          {/* Rating */}
          {ratingDisplay ? (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-white">{ratingDisplay}</span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
          ) : (
            <span className="text-xs text-gray-600">No reviews yet</span>
          )}

          {/* View details CTA */}
          <span className="flex items-center gap-1 text-xs font-medium text-brand-blue group-hover:gap-1.5 transition-all duration-200">
            View details
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  )
}
