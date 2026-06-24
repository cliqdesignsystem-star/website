'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { useDesignStore } from '@/stores/designStore'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setShowOnboarding } = useDesignStore()
  const { user } = useAuthStore()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      style={{ height: 'var(--navbar-height)' }}
    >
      <div className="mx-auto px-6 h-full flex items-center justify-between" style={{ maxWidth: 'var(--page-max-width)' }}>
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg overflow-hidden shrink-0"
          >
            <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display-family)' }}
          >
            Cliq System
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/projects" className="btn-primary text-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signup" className="btn-secondary text-sm">
                Sign Up
              </Link>
              <button
                onClick={() => setShowOnboarding(true)}
                className="btn-primary text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setShowOnboarding(true); setMobileOpen(false) }}
            className="btn-primary text-sm w-full justify-center"
          >
            Start Designing
          </button>
        </div>
      )}
    </nav>
  )
}
