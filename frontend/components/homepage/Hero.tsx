'use client'

import { useDesignStore } from '@/stores/designStore'
import { motion } from 'framer-motion'
import { Icon } from '@/components/common/Icon'

export function Hero() {
  const { setShowOnboarding } = useDesignStore()

  return (
    <section data-cliq-target="hero" className="hero-section bg-background pt-[calc(var(--hero-padding)+var(--navbar-height))]">
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                color: 'var(--primary)',
              }}
            >
              Design systems that Cliq.
            </div>

            <h1
              className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-display-family)' }}
            >
              Design systems,{' '}
              <span style={{ color: 'var(--primary)' }}>not just colors.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Build, preview, and export complete UI systems — in real time.
              Stop guessing how your palette will look in a real product.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowOnboarding(true)}
                className="btn-primary"
                data-cliq-target="primary-btn palette"
              >
                Start Designing
                <Icon name="arrowRight" size={16} />
              </button>
              <a href="#templates" className="btn-secondary" data-cliq-target="secondary-btn palette">
                <Icon name="play" size={16} />
                View Demo
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[
                { label: 'Live Preview', value: '100%' },
                { label: 'Export Formats', value: '5+' },
                { label: 'Design Tokens', value: '30+' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Live UI Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <LiveUIPreview />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LiveUIPreview() {
  return (
    <div
      data-cliq-target="modal"
      className="border border-border overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--modal-radius, var(--radius))',
        boxShadow: 'var(--modal-shadow, 0 25px 50px -12px rgba(0,0,0,0.25))',
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
          cliq.system
        </div>
      </div>

      {/* Mini UI preview */}
      <div className="p-6 flex flex-col gap-4">
        {/* Mini navbar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-lg"
          style={{ background: 'var(--primary)' }}
        >
          <span className="text-white text-sm font-semibold">Cliq System</span>
          <div className="flex gap-2">
            <div className="w-12 h-4 rounded bg-white/20" />
            <div className="w-12 h-4 rounded bg-white/20" />
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Card Title', body: 'This is how your system looks in action.' },
            { title: 'Component', body: 'Every element updates in real time.' },
          ].map((card, i) => (
            <div key={i} className="card" data-cliq-target="card surface">
              <div className="text-sm font-semibold mb-1">{card.title}</div>
              <div className="text-xs text-muted-foreground mb-3">{card.body}</div>
              <button className="btn-primary text-xs py-1 px-3" data-cliq-target="primary-btn palette">View more</button>
            </div>
          ))}
        </div>

        {/* Input + button row */}
        <div className="flex gap-2">
          <input
            className="flex-1 h-9 px-3 text-sm border border-border rounded-[var(--radius)] bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter your email"
            readOnly
          />
          <button className="btn-primary text-sm px-4 py-2" data-cliq-target="primary-btn palette">Get Started</button>
        </div>

        {/* Badge row */}
        <div className="flex gap-2 flex-wrap">
          {['Primary', 'Secondary', 'Accent'].map((label, i) => (
            <span
              key={label}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              data-cliq-target={i === 0 ? 'primary-btn palette' : i === 1 ? 'secondary-btn palette' : 'accent-badge palette'}
              style={{
                backgroundColor: i === 0
                  ? 'color-mix(in srgb, var(--primary) 15%, transparent)'
                  : i === 1
                  ? 'color-mix(in srgb, var(--secondary) 15%, transparent)'
                  : 'color-mix(in srgb, var(--tertiary) 15%, transparent)',
                color: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--secondary)' : 'var(--tertiary)',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
