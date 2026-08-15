/**
 * Booking utilities — localStorage-backed ticket store.
 * No auth or backend required.
 */

const STORAGE_KEY = 'evently_bookings'

/**
 * Generate a short unique ticket ID.
 * Format: EVT-XXXXXXXX  (uppercase hex)
 */
export function generateTicketId() {
  const hex = Math.floor(Math.random() * 0xFFFFFFFF)
    .toString(16)
    .toUpperCase()
    .padStart(8, '0')
  return `EVT-${hex}`
}

/**
 * Read all bookings from localStorage.
 * @returns {Booking[]}
 */
export function getBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Persist a new booking.
 * @param {Booking} booking
 * @returns {Booking[]} updated list
 */
export function saveBooking(booking) {
  const existing = getBookings()
  const updated = [booking, ...existing]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // storage full — fail silently
  }
  return updated
}

/**
 * @typedef {Object} Booking
 * @property {string} ticketId       - unique ticket reference
 * @property {string} eventId        - event data id
 * @property {string} eventTitle
 * @property {string} category
 * @property {string} date
 * @property {string} time
 * @property {string} location
 * @property {string} city
 * @property {string} organizer
 * @property {number} price          - unit price
 * @property {number} qty
 * @property {number} total          - price * qty
 * @property {boolean} verified
 * @property {string} bookedAt       - ISO timestamp
 */
