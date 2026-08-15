import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Ticket,
  Calendar,
  MapPin,
  Clock,
  BadgeCheck,
  CheckCircle2,
  Trash2,
  ChevronRight,
  QrCode,
} from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import { getBookings } from '../utils/bookings'

/* ─── Category → pastel bg ─────────────────────────────────────────────────── */
const CATEGORY_BG = {
  Technology: 'bg-slate-100',
  Workshops:  'bg-stone-100',
  Music:      'bg-amber-50',
  Sports:     'bg-emerald-50',
  Business:   'bg-sky-50',
  Art:        'bg-orange-50',
  Community:  'bg-teal-50',
}

const CATEGORY_EMOJI = {
  Technology: '💻',
  Workshops:  '🛠️',
  Music:      '🎵',
  Sports:     '🏃',
  Business:   '💼',
  Art:        '🎨',
  Community:  '🤝',
}

/* ─── QR placeholder ───────────────────────────────────────────────────────── */
/**
 * Renders a deterministic 7×7 grid of squares derived from the ticket ID.
 * Purely visual — not a real QR code.
 */
function QrPlaceholder({ ticketId }) {
  // Build a stable bit-array from the ticket ID characters
  const bits = Array.from({ length: 49 }, (_, i) => {
    const charCode = ticketId.charCodeAt(i % ticketId.length)
    return ((charCode >> (i % 8)) & 1) === 1
  })

  return (
    <div
      className="inline-grid gap-[2px] p-2 bg-white border border-border rounded-lg shadow-sm"
      style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
      aria-label="Ticket QR placeholder"
      title={ticketId}
    >
      {bits.map((filled, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] rounded-[1px] ${filled ? 'bg-ink' : 'bg-surface-muted'}`}
        />
      ))}
    </div>
  )
}

/* ─── Single ticket card ───────────────────────────────────────────────────── */
function TicketCard({ booking }) {
  const {
    ticketId, eventId, eventTitle, category,
    date, time, location, city,
    organizer, price, qty, total, verified, bookedAt,
  } = booking

  const heroBg    = CATEGORY_BG[category]    ?? 'bg-surface-muted'
  const heroEmoji = CATEGORY_EMOJI[category] ?? '📅'
  const totalLabel = total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`
  const bookedDate = new Date(bookedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-card">
      {/* Accent top stripe */}
      <div className="h-1 bg-ink w-full" />

      {/* Event image strip */}
      <div className={`h-24 ${heroBg} flex items-center justify-center`}>
        <span className="text-5xl opacity-20 select-none">{heroEmoji}</span>
      </div>

      {/* Main content */}
      <div className="p-5 space-y-4">

        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="bg-surface-muted border border-border text-ink-secondary text-[11px] font-medium px-2 py-0.5 rounded-full">
                {category}
              </span>
              {verified && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
                  <BadgeCheck size={9} />
                  Verified
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-ink leading-snug line-clamp-2">{eventTitle}</h3>
          </div>
          {/* QR placeholder */}
          <div className="shrink-0">
            <QrPlaceholder ticketId={ticketId} />
          </div>
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-ink-secondary">
          <div className="flex items-center gap-2">
            <Calendar size={11} className="text-ink-muted shrink-0" />
            <span>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={11} className="text-ink-muted shrink-0" />
            <span className="truncate">{location}, {city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={11} className="text-ink-muted shrink-0" />
            <span>Booked {bookedDate}</span>
          </div>
        </div>

        {/* Dashed divider (tear line) */}
        <div className="border-t border-dashed border-border" />

        {/* Ticket details */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div>
            <p className="text-ink-muted uppercase tracking-wide font-semibold text-[10px] mb-0.5">Tickets</p>
            <p className="text-ink font-bold">{qty}</p>
          </div>
          <div>
            <p className="text-ink-muted uppercase tracking-wide font-semibold text-[10px] mb-0.5">Total Paid</p>
            <p className="text-ink font-bold">{totalLabel}</p>
          </div>
          <div>
            <p className="text-ink-muted uppercase tracking-wide font-semibold text-[10px] mb-0.5">Status</p>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 size={10} />
              Confirmed
            </span>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-border" />

        {/* Ticket ID + view event */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[10px] text-ink-muted uppercase tracking-wide font-semibold mb-0.5">Reference</p>
            <p className="text-xs font-mono font-bold text-ink tracking-wider">{ticketId}</p>
          </div>
          <button
            onClick={() => window.location.assign(`/events/${eventId}`)}
            className="flex items-center gap-1 text-xs font-medium text-ink-secondary hover:text-ink transition-colors"
          >
            View Event
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── My Tickets page ──────────────────────────────────────────────────────── */

export default function MyTickets() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  // Read from localStorage on mount (and re-read if user returns)
  useEffect(() => {
    setBookings(getBookings())
  }, [])

  const isEmpty = bookings.length === 0

  return (
    <div className="min-h-screen bg-surface-subtle py-10 sm:py-14">
      <PageContainer>

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <SectionHeading
              title="My Tickets"
              subtitle={
                isEmpty
                  ? 'Your booked events will appear here.'
                  : `You have ${bookings.length} confirmed booking${bookings.length !== 1 ? 's' : ''}.`
              }
            />
          </div>
          {!isEmpty && (
            <Button variant="secondary" size="sm" onClick={() => navigate('/explore')}>
              Explore More Events
            </Button>
          )}
        </div>

        {isEmpty ? (
          /* ── Empty state ─────────────────────────────────────────────── */
          <div className="max-w-sm mx-auto">
            <EmptyState
              icon={Ticket}
              title="No tickets yet"
              description="Explore events and book your first experience. Your confirmed tickets will appear here."
              action={{ label: 'Explore Events', onClick: () => navigate('/explore') }}
            />
          </div>
        ) : (
          /* ── Ticket grid ─────────────────────────────────────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookings.map((b) => (
              <TicketCard key={b.ticketId} booking={b} />
            ))}
          </div>
        )}

        {/* Info note */}
        {!isEmpty && (
          <div className="mt-10 flex items-start gap-2.5 max-w-lg mx-auto bg-white border border-border rounded-xl p-4 shadow-card">
            <QrCode size={16} className="text-ink-muted shrink-0 mt-0.5" />
            <p className="text-xs text-ink-secondary leading-relaxed">
              Tickets are stored locally on this device. Present your ticket reference at the venue entry.
              This is a demo — no real booking or payment has been processed.
            </p>
          </div>
        )}

      </PageContainer>
    </div>
  )
}
