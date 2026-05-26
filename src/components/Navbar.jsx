import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  BookOpen, Users, Library, BookMarked,
  Menu, X, ChevronRight
} from 'lucide-react'

const navItems = [
  { to: '/',            label: 'Dashboard',   icon: Library    },
  { to: '/students',    label: 'Students',    icon: Users      },
  { to: '/books',       label: 'Books',       icon: BookOpen   },
  { to: '/issue-books', label: 'Issue Books', icon: BookMarked },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-900/95 backdrop-blur-md shadow-lg'
          : 'bg-ink-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center shadow-md group-hover:bg-gold-400 transition-colors">
              <BookOpen size={18} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Readify
              </span>
              <span className="block text-gold-400 text-[10px] font-mono uppercase tracking-widest">
                Management System
              </span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                      : 'text-ink-300 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-ink-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-ink-700 bg-ink-900 animate-slide-up">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                      : 'text-ink-300 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                <ChevronRight size={14} className="opacity-40" />
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
