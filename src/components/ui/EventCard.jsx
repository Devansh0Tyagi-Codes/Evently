import { Calendar, MapPin, Star, ShieldCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * EventCard — premium light-theme event card.
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

  /* Category → light pastel background for placeholder */
  const placeholderBg = {
    Technology: 'bg-slate-100',
    Workshops:  'bg-stone-100',
    Music:      'bg-amber-50',
    Sports:     'bg-emerald-50',
    Business:   'bg-stone-50',
    Art:        'bg-orange-50',
    Community:  'bg-teal-50',
  }[category] ?? 'bg-surface-muted'

  const placeholderEmoji = {
    Technology: '💻',
    Workshops:  '🛠️',
    Music:      '🎵',
    Sports:     '🏃',
    Business:   '💼',
    Art:        '🎨',
    Community:  '🤝',
  }[category] ?? '📅'

  return (
    <Link
      to={`/events/${id}`}
      className="group bg-white border border-border rounded-2xl overflow-hidden flex flex-col shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
    >
      {/* ── Image ─────────────────────────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
          />
        ) : (
          <div
            className={`w-full h-full ${placeholderBg} flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-400`}
          >
            <span className="text-5xl opacity-40 select-none">{placeholderEmoji}</span>
          </div>
        )}

        {/* Category label — top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-ink text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border shadow-sm">
            {category}
          </span>
        </div>

        {/* Verified badge — top right */}
        {verified && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
              <ShieldCheck size={10} />
              Verified
            </span>
          </div>
        )}

        {/* Price — bottom right */}
        <div className="absolute bottom-3 right-3">
          <span
            className={[
              'text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm',
              price === 0
                ? 'bg-white/90 text-emerald-700 border-emerald-200'
                : 'bg-white/90 text-ink border-border',
            ].join(' ')}
          >
            {priceLabel}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">

        {/* Title */}
        <h3 className="text-ink font-semibold text-[15px] leading-snug group-hover:text-ink/70 transition-colors duration-150 line-clamp-2">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-ink-secondary">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-ink-muted shrink-0" />
            <span>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-ink-muted shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Organizer */}
        {organizer && (
          <p className="text-xs text-ink-muted truncate">by {organizer}</p>
        )}

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          {ratingDisplay ? (
            <div className="flex items-center gap-1">
              <Star size={11} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-semibold text-ink">{ratingDisplay}</span>
              <span className="text-xs text-ink-muted">({reviewCount})</span>
            </div>
          ) : (
            <span className="text-xs text-ink-muted">No reviews yet</span>
          )}

          <span className="flex items-center gap-1 text-xs font-medium text-ink-secondary group-hover:text-ink group-hover:gap-1.5 transition-all duration-150">
            View details
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </span>
        </div>
      </div>
    </Link>
  )
}
