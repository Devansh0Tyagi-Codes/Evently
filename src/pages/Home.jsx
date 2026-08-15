import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Calendar,
  Users,
  Star,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EventCard from '../components/ui/EventCard'
import Badge from '../components/ui/Badge'
import { PLACEHOLDER_EVENTS } from '../data/placeholderEvents'

/* ─── Trust indicators ─────────────────────────────────────────────────────── */
const trustIndicators = [
  {
    icon: ShieldCheck,
    label: 'Verified Organizers',
    description: 'Every host is background-checked and trusted.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Zap,
    label: 'Instant Booking',
    description: 'Secure your spot in seconds, no friction.',
    color: 'text-blue-400',
    bg: 'bg-brand-blue/10 border-brand-blue/20',
  },
  {
    icon: Star,
    label: 'Curated Quality',
    description: 'Only high-quality events make it to Evently.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
]

/* ─── Stats ─────────────────────────────────────────────────────────────────── */
const stats = [
  { value: '2,400+', label: 'Events Listed' },
  { value: '18,000+', label: 'Happy Attendees' },
  { value: '340+', label: 'Verified Organizers' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (val) => {
    if (val.trim()) navigate(`/explore?q=${encodeURIComponent(val.trim())}`)
    else navigate('/explore')
  }

  return (
    <div className="flex flex-col">
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background elements */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-900"
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[80px] pointer-events-none"
        />
        {/* Grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <PageContainer className="relative z-10 py-20 sm:py-28">
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            {/* Label */}
            <div className="animate-fade-in">
              <Badge variant="purple" size="md">
                <Sparkles size={11} />
                The modern event discovery platform
              </Badge>
            </div>

            {/* Headline */}
            <div className="animate-slide-up space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                Discover Events
                <br />
                <span className="gradient-text">Worth Your Time</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Discover. Verify. Experience. — Find trusted workshops and events
                near you, with organizer verification built in from day one.
              </p>
            </div>

            {/* Search */}
            <div className="w-full max-w-2xl animate-slide-up">
              <SearchInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSubmit={handleSearch}
                placeholder="Search events, workshops, cities…"
                className="text-base"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Popular:{' '}
                {['Design Workshop', 'Tech Summit', 'Photography'].map((tag, i) => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="text-gray-400 hover:text-blue-400 transition-colors underline underline-offset-2"
                  >
                    {tag}
                    {i < 2 ? ', ' : ''}
                  </button>
                ))}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up">
              <Button
                size="lg"
                onClick={() => navigate('/explore')}
              >
                Explore Events
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/my-tickets')}
              >
                My Tickets
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Stats bar ───────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-dark-800/40">
        <PageContainer className="py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold gradient-text">
                  {value}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─── Featured events placeholder ─────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <SectionHeading
              title="Featured Events"
              subtitle="Hand-picked events from verified organizers."
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/explore')}
            >
              View all
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_EVENTS.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─── Trust indicators ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-dark-800/30">
        <PageContainer>
          <SectionHeading
            title="Why Evently?"
            subtitle="We built trust into the platform from day one."
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustIndicators.map(({ icon: Icon, label, description, color, bg }) => (
              <div
                key={label}
                className={`glass-card rounded-2xl p-6 flex flex-col gap-4 border ${bg}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${bg} border flex items-center justify-center`}
                >
                  <Icon size={20} className={color} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-semibold text-base">{label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─── Upcoming events placeholder ──────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <SectionHeading
              title="Happening Soon"
              subtitle="Don't miss out on these upcoming experiences."
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/explore')}
            >
              Browse all
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_EVENTS.slice(3, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─── CTA banner ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <PageContainer>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-brand-blue/20 p-8 sm:p-12 text-center">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5"
            />
            <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-400" />
                <Users size={20} className="text-purple-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Ready to find your next
                <span className="gradient-text"> experience?</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Join thousands of attendees discovering quality events every day.
              </p>
              <Button size="lg" onClick={() => navigate('/explore')}>
                Start Exploring
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-dark-800/40">
        <PageContainer className="py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <Zap size={12} className="text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold text-white">Evently</span>
            </div>
            <p className="text-xs text-gray-600 text-center sm:text-right">
              © 2026 Evently. Discover. Verify. Experience.
            </p>
          </div>
        </PageContainer>
      </footer>
    </div>
  )
}
