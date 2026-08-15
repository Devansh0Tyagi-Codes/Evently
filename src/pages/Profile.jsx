import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  User,
  Heart,
  Ticket,
  Eye,
  Calendar,
  MapPin,
  Clock,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Star,
  QrCode,
} from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import EventCard from '../components/ui/EventCard'
import { getBookings } from '../utils/bookings'
import { getFavorites, getWatched } from '../utils/userPrefs'
import { EVENTS } from '../data/events'

/* ─── Mock user profile ─────────────────────────────────────────────────────
   No auth is implemented — this is a demo profile with local data.
   ─────────────────────────────────────────────────────────────────────────── */
const MOCK_USER = {
  name:  'Rahul Sharma',
  email: 'rahul@example.com',
  bio:   'Event enthusiast based in Delhi. Loves tech meetups, live music, and community events.',
  joinedYear: 2026,
}

/* ─── Section wrapper ───────────────────────────────────────────────────────── */
function Section({ id, title, count, children }) {
  return (
    <section id={id} className="space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        {count > 0 && (
          <span className="bg-surface-muted border border-border text-ink-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

/* ─── Compact ticket row used inside Profile ────────────────────────────────── */

const TICKET_BG = {
  Technology: 'bg-slate-100', Workshops: 'bg-stone-100', Music: 'bg-amber-50',
  Sports: 'bg-emerald-50',    Business:  'bg-stone-50',   Art:   'bg-orange-50',
  Community: 'bg-teal-50',
}
const TICKET_EMOJI = {
  Technology: '💻', Workshops: '🛠️', Music: '🎵',
  Sports: '🏃',     Business:  '💼', Art:   '🎨', Community: '🤝',
}

function QrPlaceholder({ ticketId }) {
  const bits = Array.from({ length: 49 }, (_, i) => {
    const charCode = ticketId.charCodeAt(i % ticketId.length)
    return ((charCode >> (i % 8)) & 1) === 1
  })
  return (
    <div
      className="inline-grid gap-[2px] p-1.5 bg-white border border-border rounded-md"
      style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
      aria-label="Ticket QR placeholder"
    >
      {bits.map((filled, i) => (
        <div key={i} className={`w-[5px] h-[5px] rounded-[1px] ${filled ? 'bg-ink' : 'bg-surface-muted'}`} />
      ))}
    </div>
  )
}

function ProfileTicketCard({ booking }) {
  const { ticketId, eventId, eventTitle, category, date, time, location, city, total, qty, verified } = booking
  const bg    = TICKET_BG[category]    ?? 'bg-surface-muted'
  const emoji = TICKET_EMOJI[category] ?? '📅'
  const totalLabel = total === 0 ? 'Free' : `₹${total.toLocaleString('en-IN')}`
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-card flex">
      {/* Left colour strip */}
      <div className={`w-14 shrink-0 ${bg} flex items-center justify-center`}>
        <span className="text-2xl opacity-30 select-none">{emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 p-4 flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold text-ink-muted bg-surface-muted border border-border px-2 py-0.5 rounded-full uppercase tracking-wide">
              {category}
            </span>
            {verified && (
              <span className="inline-flex items-center gap-1 text-emerald-700 text-[10px] font-semibold">
                <BadgeCheck size={9} /> Verified
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-ink leading-snug line-clamp-1">{eventTitle}</p>
          <div className="flex items-center gap-3 text-[11px] text-ink-secondary flex-wrap">
            <span className="flex items-center gap-1"><Calendar size={10} />{date}</span>
            <span className="flex items-center gap-1"><MapPin size={10} />{city}</span>
          </div>
          <p className="text-[11px] text-ink-muted font-mono">{ticketId} · {qty} ticket{qty > 1 ? 's' : ''} · {totalLabel}</p>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <QrPlaceholder ticketId={ticketId} />
          <Link
            to={`/events/${eventId}`}
            className="text-[11px] text-ink-secondary hover:text-ink flex items-center gap-0.5 transition-colors"
          >
            View <ChevronRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Tab definitions ───────────────────────────────────────────────────────── */
const TABS = [
  { id: 'favorites', label: 'Favorites',  icon: Heart  },
  { id: 'tickets',   label: 'My Tickets', icon: Ticket },
  { id: 'watched',   label: 'Watched',    icon: Eye    },
]

/* ─── Profile page ──────────────────────────────────────────────────────────── */
export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('favorites')
  const [bookings,   setBookings]  = useState([])
  const [favIds,     setFavIds]    = useState([])
  const [watchedIds, setWatchedIds] = useState([])

  useEffect(() => {
    setBookings(getBookings())
    setFavIds(getFavorites())
    setWatchedIds(getWatched())
  }, [])

  // Reload prefs when tab changes (user might have toggled on another page)
  const handleTab = (tab) => {
    setActiveTab(tab)
    setFavIds(getFavorites())
    setWatchedIds(getWatched())
    setBookings(getBookings())
  }

  const favEvents     = favIds.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean)
  const watchedEvents = watchedIds.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean)

  const counts = {
    favorites: favEvents.length,
    tickets:   bookings.length,
    watched:   watchedEvents.length,
  }

  const initials = MOCK_USER.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

  return (
    <div className="min-h-screen bg-surface-subtle">

      {/* ── Profile header ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border">
        <PageContainer className="py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center shrink-0 select-none">
              <span className="text-white text-xl font-bold">{initials}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-ink tracking-tight">{MOCK_USER.name}</h1>
              <p className="text-sm text-ink-secondary mt-0.5">{MOCK_USER.email}</p>
              <p className="text-sm text-ink-secondary leading-relaxed mt-2 max-w-lg">{MOCK_USER.bio}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 sm:gap-6 shrink-0">
              {[
                { label: 'Tickets',   value: counts.tickets   },
                { label: 'Favorites', value: counts.favorites },
                { label: 'Watched',   value: counts.watched   },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-extrabold text-ink">{value}</p>
                  <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <PageContainer>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTab(id)}
                className={[
                  'relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 shrink-0',
                  activeTab === id
                    ? 'text-ink'
                    : 'text-ink-secondary hover:text-ink',
                ].join(' ')}
              >
                <Icon size={14} />
                {label}
                {counts[id] > 0 && (
                  <span className={[
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                    activeTab === id
                      ? 'bg-ink text-white'
                      : 'bg-surface-muted text-ink-secondary',
                  ].join(' ')}>
                    {counts[id]}
                  </span>
                )}
                {activeTab === id && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        </PageContainer>
      </div>

      {/* ── Tab content ──────────────────────────────────────────────────── */}
      <PageContainer className="py-8 sm:py-10">

        {/* FAVORITES */}
        {activeTab === 'favorites' && (
          <Section id="favorites" title="Favorites" count={favEvents.length}>
            {favEvents.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="No favorites yet"
                description="Tap the heart icon on any event card to save it here. Your favorites persist between sessions."
                action={{ label: 'Explore Events', onClick: () => navigate('/explore') }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </Section>
        )}

        {/* MY TICKETS */}
        {activeTab === 'tickets' && (
          <Section id="tickets" title="My Tickets" count={bookings.length}>
            {bookings.length === 0 ? (
              <EmptyState
                icon={Ticket}
                title="No tickets yet"
                description="Book an event and your confirmed tickets will appear here."
                action={{ label: 'Explore Events', onClick: () => navigate('/explore') }}
              />
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <ProfileTicketCard key={b.ticketId} booking={b} />
                ))}
                <div className="pt-2 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/my-tickets')}>
                    View full ticket page <ArrowRight size={13} />
                  </Button>
                </div>
              </div>
            )}
          </Section>
        )}

        {/* WATCHED */}
        {activeTab === 'watched' && (
          <Section id="watched" title="Watched" count={watchedEvents.length}>
            {watchedEvents.length === 0 ? (
              <EmptyState
                icon={Eye}
                title="Nothing watched yet"
                description="Tap the eye icon on any event card to mark it as watched. Great for keeping track of events you've attended or want to remember."
                action={{ label: 'Explore Events', onClick: () => navigate('/explore') }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {watchedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </Section>
        )}

      </PageContainer>
    </div>
  )
}
