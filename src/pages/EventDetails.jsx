import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Clock,
  Tag,
  Star,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { EVENTS } from '../data/events'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-lg">Event not found.</p>
          <Button variant="secondary" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    )
  }

  const {
    title, category, date, time, location, city, price, rating,
    reviewCount, organizer, verified, description, highlights = [],
    attendees, tags = [],
  } = event

  const priceLabel = price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`

  const categoryVariant = {
    Technology: 'blue', Workshops: 'purple', Music: 'amber',
    Sports: 'green', Business: 'blue', Art: 'amber', Community: 'green',
  }[category] ?? 'gray'

  const placeholderGradient = {
    Technology: 'from-blue-900/60 to-dark-700',
    Workshops:  'from-purple-900/60 to-dark-700',
    Music:      'from-amber-900/60 to-dark-700',
    Sports:     'from-emerald-900/60 to-dark-700',
    Business:   'from-blue-900/60 to-dark-700',
    Art:        'from-orange-900/60 to-dark-700',
    Community:  'from-teal-900/60 to-dark-700',
  }[category] ?? 'from-dark-600 to-dark-700'

  const placeholderEmoji = {
    Technology: '💻', Workshops: '🛠️', Music: '🎵',
    Sports: '🏃', Business: '💼', Art: '🎨', Community: '🤝',
  }[category] ?? '📅'

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <PageContainer>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero image */}
            <div className={`h-60 sm:h-80 rounded-2xl bg-gradient-to-br ${placeholderGradient} flex items-center justify-center overflow-hidden border border-white/[0.06]`}>
              <span className="text-8xl opacity-20 select-none">{placeholderEmoji}</span>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2">
              <Badge variant={categoryVariant}>{category}</Badge>
              {verified && (
                <Badge variant="green">
                  <ShieldCheck size={11} />
                  Verified Organizer
                </Badge>
              )}
              {tags.map((t) => (
                <Badge key={t} variant="gray">{t}</Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">{title}</h1>

            {/* Meta grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Calendar,  label: 'Date',      value: `${date}${time ? ` · ${time}` : ''}` },
                { icon: MapPin,    label: 'Location',  value: `${location}, ${city}` },
                { icon: Building2, label: 'Organizer', value: organizer },
                { icon: Tag,       label: 'Price',     value: priceLabel },
                ...(attendees !== undefined
                  ? [{ icon: Users, label: 'Attending', value: `${attendees.toLocaleString('en-IN')} people` }]
                  : []),
                ...(rating > 0
                  ? [{ icon: Star, label: 'Rating', value: `${rating.toFixed(1)} / 5  (${reviewCount} reviews)` }]
                  : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <Icon size={15} className="text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h2 className="text-white font-semibold">About this event</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              {highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={15} className="text-brand-blue shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Trust note */}
            {verified && (
              <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-300 leading-relaxed">
                  This organizer has been verified by Evently. You can trust the event information and ticket process.
                </p>
              </div>
            )}
          </div>

          {/* ── Booking sidebar ────────────────────────────────────────── */}
          <div>
            <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-5">
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500">Price per person</p>
                <p className="text-3xl font-extrabold text-white">
                  {price === 0 ? (
                    <span className="gradient-text">Free</span>
                  ) : (
                    <>₹{price.toLocaleString('en-IN')}</>
                  )}
                </p>
              </div>

              <div className="space-y-2.5 text-sm text-gray-400 border-t border-white/[0.06] pt-4">
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="text-emerald-400 font-medium">Open</span>
                </div>
                <div className="flex justify-between">
                  <span>Organizer</span>
                  <span className="text-white text-right max-w-[160px] truncate">{organizer}</span>
                </div>
                {rating > 0 && (
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <Button fullWidth size="lg" onClick={() => navigate('/booking')}>
                Book Now
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600">
                <Clock size={11} />
                Booking details coming soon
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
