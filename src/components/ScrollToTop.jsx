import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — resets window scroll to (0, 0) on every route change.
 * Mounted once inside BrowserRouter so it has access to location.
 * Uses `window.scrollTo` with `behavior: 'instant'` so the page
 * appears at the top before the new content paints — no delay, no
 * setTimeout hacks.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
