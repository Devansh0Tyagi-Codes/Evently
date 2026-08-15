import { useNavigate } from 'react-router-dom'
import { Ticket, ArrowRight } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import EmptyState from '../components/ui/EmptyState'

export default function MyTickets() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-subtle py-10 sm:py-16">
      <PageContainer>
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <SectionHeading
            title="My Tickets"
            subtitle="Your booked events and tickets will appear here."
          />
          <span className="inline-flex items-center bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold px-3 py-1 rounded-full self-start mt-1">
            Coming Soon
          </span>
        </div>

        <EmptyState
          icon={Ticket}
          title="No tickets yet"
          description="Once you book an event, your tickets will appear here. Booking functionality is coming in the next part."
          action={{
            label: 'Explore Events',
            onClick: () => navigate('/explore'),
          }}
        />

        {/* Faded ticket design preview */}
        <div className="mt-14">
          <p className="text-[11px] text-ink-muted text-center mb-4 uppercase tracking-widest font-medium">
            Ticket design preview
          </p>
          <div className="max-w-sm mx-auto bg-white border border-border rounded-2xl overflow-hidden opacity-40 pointer-events-none select-none shadow-card">
            <div className="h-1.5 bg-ink" />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">Event</p>
                  <p className="text-ink font-semibold text-sm">Event Name Here</p>
                </div>
                <Ticket size={20} className="text-ink-secondary" />
              </div>
              <div className="border-t border-dashed border-border pt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-ink-muted font-medium uppercase tracking-wide text-[10px] mb-0.5">Date</p>
                  <p className="text-ink font-semibold">Aug 22, 2026</p>
                </div>
                <div>
                  <p className="text-ink-muted font-medium uppercase tracking-wide text-[10px] mb-0.5">Seat</p>
                  <p className="text-ink font-semibold">GA-001</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Confirmed
                </span>
                <button className="text-xs text-ink-secondary flex items-center gap-1">
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
