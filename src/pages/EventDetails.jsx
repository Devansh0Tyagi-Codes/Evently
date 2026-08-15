import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Clock,
  Tag,
} from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { PLACEHOLDER_EVENTS } from '../data/placeholderEvents'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const event = PLACEHOLDER_EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-lg">Event not found.</p>
          <Button variant="secondary" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <PageContainer>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image placeholder */}
            <div className="h-56 sm:h-72 rounded-2xl bg-gradient-to-br from-dark-600 to-dark-700 flex items-center justify-center border border-white/5">
              <Calendar size={48} className="text-dark-400" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">{event.category}</Badge>
              {event.verified && <Badge variant="green"><ShieldCheck size={11} /> Verified</Badge>}
              {event.tags.map((t) => <Badge key={t} variant="gray">{t}</Badge>)}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              {event.title}
            </h1>

            {/* Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: 'Date & Time', value: event.date },
                { icon: MapPin, label: 'Location', value: event.location },
                { icon: Users, label: 'Attending', value: `${event.attendees} people` },
                { icon: Tag, label: 'Price', value: event.price === 0 ? 'Free' : `$${event.price}` },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-card rounded-xl p-4 flex items-start gap-3"
                >
                  <Icon size={16} className="text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About placeholder */}
            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h2 className="text-white font-semibold">About this event</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full event description will appear here. This section will include
                details about the event agenda, what attendees will learn or
                experience, speaker bios, and any prerequisites.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock size={13} className="text-gray-500" />
                <span className="text-xs text-gray-500">
                  Event details coming soon
                </span>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-5">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-3xl font-extrabold text-white">
                  {event.price === 0 ? (
                    <span className="gradient-text">Free</span>
                  ) : (
                    <span>${event.price}</span>
                  )}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-400 border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span>Availability</span>
                  <span className="text-emerald-400 font-medium">Open</span>
                </div>
                <div className="flex justify-between">
                  <span>Organizer</span>
                  <span className="text-white">Verified Host</span>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/booking')}
              >
                Book Now
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Booking functionality coming soon
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
