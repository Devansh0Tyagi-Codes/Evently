import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  LayoutGrid,
  MapPin,
  Star,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EventCard from '../components/ui/EventCard'
import { EVENTS, FEATURED_IDS, UPCOMING_IDS } from '../data/events'

/* ── Category data ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: 'Technology', emoji: '💻', variant: 'blue' },
  { label: 'Workshops',  emoji: '🛠️', variant: 'purple' },
  { label: 'Music',      emoji: '🎵', variant: 'amber' },
  { label: 'Sports',     emoji: '🏃', variant: 'green' },
  { label: 'Business',   emoji: '💼', variant: 'blue' },
  { label: 'Art',        emoji: '🎨', variant: 'amber' },
  { label: 'Community',  emoji: '🤝', variant: 'green' },
]

/* ── Trust pillars ─────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Verified Organizers',
    body: 'Every organizer goes through an identity and trust verification process before listing events.',
    color: 'text-emerald-400',
    ring: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Star,
    title: 'Honest Reviews',
    body: 'Ratings and reviews come only from attendees who actually booked through Evently.',
    color: 'text-amber-400',
    ring: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: LayoutGrid,
    title: 'Clear Event Info',
    body: 'Every listing shows real prices, exact location, organizer contact, and transparent ticket policies.',
    color: 'text-blue-400',
    ring: 'bg-brand-blue/10 border-brand-blue/20',
  },
  {
    icon: MapPin,
    title: 'Local & Relevant',
    body: 'Discover events happening in your city — not a feed of irrelevant listings from across the globe.',
    color: 'text-purple-400',
    ring: 'bg-brand-purple/10 border-brand-purple/20',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const featuredEvents = FEATURED_IDS.map((fid) => EVENTS.find((e) => e.id === fid)).filter(Boolean)
  const upcomingEvents = UPCOMING_IDS.map((uid) => EVENTS.find((e) => e.id === uid)).filter(Boolean)

  const handleSearch = (val) => {
    const q = val.trim()
    navigate(q ? `/explore?search=${encodeURIComponent(q)}` : '/explore')
  }

  const handleCategory = (label) => {
    navigate(`/explore?category=${encodeURIComponent(label)}`)
  }

  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[86vh] flex items-center">
        {/* Backgrounds */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-900" />
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
        <div aria-hidden className="absolute top-20 right-0 w-[400px] h-[350px] rounded-full bg-brand-purple/6 blur-[80px] pointer-events-none" />
        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

            {/* Pill label */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/25 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sparkles size={11} />
                Event Discovery Platform for India
              </span>
            </div>

            {/* Headline */}
            <div className="animate-slide-up space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight text-white">
                Discover events
                <br />
                <span className="gradient-text">worth experiencing.</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                Find workshops, meetups, experiences and events happening around you — with verified organizers and clear ticket information.
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

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.05] bg-dark-800/50 py-8">
        <PageContainer>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => handleCategory(label)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-600/60 border border-white/[0.07] text-gray-300 hover:text-white hover:border-brand-blue/40 hover:bg-dark-500/70 text-sm font-medium transition-all duration-200"
              >
                <span className="text-base leading-none">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Featured Events ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
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
      <section className="py-14 sm:py-18 bg-dark-800/30">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <SectionHeading
              title="Every event comes with clear organizer and ticket information."
              subtitle="We built trust into the platform so you never have to wonder if an event is real."
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_ITEMS.map(({ icon: Icon, title, body, color, ring }) => (
              <div
                key={title}
                className={`glass-card rounded-2xl p-5 flex flex-col gap-3 border ${ring}`}
              >
                <div className={`w-10 h-10 rounded-xl ${ring} border flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="space-y-1">
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ── Upcoming Near You ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
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
      <section className="py-14 sm:py-20">
        <PageContainer>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/15 to-brand-purple/15 border border-brand-blue/20 p-8 sm:p-14 text-center">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5" />
            <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-5 max-w-lg mx-auto">
              <span className="inline-flex items-center gap-1.5 bg-brand-purple/15 border border-brand-purple/25 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Zap size={11} fill="currentColor" />
                Join 18,000+ attendees
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Ready to find your next
                <span className="gradient-text"> experience?</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Browse hundreds of events, workshops and meetups happening across Indian cities — all in one place.
              </p>
              <Button size="lg" onClick={() => navigate('/explore')}>
                Start Exploring
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-dark-800/40">
        <PageContainer className="py-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold text-white">Evently</span>
              <span className="text-gray-600 text-xs ml-1">Discover. Verify. Experience.</span>
            </div>
            <p className="text-xs text-gray-600">© 2026 Evently. All rights reserved.</p>
          </div>
        </PageContainer>
      </footer>

    </div>
  )
}
