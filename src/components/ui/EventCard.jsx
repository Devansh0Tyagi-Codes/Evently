import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Badge from './Badge'

/**
 * EventCard — base card for displaying an event summary
 *
 * Props:
 *   event: {
 *     id, title, category, date, location, attendees,
 *     price, image, verified, tags[]
 *   }
 */
export default function EventCard({ event = {} }) {
  const {
    id = '#',
    title = 'Event Title',
    category = 'Workshop',
    date = 'TBA',
    location = 'TBA',
    attendees,
    price,
    image,
    verified = false,
    tags = [],
  } = event

  return (
    <Link
      to={`/events/${id}`}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      {/* Image */}
      <div className="relative h-44 bg-dark-600 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center">
            <Calendar size={36} className="text-dark-400" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="blue" size="sm">{category}</Badge>
        </div>

        {/* Verified badge */}
        {verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="green" size="sm">✓ Verified</Badge>
          </div>
        )}

        {/* Price overlay */}
        {price !== undefined && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-dark-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="gray" size="sm">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-white font-semibold text-base leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-gray-400 mt-auto">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-brand-blue shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-brand-purple shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          {attendees !== undefined && (
            <div className="flex items-center gap-2">
              <Users size={13} className="text-gray-500 shrink-0" />
              <span>{attendees} attending</span>
            </div>
          )}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-1">
          <span className="text-xs text-gray-500">View details</span>
          <ArrowRight
            size={14}
            className="text-brand-blue group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  )
}
