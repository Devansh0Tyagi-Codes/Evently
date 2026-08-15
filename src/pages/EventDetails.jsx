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
import { EVENTS } from '../data/events'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-ink-secondary text-base">Event not found.</p>
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

  /* Category → placeholder bg */
  const placeholderBg = {
    Technology: 'bg-slate-100',
    Workshops:  'bg-stone-100',
    Music:      'bg-amber-50',
    Sports:     'bg-emerald-50',
    Business:   'bg-blue-50',
    Art:        'bg-orange-50',
    Community:  'bg-teal-50',
  }[category] ?? 'bg-surface-muted'

  const placeholderEmoji = {
    Technology: '💻', Workshops: '🛠️', Music: '🎵',
    Sports: '🏃', Business: '💼', Art: '🎨', Community: '🤝',
  }[category] ?? '📅'

  return (
    <div className="min-h-screen bg-surface-subtle py-10 sm:py-16">
      <PageContainer>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-ink-secondary hover:text-ink text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main content ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero image */}
            <div
              className={`h-60 sm:h-80 rounded-2xl ${placeholderBg} flex items-center justify-center overflow-hidden border border-border`}
            >
              <span className="text-8xl opacity-20 select-none">{placeholderEmoji}</span>
            </div>

            {/* Category + verified + tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center bg-surface-muted text-ink text-xs font-semibold px-3 py-1 rounded-full border border-border">
                {category}
              </span>
              {verified && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck size={11} />
                  Verified Organizer
                </span>
              )}
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center bg-surface-muted text-ink-secondary text-xs font-medium px-3 py-1 rounded-full border border-border">
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-ink leading-snug tracking-tight">{title}</h1>

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
                <div
                  key={label}
                  className="bg-white border border-border rounded-xl p-4 flex items-start gap-3 shadow-card"
                >
                  <Icon size={15} className="text-ink-muted mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-ink-muted mb-0.5 uppercase tracking-wide font-medium">{label}</p>
                    <p className="text-sm text-ink font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description + highlights */}
            <div className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-card">
              <h2 className="text-ink font-semibold text-base">About this event</h2>
              <p className="text-ink-secondary text-sm leading-relaxed">{description}</p>
              {highlights.length > 0 && (
                <ul className="mt-2 space-y-2.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Verified trust note */}
            {verified && (
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3.5">
                <ShieldCheck size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  This organizer has been verified by Evently. You can trust the event information and ticket process.
                </p>
              </div>
            )}
          </div>

          {/* ── Booking sidebar ───────────────────────────────────────── */}
          <div>
            <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 space-y-5 shadow-card">
              <div className="space-y-0.5">
                <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">Price per person</p>
                <p className="text-3xl font-extrabold text-ink tracking-tight">
                  {price === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    <>₹{price.toLocaleString('en-IN')}</>
                  )}
                </p>
              </div>

              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Availability</span>
                  <span className="text-emerald-600 font-semibold">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Organizer</span>
                  <span className="text-ink font-medium text-right max-w-[160px] truncate">{organizer}</span>
                </div>
                {rating > 0 && (
                  <div className="flex justify-between">
                    <span className="text-ink-secondary">Rating</span>
                    <span className="text-ink font-semibold flex items-center gap-1">
                      <Star size={12} className="fill-amber-500 text-amber-500" />
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              <Button fullWidth size="lg" onClick={() => navigate('/booking')}>
                Book Now
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
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
