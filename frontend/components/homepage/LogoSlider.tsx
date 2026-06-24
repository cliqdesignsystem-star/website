'use client'

const LOGOS = [
  'Figma', 'Notion', 'Stripe', 'Vercel', 'Linear',
  'Framer', 'Loom', 'Arc', 'Pitch', 'Raycast',
]

export function LogoSlider() {
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
          Trusted by designers at
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-16 marquee-track whitespace-nowrap" style={{ width: 'max-content' }}>
          {/* Duplicate for seamless loop */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="flex items-center justify-center min-w-[120px]">
              <span
                className="text-xl font-bold tracking-tight text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
