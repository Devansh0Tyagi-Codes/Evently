import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Zap, Menu, X, UserCircle, Ticket, Compass, Home } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/my-tickets', label: 'My Tickets', icon: Ticket },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200',
      isActive
        ? 'text-white bg-brand-blue/15 border border-brand-blue/30'
        : 'text-gray-400 hover:text-white hover:bg-white/5',
    ].join(' ')

  const mobileLinkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
      isActive
        ? 'text-white bg-brand-blue/15 border border-brand-blue/20'
        : 'text-gray-400 hover:text-white hover:bg-white/5',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-blue/50 transition-shadow">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Evently</span>
            </span>
          </Link>

          {/* Desktop nav links — center/right */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right — profile + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Profile"
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white bg-dark-500/60 hover:bg-dark-400 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
            >
              <UserCircle size={18} />
              <span>Profile</span>
            </button>

            {/* Mobile toggle */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/[0.06] animate-fade-in">
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

            <div className="border-t border-white/5 mt-2 pt-3">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
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
