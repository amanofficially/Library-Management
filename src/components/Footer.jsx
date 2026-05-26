import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen, Mail, Phone, MapPin, Github } from 'lucide-react'

const links = [
  { to: '/',            label: 'Dashboard'   },
  { to: '/students',    label: 'Students'    },
  { to: '/books',       label: 'Books'       },
  { to: '/issue-books', label: 'Issue Books' },
]

const Footer = () => (
  <footer className="bg-ink-900 text-ink-300 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <div className="leading-none">
              <p className="font-display font-bold text-white text-lg">Readify</p>
              <p className="text-gold-400 text-[10px] font-mono uppercase tracking-widest">Management System</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-400 max-w-xs">
            A modern library management platform for seamless administration of books, students, and lending records.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display text-white text-sm font-semibold mb-4 uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm flex items-center gap-2 transition-colors duration-150 ${
                      isActive ? 'text-gold-400' : 'text-ink-400 hover:text-gold-300'
                    }`
                  }
                >
                  <span className="text-gold-500 text-xs">▸</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-white text-sm font-semibold mb-4 uppercase tracking-widest">
            Contact
          </h3>
          <ul className="space-y-3">
            {[
              { icon: Mail,    text: 'support@readify.com' },
              { icon: Phone,   text: '+91 98765 43210'       },
              { icon: MapPin,  text: 'Bhopal, Madhya Pradesh'},
              { icon: Github,  text: 'github.com/readify'  },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-ink-400">
                <Icon size={14} className="text-gold-500 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-600">
        <span>© 2026 Readify — Library Management System. All rights reserved.</span>
        <span className="font-mono">v1.0.0</span>
      </div>
    </div>
  </footer>
)

export default Footer
