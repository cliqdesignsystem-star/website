'use client'

import { Monitor } from 'lucide-react'

export function TemplateShowcase() {
  return (
    <section id="templates" className="section bg-background">
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            See your system in a real product.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your design isn't previewed on abstract boxes — it's applied to a full interface.
          </p>
        </div>

        {/* Browser mockup */}
        <div className="rounded-2xl border border-border shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div
              className="flex-1 h-6 rounded bg-border/50 flex items-center px-3"
            >
              <span className="text-xs text-muted-foreground font-mono">
                cliq.system/preview
              </span>
            </div>
            <Monitor className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Mini site preview */}
          <div style={{ backgroundColor: 'var(--background)', transform: 'scale(1)', transformOrigin: 'top left' }}>
            {/* Mini navbar */}
            <div
              className="flex items-center justify-between px-8 py-3 border-b border-border"
              style={{ height: '48px' }}
            >
              <span
                className="text-sm font-bold"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                Cliq System
              </span>
              <div className="flex gap-6">
                {['Features', 'Pricing', 'Docs'].map(l => (
                  <span key={l} className="text-xs text-muted-foreground">{l}</span>
                ))}
              </div>
              <button className="btn-primary text-xs px-3 py-1.5">Get Started</button>
            </div>

            {/* Mini hero */}
            <div
              className="px-8 py-12 text-center border-b border-border"
              style={{ backgroundColor: 'var(--background)' }}
            >
              <h1
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                Design systems, not just colors.
              </h1>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Build, preview, and export complete UI systems in real time.
              </p>
              <div className="flex gap-3 justify-center">
                <button className="btn-primary text-sm">Start Designing</button>
                <button className="btn-secondary text-sm">View Demo</button>
              </div>
            </div>

            {/* Mini features */}
            <div className="px-8 py-8 grid grid-cols-3 gap-4">
              {['Color Systems', 'Typography', 'Layout System'].map(feat => (
                <div key={feat} className="card">
                  <div
                    className="w-8 h-8 rounded-lg mb-3"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
                  />
                  <div className="text-xs font-semibold">{feat}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Live, dynamic, and exportable.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
