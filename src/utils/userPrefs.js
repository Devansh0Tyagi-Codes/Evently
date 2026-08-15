/**
 * userPrefs.js
 * Persist favorites and watched event IDs to localStorage.
 * Both are stored as plain string arrays.
 */

const FAVORITES_KEY = 'evently_favorites'
const WATCHED_KEY   = 'evently_watched'

/* ── Generic helpers ──────────────────────────────────────────────────────── */

function readIds(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeIds(key, ids) {
  try {
    localStorage.setItem(key, JSON.stringify(ids))
  } catch {
    // storage full — fail silently
  }
}

function toggle(key, id) {
  const ids = readIds(key)
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids]
  writeIds(key, next)
  return next
}

/* ── Favorites ────────────────────────────────────────────────────────────── */

export const getFavorites  = ()       => readIds(FAVORITES_KEY)
export const toggleFavorite = (id)    => toggle(FAVORITES_KEY, id)
export const isFavorite    = (id)     => readIds(FAVORITES_KEY).includes(id)

/* ── Watched ──────────────────────────────────────────────────────────────── */

export const getWatched    = ()    => readIds(WATCHED_KEY)
export const toggleWatched = (id)  => toggle(WATCHED_KEY, id)
export const isWatched     = (id)  => readIds(WATCHED_KEY).includes(id)
