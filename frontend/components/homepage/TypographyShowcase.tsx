'use client'

export function TypographyShowcase() {
  return (
    <section className="section bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            Typography that speaks.
          </h2>
          <p className="text-muted-foreground text-lg">
            Every font role — display, heading, body — previewed live with your system.
          </p>
        </div>

        <div className="border border-border rounded-2xl overflow-hidden">
          {/* Display heading */}
          <div data-cliq-target="display-text typography" className="p-8 border-b border-border" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="text-xs text-muted-foreground font-mono mb-3">
              --font-display-family · H1 · Display
            </div>
            <p
              className="text-5xl font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-display-family)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>

          {/* Heading */}
          <div data-cliq-target="body-text typography" className="p-8 border-b border-border bg-background">
            <div className="text-xs text-muted-foreground font-mono mb-3">
              --font-heading-family · H2 · Subheadline
            </div>
            <p
              className="text-3xl font-semibold leading-snug"
              style={{ fontFamily: 'var(--font-heading-family)' }}
            >
              A fast brown fox leaps over a sleepy dog in a quiet field.
            </p>
          </div>

          {/* Body */}
          <div data-cliq-target="body-text typography" className="p-8" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="text-xs text-muted-foreground font-mono mb-3">
              --font-body-family · Body · Reading
            </div>
            <p
              className="text-base leading-relaxed max-w-2xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-body-family)' }}
            >
              Once upon a time, a quick brown fox jumped over a lazy dog resting under the warm sun.
              The scene was calm, yet full of motion — a perfect balance of energy and stillness,
              just like a well-designed interface. The fox moved with purpose; the dog, with
              contentment. And in that moment, the whole world felt designed just right.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
