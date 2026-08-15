import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Zap, Menu, X, UserCircle, Ticket, Compass, Home } from 'lucide-react'

const navLinks = [
  { to: '/',           label: 'Home',       icon: Home,    end: true },
  { to: '/explore',    label: 'Explore',    icon: Compass        },
  { to: '/my-tickets', label: 'My Tickets', icon: Ticket         },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    [
      'relative flex items-center gap-1.5 text-sm font-medium px-3 py-2 transition-colors duration-150',
      isActive ? 'text-ink' : 'text-ink-secondary hover:text-ink',
    ].join(' ')

  const mobileLinkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150',
      isActive
        ? 'text-ink bg-surface-muted'
        : 'text-ink-secondary hover:text-ink hover:bg-surface-muted',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center group-hover:bg-ink/80 transition-colors">
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-ink">
              Evently
            </span>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right actions ────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Profile"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink border border-border hover:border-border-strong bg-surface hover:bg-surface-muted px-3.5 py-1.5 rounded-lg transition-all duration-150"
            >
              <UserCircle size={16} />
              Profile
            </button>

            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}

            <div className="border-t border-border mt-2 pt-3">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors">
                <UserCircle size={16} />
                Profile
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
