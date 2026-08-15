import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * /booking — graceful fallback.
 *
 * Booking is now handled inline on the Event Details page.
 * If someone lands here directly, redirect them to Explore.
 */
export default function Booking() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/explore', { replace: true })
  }, [navigate])

  return null
}
