import { useNavigate } from 'react-router-dom'
import { CreditCard, ArrowLeft, Lock } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'

export default function Booking() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-subtle py-10 sm:py-16">
      <PageContainer>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-ink-secondary hover:text-ink text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="max-w-lg mx-auto">
          <SectionHeading
            title="Complete Your Booking"
            subtitle="This feature is coming soon."
            className="mb-10"
          />

          <div className="bg-white border border-border rounded-2xl p-10 flex flex-col items-center gap-6 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-surface-muted border border-border flex items-center justify-center">
              <CreditCard size={24} className="text-ink-secondary" />
            </div>

            <div className="space-y-2">
              <h2 className="text-ink font-semibold text-lg">Booking Coming Soon</h2>
              <p className="text-ink-secondary text-sm max-w-sm leading-relaxed">
                The full booking flow — ticket selection, payment, and confirmation — will be available in the next version of Evently.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Lock size={11} />
              Secure payments powered by Stripe (coming soon)
            </div>

            <span className="inline-flex items-center bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold px-3 py-1 rounded-full">
              Coming in Part 3
            </span>

            <Button variant="secondary" onClick={() => navigate('/explore')}>
              Browse More Events
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
