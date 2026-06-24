'use client'

import { Code2, Settings, FileJson, FileCode, FileText, ArrowRight } from 'lucide-react'
import { useDesignStore } from '@/stores/designStore'

const EXPORT_FORMATS = [
  { icon: Code2, label: 'CSS Variables', desc: 'Ready-to-paste :root{} block' },
  { icon: Settings, label: 'Tailwind Config', desc: 'theme.extend with your colors' },
  { icon: FileJson, label: 'JSON Tokens', desc: 'Style Dictionary compatible' },
  { icon: FileCode, label: 'HTML Template', desc: 'Standalone design system doc' },
  { icon: FileText, label: 'Markdown', desc: 'Human-readable token reference' },
]

export function ExportSection() {
  const { setShowOnboarding } = useDesignStore()

  return (
    <section className="section" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-heading-family)' }}
            >
              Export your system, ready to build.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Take your design system anywhere — as code, tokens, or a complete template.
            </p>
            <button
              onClick={() => setShowOnboarding(true)}
              className="btn-primary"
            >
              Start Designing
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {EXPORT_FORMATS.map(fmt => (
              <div
                key={fmt.label}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
                >
                  <fmt.icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{fmt.label}</div>
                  <div className="text-xs text-muted-foreground">{fmt.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
