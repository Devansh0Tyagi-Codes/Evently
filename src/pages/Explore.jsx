import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import SearchInput from '../components/ui/SearchInput'
import EventCard from '../components/ui/EventCard'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import { PLACEHOLDER_EVENTS } from '../data/placeholderEvents'

const CATEGORIES = ['All', 'Workshop', 'Conference', 'Bootcamp', 'Seminar']

export default function Explore() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = PLACEHOLDER_EVENTS.filter((e) => {
    const matchesQuery =
      !query ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase())
    const matchesCategory =
      activeCategory === 'All' || e.category === activeCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <PageContainer>
        {/* Header */}
        <div className="mb-8 space-y-6">
          <SectionHeading
            title="Explore Events"
            subtitle="Browse verified workshops and events from trusted organizers."
          />

          {/* Search + filter row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={(v) => setQuery(v)}
              placeholder="Search by name or city…"
              className="flex-1"
            />
            <button className="flex items-center gap-2 glass border border-white/10 hover:border-white/20 px-4 py-3 rounded-2xl text-sm text-gray-400 hover:text-white transition-all duration-200 shrink-0">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-brand-blue/20 text-blue-300 border-brand-blue/40'
                    : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/20',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid or empty */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No events found"
            description="Try adjusting your search or filters."
            action={{ label: 'Clear search', onClick: () => { setQuery(''); setActiveCategory('All') } }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Coming soon notice */}
        <div className="mt-12 text-center">
          <Badge variant="gray">More events coming soon</Badge>
        </div>
      </PageContainer>
    </div>
  )
}
