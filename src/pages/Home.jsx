import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Star, LayoutGrid, MapPin, Zap } from 'lucide-react'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EventCard from '../components/ui/EventCard'
import { EVENTS, FEATURED_IDS, UPCOMING_IDS } from '../data/events'

/* ── Categories ────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: 'Technology', emoji: '💻' },
  { label: 'Workshops',  emoji: '🛠️' },
  { label: 'Music',      emoji: '🎵' },
  { label: 'Sports',     emoji: '🏃' },
  { label: 'Business',   emoji: '💼' },
  { label: 'Art',        emoji: '🎨' },
  { label: 'Community',  emoji: '🤝' },
]

/* ── Trust pillars ─────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Verified Organizers',
    body: 'Every organizer goes through an identity and trust verification process before listing events.',
  },
  {
    icon: Star,
    title: 'Honest Reviews',
    body: 'Ratings and reviews come only from attendees who actually booked through Evently.',
  },
  {
    icon: LayoutGrid,
    title: 'Clear Event Info',
    body: 'Every listing shows real prices, exact location, organizer contact, and transparent ticket policies.',
  },
  {
    icon: MapPin,
    title: 'Local & Relevant',
    body: 'Discover events in your city — not a feed of irrelevant listings from across the globe.',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const featuredEvents = FEATURED_IDS.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean)
  const upcomingEvents = UPCOMING_IDS.map((id) => EVENTS.find((e) => e.id === id)).filter(Boolean)

  const handleSearch = (val) => {
    const q = val.trim()
    navigate(q ? `/explore?search=${encodeURIComponent(q)}` : '/explore')
  }

  const handleCategory = (label) => {
    navigate(`/explore?category=${encodeURIComponent(label)}`)
  }

  return (
    <div className="flex flex-col page-enter">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-surface-subtle border-b border-border">
        <PageContainer className="py-20 sm:py-28">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

            {/* Label */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Event Discovery Platform for India
              </span>
            </div>

            {/* Headline */}
            <div className="animate-slide-up space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.06] tracking-tight text-ink">
                Discover events worth
                <br />
                <span className="text-accent">experiencing.</span>
              </h1>
              <p className="text-ink-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                Find workshops, experiences and events happening around you — with verified organizers and clear ticket information.
              </p>
            </div>

            {/* Search */}
            <div className="w-full max-w-xl animate-slide-up">
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSubmit={handleSearch}
                placeholder="Search events, cities, organizers…"
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up">
              <Button size="lg" onClick={() => navigate('/explore')}>
                Explore Events
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/explore')}>
                Browse Categories
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Category chips ────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-white py-6">
        <PageContainer>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => handleCategory(label)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border text-ink-secondary hover:text-ink hover:border-border-strong hover:bg-surface-muted text-sm font-medium transition-all duration-150"
              >
                <span className="text-base leading-none">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Featured Events ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <PageContainer>
          <div className="flex items-end justify-between mb-9 gap-4 flex-wrap">
            <SectionHeading
              title="Featured Events"
              subtitle="Handpicked experiences from verified organizers across India."
            />
            <Button variant="ghost" size="sm" onClick={() => navigate('/explore')}>
              View all <ArrowRight size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Trust section ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-surface-subtle border-y border-border">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionHeading
              title="Every event comes with clear organizer and ticket information."
              subtitle="We built trust into the platform from day one."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-muted border border-border flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-ink" />
                </div>
                <div className="space-y-1">
                  <p className="text-ink font-semibold text-sm">{title}</p>
                  <p className="text-ink-secondary text-xs leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Upcoming Near You ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <PageContainer>
          <div className="flex items-end justify-between mb-9 gap-4 flex-wrap">
            <SectionHeading
              title="Upcoming Near You"
              subtitle="Events happening soon in Noida, Delhi, Gurgaon and Ghaziabad."
            />
            <Button variant="ghost" size="sm" onClick={() => navigate('/explore')}>
              Browse all <ArrowRight size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-surface-subtle border-t border-border">
        <PageContainer>
          <div className="bg-ink rounded-2xl p-10 sm:p-16 text-center">
            <div className="flex flex-col items-center gap-5 max-w-lg mx-auto">
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Zap size={11} fill="currentColor" />
                Join 18,000+ attendees
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                Ready to find your next experience?
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Browse hundreds of events, workshops and meetups happening across Indian cities — all in one place.
              </p>
              <Button variant="accent" size="lg" onClick={() => navigate('/explore')}>
                Start Exploring
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-white">
        <PageContainer className="py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-ink flex items-center justify-center">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold text-ink">Evently</span>
              <span className="text-ink-muted text-xs ml-1">Discover. Verify. Experience.</span>
            </div>
            <p className="text-xs text-ink-muted">© 2026 Evently. All rights reserved.</p>
          </div>
        </PageContainer>
      </footer>

    </div>
  )
}
