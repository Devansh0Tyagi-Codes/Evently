import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Tag,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Building2,
  Timer,
  Minus,
  Plus,
  Info,
  BadgeCheck,
  FileText,
  LocateFixed,
  CircleDollarSign,
  X,
  PartyPopper,
  Ticket,
} from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import Button from '../components/ui/Button'
import { EVENTS } from '../data/events'
import { generateTicketId, saveBooking } from '../utils/bookings'

/* ─── constants ────────────────────────────────────────────────────────────── */

const HERO_BG = {
  Technology: 'bg-slate-100',
  Workshops:  'bg-stone-100',
  Music:      'bg-amber-50',
  Sports:     'bg-emerald-50',
  Business:   'bg-sky-50',
  Art:        'bg-orange-50',
  Community:  'bg-teal-50',
}

const HERO_EMOJI = {
  Technology: '💻',
  Workshops:  '🛠️',
  Music:      '🎵',
  Sports:     '🏃',
  Business:   '💼',
  Art:        '🎨',
  Community:  '🤝',
}

/* ─── helpers ──────────────────────────────────────────────────────────────── */

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function formatPrice(price) {
  return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`
}

/* ─── small reusable pieces ────────────────────────────────────────────────── */

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-surface-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-ink-secondary" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-ink font-medium leading-snug">{value}</p>
      </div>
    </div>
  )
}

function TrustRow({ label, note }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {note && <p className="text-xs text-ink-secondary leading-relaxed mt-0.5">{note}</p>}
      </div>
    </div>
  )
}

/* ─── BookingCard ──────────────────────────────────────────────────────────── */

function BookingCard({ event, qty, setQty, onOpenConfirm }) {
  const { price, organizer, rating, verified } = event
  const priceLabel = formatPrice(price)
  const totalLabel = price === 0 ? 'Free' : `₹${(price * qty).toLocaleString('en-IN')}`

  return (
    <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden">
      {/* Price header */}
      <div className="px-6 pt-6 pb-5 border-b border-border">
        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
          Ticket Price
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-ink">
            {price === 0 ? <span className="text-emerald-600">Free</span> : priceLabel}
          </span>
          {price > 0 && <span className="text-xs text-ink-muted">per person</span>}
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Qty selector */}
        {price > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-lg border border-border bg-surface-muted hover:bg-white hover:border-border-strong flex items-center justify-center transition-all duration-150 disabled:opacity-40"
              >
                <Minus size={13} className="text-ink" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-ink tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                disabled={qty >= 10}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-lg border border-border bg-surface-muted hover:bg-white hover:border-border-strong flex items-center justify-center transition-all duration-150 disabled:opacity-40"
              >
                <Plus size={13} className="text-ink" />
              </button>
              <span className="text-xs text-ink-secondary">Max 10</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-ink-secondary">Availability</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Open
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-secondary">Organizer</span>
            <span className="text-xs font-medium text-ink text-right max-w-[160px] truncate">{organizer}</span>
          </div>
          {rating > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-ink-secondary">Rating</span>
              <span className="font-semibold text-ink flex items-center gap-1">
                <Star size={12} className="fill-amber-500 text-amber-500" />
                {rating.toFixed(1)}
              </span>
            </div>
          )}
          {verified && (
            <div className="flex justify-between items-center">
              <span className="text-ink-secondary">Verification</span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                <BadgeCheck size={12} />
                Verified
              </span>
            </div>
          )}
          {price > 0 && (
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="font-semibold text-ink">Total</span>
              <span className="font-extrabold text-ink text-base">{totalLabel}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Button fullWidth size="lg" onClick={onOpenConfirm}>
          Book Ticket{qty > 1 ? 's' : ''}
        </Button>

        {/* Micro-copy */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <CircleDollarSign size={12} className="text-accent shrink-0" />
            <span>{price === 0 ? 'Free entry — no payment required' : 'Secure payment at next step'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <LocateFixed size={12} className="shrink-0" />
            <span>Exact venue details sent on confirmation</span>
          </div>
          {verified && (
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
              <span>Organizer verified by Evently</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Booking Confirmation Modal ───────────────────────────────────────────── */

function BookingModal({ event, qty, onConfirm, onClose }) {
  const { title, date, time, location, city, price, verified } = event
  const total = price * qty
  const totalLabel = price === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Confirm booking"
    >
      {/* Dim overlay */}
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-bold text-ink">Confirm Booking</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg hover:bg-surface-muted flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-ink-secondary" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Event summary */}
          <div className="bg-surface-subtle border border-border rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-ink leading-snug">{title}</p>
            <div className="space-y-1.5 text-xs text-ink-secondary">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-ink-muted shrink-0" />
                <span>{date}{time ? ` · ${time}` : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-ink-muted shrink-0" />
                <span>{location}, {city}</span>
              </div>
            </div>
            {verified && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <BadgeCheck size={11} />
                Verified event
              </div>
            )}
          </div>

          {/* Order lines */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-secondary">
              <span>Price per ticket</span>
              <span>{price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}</span>
            </div>
            <div className="flex justify-between text-ink-secondary">
              <span>Quantity</span>
              <span>{qty} ticket{qty > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between font-bold text-ink text-base pt-2 border-t border-border">
              <span>Total</span>
              <span>{totalLabel}</span>
            </div>
          </div>

          {price > 0 && (
            <p className="text-[11px] text-ink-muted leading-relaxed bg-orange-50 border border-orange-100 rounded-lg px-3 py-2.5">
              This is a demo — no real payment will be charged. Your ticket will be saved locally for demonstration purposes.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 space-y-3">
          <Button fullWidth size="lg" onClick={onConfirm}>
            Confirm Booking
          </Button>
          <Button fullWidth variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Booking Success Modal ────────────────────────────────────────────────── */

function BookingSuccess({ ticketId, eventTitle, onViewTickets, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        <div className="px-6 py-8 flex flex-col items-center text-center gap-5">
          {/* Success icon */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <PartyPopper size={28} className="text-emerald-600" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-ink">Booking Confirmed!</h2>
            <p className="text-ink-secondary text-sm leading-relaxed max-w-xs">
              Your ticket for <span className="font-semibold text-ink">{eventTitle}</span> has been booked successfully.
            </p>
          </div>

          {/* Ticket ID */}
          <div className="w-full bg-surface-subtle border border-border rounded-xl px-4 py-3.5">
            <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Ticket Reference
            </p>
            <p className="text-base font-bold text-ink tracking-wider font-mono">{ticketId}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 w-full">
            <CheckCircle2 size={13} className="shrink-0" />
            <span>Saved to your tickets. View anytime from My Tickets.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-1">
            <Button fullWidth size="lg" onClick={onViewTickets}>
              <Ticket size={15} />
              View My Tickets
            </Button>
            <Button fullWidth variant="secondary" onClick={onClose}>
              Continue Browsing
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main EventDetails page ───────────────────────────────────────────────── */

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [qty,           setQty]           = useState(1)
  const [modalOpen,     setModalOpen]     = useState(false)
  const [successTicket, setSuccessTicket] = useState(null) // ticketId string when confirmed

  const event = EVENTS.find((e) => e.id === id)

  /* ── not found ─────────────────────────────────────────────────────────── */
  if (!event) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-5 text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-surface-muted border border-border flex items-center justify-center">
          <Calendar size={24} className="text-ink-muted" />
        </div>
        <div>
          <p className="text-ink font-semibold text-base mb-1">Event not found</p>
          <p className="text-ink-secondary text-sm">This event may have been removed or the link is incorrect.</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/explore')}>
          Back to Explore
        </Button>
      </div>
    )
  }

  const {
    title, category, date, time, location, city, price,
    rating, reviewCount, organizer, organizerCategory,
    duration, verified, description, highlights = [], tags = [], attendees,
  } = event

  const priceLabel = formatPrice(price)
  const heroBg    = HERO_BG[category]    ?? 'bg-surface-muted'
  const heroEmoji = HERO_EMOJI[category] ?? '📅'

  /* ── booking handlers ──────────────────────────────────────────────────── */
  const handleConfirm = () => {
    const ticketId = generateTicketId()
    saveBooking({
      ticketId,
      eventId:    id,
      eventTitle: title,
      category,
      date,
      time,
      location,
      city,
      organizer,
      price,
      qty,
      total:    price * qty,
      verified,
      bookedAt: new Date().toISOString(),
    })
    setModalOpen(false)
    setSuccessTicket(ticketId)
  }

  /* ── render ────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface-subtle page-enter">

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <PageContainer className="py-3">
          <nav className="flex items-center gap-1.5 text-xs text-ink-secondary flex-wrap">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight size={12} className="text-ink-muted" />
            <Link to="/explore" className="hover:text-ink transition-colors">Explore</Link>
            <ChevronRight size={12} className="text-ink-muted" />
            <Link
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="hover:text-ink transition-colors"
            >
              {category}
            </Link>
            <ChevronRight size={12} className="text-ink-muted" />
            <span className="text-ink font-medium truncate max-w-[200px]">{title}</span>
          </nav>
        </PageContainer>
      </div>

      <PageContainer className="py-8 sm:py-12">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink transition-colors mb-7 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
          Back
        </button>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 xl:gap-12 items-start">

          {/* ── Left column ────────────────────────────────────────────── */}
          <div className="min-w-0 space-y-7">

            {/* Hero */}
            <div
              className={`relative h-56 sm:h-72 md:h-80 rounded-2xl ${heroBg} border border-border overflow-hidden flex items-center justify-center`}
            >
              <span className="text-[96px] sm:text-[120px] opacity-[0.15] select-none leading-none">{heroEmoji}</span>
              {verified && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  <BadgeCheck size={12} />
                  Verified Event
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-white border border-border text-ink text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  {category}
                </span>
              </div>
            </div>

            {/* Title block */}
            <div className="space-y-3">
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="bg-surface-muted border border-border text-ink-secondary text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-ink leading-tight tracking-tight">{title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {rating > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          className={s <= Math.round(rating) ? 'text-amber-500 fill-amber-500' : 'text-border fill-border'}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
                    <span className="text-ink-secondary">({reviewCount} reviews)</span>
                  </div>
                )}
                {attendees !== undefined && (
                  <div className="flex items-center gap-1.5 text-ink-secondary">
                    <Users size={13} className="text-ink-muted" />
                    <span>{attendees.toLocaleString('en-IN')} attending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info grid */}
            <div className="bg-white border border-border rounded-2xl shadow-card overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border">
                <p className="text-xs font-semibold text-ink uppercase tracking-wider">Event Information</p>
              </div>
              <div className="px-5">
                <MetaItem icon={Calendar}  label="Date"               value={date} />
                <MetaItem icon={Clock}     label="Time"               value={time || 'See event details'} />
                {duration && <MetaItem icon={Timer} label="Duration" value={duration} />}
                <MetaItem icon={MapPin}    label="Location"           value={`${location}, ${city}`} />
                <MetaItem icon={Building2} label="Organizer"          value={organizer} />
                <MetaItem icon={Tag}       label="Category"           value={category} />
                {attendees !== undefined && (
                  <MetaItem icon={Users}   label="Expected Attendees" value={`${attendees.toLocaleString('en-IN')} people`} />
                )}
              </div>
            </div>

            {/* About + Highlights */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-card space-y-5">
              <h2 className="text-base font-bold text-ink">About this event</h2>
              <p className="text-ink-secondary text-sm leading-relaxed">{description}</p>
              {highlights.length > 0 && (
                <div className="space-y-3 pt-1">
                  <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">What to expect</p>
                  <ul className="space-y-2.5">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-ink leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Organizer */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
              <h2 className="text-base font-bold text-ink mb-5">About the organizer</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center shrink-0 select-none">
                  <span className="text-white text-sm font-bold">{getInitials(organizer)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-ink">{organizer}</p>
                    {verified && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        <BadgeCheck size={10} />
                        Verified
                      </span>
                    )}
                  </div>
                  {organizerCategory && <p className="text-xs text-ink-secondary">{organizerCategory}</p>}
                  {rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={11} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-semibold text-ink">{rating.toFixed(1)}</span>
                      <span className="text-xs text-ink-muted">organizer rating</span>
                    </div>
                  )}
                </div>
              </div>
              {verified && (
                <p className="text-xs text-ink-secondary leading-relaxed mt-4 pt-4 border-t border-border">
                  This organizer has been reviewed by Evently. Their identity, contact information, and event details have been confirmed.
                </p>
              )}
            </div>

            {/* Trust */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck size={16} className="text-ink" />
                <h2 className="text-base font-bold text-ink">Trust &amp; Verification</h2>
              </div>
              <div className="space-y-4">
                {verified ? (
                  <>
                    <TrustRow label="Verified Organizer" note="The organizer's identity and contact details have been confirmed by Evently." />
                    <TrustRow label="Event details confirmed" note="Date, time, venue and pricing match the organizer's official event page." />
                    <TrustRow label="Venue information available" note="Location details are accurate and accessible for attendees." />
                    <TrustRow label="Clear ticket pricing" note={`Tickets are listed at ${priceLabel} with no hidden fees.`} />
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
                      <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Organizer verification pending</p>
                        <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
                          This organizer has not completed Evently's verification. Event information is self-reported. Please verify independently before booking.
                        </p>
                      </div>
                    </div>
                    <TrustRow label="Event details listed" note="Information is provided by the organizer and has not been independently verified." />
                    <TrustRow label="Venue information available" note="Location details are as provided by the organizer." />
                    <TrustRow label="Pricing listed" note={`Entry is listed at ${priceLabel}.`} />
                  </>
                )}
              </div>
              <div className="mt-5 pt-4 border-t border-border flex items-start gap-2">
                <FileText size={12} className="text-ink-muted shrink-0 mt-0.5" />
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Evently verification confirms organizer identity and listed event details only. We do not provide government certification or legal guarantees.
                </p>
              </div>
            </div>

            {/* Mobile booking card */}
            <div className="lg:hidden">
              <BookingCard
                event={event}
                qty={qty}
                setQty={setQty}
                onOpenConfirm={() => setModalOpen(true)}
              />
            </div>
          </div>
          {/* end left */}

          {/* ── Right column (desktop) ─────────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingCard
                event={event}
                qty={qty}
                setQty={setQty}
                onOpenConfirm={() => setModalOpen(true)}
              />
            </div>
          </div>

        </div>
      </PageContainer>

      {/* ── Booking confirmation modal ────────────────────────────────────── */}
      {modalOpen && (
        <BookingModal
          event={event}
          qty={qty}
          onConfirm={handleConfirm}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* ── Success modal ─────────────────────────────────────────────────── */}
      {successTicket && (
        <BookingSuccess
          ticketId={successTicket}
          eventTitle={title}
          onViewTickets={() => navigate('/my-tickets')}
          onClose={() => setSuccessTicket(null)}
        />
      )}
    </div>
  )
}
