'use client'

import { motion } from 'framer-motion'
import { Icon } from '@/components/common/Icon'

export function ComponentShowcase() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            Built with real components.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Buttons, inputs, cards, badges — all styled by your system, not a hardcoded theme.
          </p>
        </div>

        <div data-cliq-target="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--grid-gap)' }}>
          {/* Buttons */}
          <div className="card" data-cliq-target="card surface">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm" data-cliq-target="primary-btn palette">Primary</button>
              <button className="btn-secondary text-sm" data-cliq-target="secondary-btn palette">Secondary</button>
              <button
                className="text-sm px-4 py-2 rounded-[var(--radius)] font-medium border border-border text-foreground hover:bg-surface transition-colors"
              >
                Ghost
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="card" data-cliq-target="card surface">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
              Inputs
            </h3>
            <div className="flex flex-col gap-3">
              <input
                className="w-full h-10 px-3 text-sm border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your email"
                readOnly
              />
              <div className="flex gap-2">
                <input
                  className="flex-1 h-10 px-3 text-sm border border-border rounded-[var(--radius)] bg-background focus:outline-none"
                  placeholder="Search..."
                  readOnly
                />
                <button className="btn-primary text-sm px-3" data-cliq-target="primary-btn palette">Go</button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="card" data-cliq-target="card surface">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
              Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Primary', var: 'primary', target: 'primary-btn palette' },
                { label: 'Secondary', var: 'secondary', target: 'secondary-btn palette' },
                { label: 'Accent', var: 'tertiary', target: 'accent-badge palette' },
                { label: 'Neutral', var: null, target: null },
              ].map(badge => (
                <span
                  key={badge.label}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  {...(badge.target ? { 'data-cliq-target': badge.target } : {})}
                  style={badge.var ? {
                    backgroundColor: `color-mix(in srgb, var(--${badge.var}) 15%, transparent)`,
                    color: `var(--${badge.var})`,
                  } : {
                    backgroundColor: 'var(--surface)',
                    color: 'var(--muted-foreground)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="card" data-cliq-target="card surface">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold">Notification</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Just now</p>
              </div>
              <Icon name="bell" size={16} style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <p className="text-sm text-muted-foreground">
              Your design system is ready to export.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-xs px-3 py-1.5" data-cliq-target="primary-btn palette">View</button>
              <button className="btn-secondary text-xs px-3 py-1.5" data-cliq-target="secondary-btn palette">Dismiss</button>
            </div>
          </div>

          {/* Rating */}
          <div className="card" data-cliq-target="card surface">
            <h3 className="text-sm font-semibold mb-3">Rate this system</h3>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(n => (
                <Icon
                  key={n}
                  name="star"
                  size={24}
                  style={{ color: n <= 4 ? 'var(--tertiary)' : 'var(--border)' }}
                  filled={n <= 4}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">4/5 — Great design system</p>
          </div>

          {/* Form card */}
          <div className="card" data-cliq-target="card surface">
            <h3 className="text-sm font-semibold mb-3">Subscribe</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get design system tips every week.
            </p>
            <div className="flex flex-col gap-2">
              <input
                className="w-full h-9 px-3 text-sm border border-border rounded-[var(--radius)] bg-background"
                placeholder="name@company.com"
                readOnly
              />
              <button className="btn-primary text-sm w-full justify-center" data-cliq-target="primary-btn palette">
                <Icon name="mail" size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
