import { useNavigate } from 'react-router-dom'
import { CreditCard, ArrowLeft, Lock } from 'lucide-react'
import PageContainer from '../components/ui/PageContainer'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function Booking() {
  const navigate = useNavigate()

  return (
    <div className="py-10 sm:py-16 min-h-screen">
      <PageContainer>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        <div className="max-w-xl mx-auto">
          <SectionHeading
            title="Complete Your Booking"
            subtitle="This feature is coming soon."
            className="mb-10"
          />

          <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
              <CreditCard size={28} className="text-blue-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-semibold text-lg">Booking Coming Soon</h2>
              <p className="text-gray-400 text-sm max-w-sm">
                The full booking flow — ticket selection, payment, and confirmation
                — will be available in the next version of Evently.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Lock size={12} />
              Secure payments powered by Stripe (coming soon)
            </div>

            <Badge variant="purple">Part 2 Feature</Badge>

            <Button variant="secondary" onClick={() => navigate('/explore')}>
              Browse More Events
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
