import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, X, Search } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import SearchInput from '../components/ui/SearchInput'
import EventCard from '../components/ui/EventCard'
import EmptyState from '../components/ui/EmptyState'
import { EVENTS } from '../data/events'

/* ── Filter option definitions ─────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Technology', 'Workshops', 'Music', 'Sports', 'Business', 'Art', 'Community']
const CITIES     = ['All', 'Noida', 'Delhi', 'Ghaziabad', 'Gurgaon']
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

/* ── Price predicate ────────────────────────────────────────────────────────── */
function matchesPrice(price, filter) {
  if (filter === 'all')       return true
  if (filter === 'under500')  return price < 500
  if (filter === '500to1000') return price >= 500 && price <= 1000
  if (filter === 'above1000') return price > 1000
  return true
}

/* ── Sort comparator ────────────────────────────────────────────────────────── */
function applySorting(events, sort) {
  const arr = [...events]
  if (sort === 'price_asc')  return arr.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     return arr.sort((a, b) => b.rating - a.rating)
  return arr // 'recommended' — keep original order
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  /* ── Initialise filter state from URL params ──────────────────────────── */
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '')
  const [category,    setCategory]    = useState(searchParams.get('category') ?? 'All')
  const [city,        setCity]        = useState('All')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy,      setSortBy]      = useState('recommended')
  const [sortOpen,    setSortOpen]    = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  /* Sync URL → state when the user navigates back from Home */
  useEffect(() => {
    const s = searchParams.get('search')
    const c = searchParams.get('category')
    if (s) setSearchQuery(s)
    if (c) setCategory(c)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Derived filtered + sorted list ──────────────────────────────────── */
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    const filtered = EVENTS.filter((e) => {
      // Search: title, category, city, location, organizer
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q)

      const matchCategory = category === 'All' || e.category === category
      const matchCity     = city === 'All' || e.city === city
      const matchPrice    = matchesPrice(e.price, priceFilter)

      return matchSearch && matchCategory && matchCity && matchPrice
    })

    return applySorting(filtered, sortBy)
  }, [searchQuery, category, city, priceFilter, sortBy])

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const hasActiveFilters =
    searchQuery !== '' ||
    category !== 'All' ||
    city !== 'All' ||
    priceFilter !== 'all' ||
    sortBy !== 'recommended'

  const clearFilters = () => {
    setSearchQuery('')
    setCategory('All')
    setCity('All')
    setPriceFilter('all')
    setSortBy('recommended')
    setSearchParams({})
  }

  const handleSearch = (val) => {
    setSearchQuery(val)
    // Update URL so sharing works
    const params = {}
    if (val.trim()) params.search = val.trim()
    if (category !== 'All') params.category = category
    setSearchParams(params)
  }

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Recommended'

  /* ── Filter sidebar / chips section ──────────────────────────────────── */
  const FilterPanel = () => (
    <div className="flex flex-col gap-6">

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                category === cat
                  ? 'bg-brand-blue/20 text-blue-300 border-brand-blue/40'
                  : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/20',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Location</p>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                city === c
                  ? 'bg-brand-purple/20 text-purple-300 border-brand-purple/40'
                  : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/20',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Price</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPriceFilter(value)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                priceFilter === value
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/20',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors mt-1"
        >
          <X size={12} />
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <PageContainer>

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <SectionHeading
            title="Explore Events"
            subtitle="Find something happening near you."
            className="mb-6"
          />

          {/* Search + controls row */}
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
                className="flex items-center gap-2 glass border border-white/10 hover:border-white/20 px-4 py-3 rounded-2xl text-sm text-gray-300 hover:text-white transition-all duration-200 whitespace-nowrap w-full sm:w-auto justify-between sm:justify-start"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 glass-card border border-white/10 rounded-xl overflow-hidden z-30 shadow-xl shadow-black/40 animate-fade-in">
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => { setSortBy(value); setSortOpen(false) }}
                      className={[
                        'w-full text-left px-4 py-2.5 text-sm transition-colors',
                        sortBy === value
                          ? 'text-blue-300 bg-brand-blue/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/5',
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
              className="flex items-center justify-center gap-2 glass border border-white/10 hover:border-white/20 px-4 py-3 rounded-2xl text-sm text-gray-300 hover:text-white transition-all duration-200 sm:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
              )}
            </button>
          </div>

          {/* Mobile filters panel */}
          {mobileFiltersOpen && (
            <div className="mt-4 glass-card border border-white/[0.08] rounded-2xl p-5 sm:hidden animate-fade-in">
              <FilterPanel />
            </div>
          )}

          {/* Desktop filters (always visible on sm+) */}
          <div className="hidden sm:block mt-5 glass-card border border-white/[0.06] rounded-2xl p-5">
            <FilterPanel />
          </div>
        </div>

        {/* ── Results meta row ────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <p className="text-sm text-gray-500">
            <span className="text-white font-medium">{results.length}</span>
            {' '}event{results.length !== 1 ? 's' : ''} found
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-3 text-xs text-gray-600 hover:text-red-400 underline underline-offset-2 transition-colors"
              >
                Clear filters
              </button>
            )}
          </p>

          {/* Active filter pills */}
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

        {/* ── Results grid or empty state ─────────────────────────────── */}
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

      {/* Close sort dropdown on outside click */}
      {sortOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setSortOpen(false)}
        />
      )}
    </div>
  )
}

/* ── Small removable filter pill ─────────────────────────────────────────── */
function FilterPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-dark-500 border border-white/10 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-white transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={10} />
      </button>
    </span>
  )
}
