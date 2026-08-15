import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, X, Search } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import SearchInput from '../components/ui/SearchInput'
import EventCard from '../components/ui/EventCard'
import EmptyState from '../components/ui/EmptyState'
import { EVENTS } from '../data/events'

/* ── Filter options ─────────────────────────────────────────────────────────── */
const CATEGORIES  = ['All', 'Technology', 'Workshops', 'Music', 'Sports', 'Business', 'Art', 'Community']
const CITIES      = ['All', 'Noida', 'Delhi', 'Ghaziabad', 'Gurgaon']
const PRICE_OPTIONS = [
  { value: 'all',        label: 'All Prices' },
  { value: 'under500',   label: 'Under ₹500' },
  { value: '500to1000',  label: '₹500–₹1,000' },
  { value: 'above1000',  label: 'Above ₹1,000' },
]
const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc',   label: 'Price: Low to High' },
  { value: 'price_desc',  label: 'Price: High to Low' },
  { value: 'rating',      label: 'Top Rated' },
]

function matchesPrice(price, filter) {
  if (filter === 'all')        return true
  if (filter === 'under500')   return price < 500
  if (filter === '500to1000')  return price >= 500 && price <= 1000
  if (filter === 'above1000')  return price > 1000
  return true
}

function applySorting(events, sort) {
  const arr = [...events]
  if (sort === 'price_asc')  return arr.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     return arr.sort((a, b) => b.rating - a.rating)
  return arr
}

/* ── Chip button ────────────────────────────────────────────────────────────── */
function FilterChip({ label, active, onClick, activeClass }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
        active
          ? activeClass ?? 'bg-ink text-white border-ink'
          : 'bg-white text-ink-secondary border-border hover:text-ink hover:border-border-strong',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

/* ── Removable active filter pill ──────────────────────────────────────────── */
function FilterPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-surface-muted border border-border text-ink-secondary text-xs font-medium px-2.5 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="text-ink-muted hover:text-ink transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={10} />
      </button>
    </span>
  )
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate() // eslint-disable-line no-unused-vars

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '')
  const [category,    setCategory]    = useState(searchParams.get('category') ?? 'All')
  const [city,        setCity]        = useState('All')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy,      setSortBy]      = useState('recommended')
  const [sortOpen,    setSortOpen]    = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const s = searchParams.get('search')
    const c = searchParams.get('category')
    if (s) setSearchQuery(s)
    if (c) setCategory(c)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const filtered = EVENTS.filter((e) => {
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q)
      return (
        matchSearch &&
        (category === 'All' || e.category === category) &&
        (city === 'All' || e.city === city) &&
        matchesPrice(e.price, priceFilter)
      )
    })
    return applySorting(filtered, sortBy)
  }, [searchQuery, category, city, priceFilter, sortBy])

  const hasActiveFilters =
    searchQuery !== '' || category !== 'All' || city !== 'All' ||
    priceFilter !== 'all' || sortBy !== 'recommended'

  const clearFilters = () => {
    setSearchQuery(''); setCategory('All'); setCity('All')
    setPriceFilter('all'); setSortBy('recommended'); setSearchParams({})
  }

  const handleSearch = (val) => {
    setSearchQuery(val)
    const params = {}
    if (val.trim()) params.search = val.trim()
    if (category !== 'All') params.category = category
    setSearchParams(params)
  }

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Recommended'

  /* ── Filter panel (shared by desktop + mobile) ───────────────────────── */
  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest mb-3">Location</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <FilterChip
              key={c}
              label={c}
              active={city === c}
              onClick={() => setCity(c)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest mb-3">Price</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_OPTIONS.map(({ value, label }) => (
            <FilterChip
              key={value}
              label={label}
              active={priceFilter === value}
              onClick={() => setPriceFilter(value)}
              activeClass="bg-emerald-700 text-white border-emerald-700"
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 transition-colors"
        >
          <X size={11} />
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-surface-subtle page-enter">
      <PageContainer className="py-10 sm:py-14">
        <div className="mb-8">
          <SectionHeading
            title="Explore Events"
            subtitle="Find something happening near you."
            className="mb-7"
          />

          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
              placeholder="Search events, cities, organizers…"
              className="flex-1"
            />

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 bg-white border border-border hover:border-border-strong px-4 py-3 rounded-xl text-sm text-ink-secondary hover:text-ink transition-all duration-150 whitespace-nowrap w-full sm:w-auto justify-between sm:justify-start shadow-card"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-border rounded-xl overflow-hidden z-30 shadow-card-hover animate-fade-in">
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => { setSortBy(value); setSortOpen(false) }}
                      className={[
                        'w-full text-left px-4 py-2.5 text-sm transition-colors',
                        sortBy === value
                          ? 'text-ink font-medium bg-surface-muted'
                          : 'text-ink-secondary hover:text-ink hover:bg-surface-muted',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile filters toggle */}
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="flex items-center justify-center gap-2 bg-white border border-border hover:border-border-strong px-4 py-3 rounded-xl text-sm text-ink-secondary hover:text-ink transition-all duration-150 sm:hidden shadow-card"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          </div>

          {/* Mobile filter panel */}
          {mobileFiltersOpen && (
            <div className="mt-4 bg-white border border-border rounded-2xl p-5 sm:hidden animate-fade-in shadow-card">
              <FilterPanel />
            </div>
          )}

          {/* Desktop filter panel */}
          <div className="hidden sm:block mt-4 bg-white border border-border rounded-2xl p-5 shadow-card">
            <FilterPanel />
          </div>
        </div>

        {/* ── Results meta ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
          <p className="text-sm text-ink-secondary">
            <span className="text-ink font-semibold">{results.length}</span>
            {' '}event{results.length !== 1 ? 's' : ''} found
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-3 text-xs text-ink-muted hover:text-red-500 underline underline-offset-2 transition-colors"
              >
                Clear filters
              </button>
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <FilterPill label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} />
            )}
            {category !== 'All' && (
              <FilterPill label={category} onRemove={() => setCategory('All')} />
            )}
            {city !== 'All' && (
              <FilterPill label={city} onRemove={() => setCity('All')} />
            )}
            {priceFilter !== 'all' && (
              <FilterPill
                label={PRICE_OPTIONS.find((p) => p.value === priceFilter)?.label}
                onRemove={() => setPriceFilter('all')}
              />
            )}
          </div>
        </div>

        {/* ── Grid or empty ───────────────────────────────────────────── */}
        {results.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No events found"
            description="Try changing your filters or search for something else."
            action={{ label: 'Clear Filters', onClick: clearFilters }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

      </PageContainer>

      {sortOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
      )}
    </div>
  )
}
