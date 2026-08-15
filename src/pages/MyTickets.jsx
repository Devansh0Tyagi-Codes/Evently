import { useNavigate } from 'react-router-dom'
import { Ticket, ArrowRight } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function MyTickets() {
  const navigate = useNavigate()

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <PageContainer>
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <SectionHeading
            title="My Tickets"
            subtitle="Your booked events and tickets will appear here."
          />
          <Badge variant="purple">Part 2 Feature</Badge>
        </div>

        <EmptyState
          icon={Ticket}
          title="No tickets yet"
          description="Once you book an event, your tickets will appear here. Booking functionality is coming soon."
          action={{
            label: 'Explore Events',
            onClick: () => navigate('/explore'),
          }}
        />

        {/* Placeholder ticket card design preview */}
        <div className="mt-12">
          <p className="text-xs text-gray-600 text-center mb-4 uppercase tracking-widest">
            Ticket design preview
          </p>
          <div className="max-w-sm mx-auto glass-card rounded-2xl overflow-hidden border border-white/5 opacity-40 pointer-events-none select-none">
            <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-purple" />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Event</p>
                  <p className="text-white font-semibold text-sm">Event Name Here</p>
                </div>
                <Ticket size={20} className="text-brand-blue" />
              </div>
              <div className="border-t border-dashed border-white/10 pt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="text-white">Aug 22, 2026</p>
                </div>
                <div>
                  <p className="text-gray-500">Seat</p>
                  <p className="text-white">GA-001</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant="green" size="sm">Confirmed</Badge>
                <button className="text-xs text-brand-blue flex items-center gap-1">
                  View <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
