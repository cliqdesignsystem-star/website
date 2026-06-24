'use client'

import { Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useDesignStore } from '@/stores/designStore'

export function ThemeToggleSection() {
  const { system, setTheme } = useDesignStore()
  const isDark = system.theme === 'dark'

  return (
    <section className="section bg-background">
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            Light or dark — your system adapts.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Switch between themes and see your design system respond instantly.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch
              checked={isDark}
              onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
            />
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Light preview — always uses user's light neutrals */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid color-mix(in srgb, ${system.neutrals.foreground} 15%, transparent)` }}
          >
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{
                background: system.neutrals.background,
                borderBottom: `1px solid color-mix(in srgb, ${system.neutrals.foreground} 15%, transparent)`,
              }}
            >
              <Sun className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-medium" style={{ color: system.neutrals.foreground }}>Light</span>
            </div>
            <div className="p-4" style={{ background: system.neutrals.surface }}>
              <div
                className="rounded-xl p-4 mb-3"
                style={{
                  background: system.neutrals.background,
                  border: `1px solid color-mix(in srgb, ${system.neutrals.foreground} 12%, transparent)`,
                }}
              >
                <div className="text-sm font-semibold mb-1" style={{ color: system.neutrals.foreground }}>Card Title</div>
                <div className="text-xs" style={{ color: `color-mix(in srgb, ${system.neutrals.foreground} 55%, transparent)` }}>Your design in light mode.</div>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary text-xs px-3 py-1.5">Action</button>
                <button className="btn-secondary text-xs px-3 py-1.5">Cancel</button>
              </div>
            </div>
          </div>

          {/* Dark preview — always uses user's dark neutrals */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid color-mix(in srgb, ${system.neutrals.darkForeground} 15%, transparent)` }}
          >
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{
                background: system.neutrals.darkBackground,
                borderBottom: `1px solid color-mix(in srgb, ${system.neutrals.darkForeground} 15%, transparent)`,
              }}
            >
              <Moon className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium" style={{ color: system.neutrals.darkForeground }}>Dark</span>
            </div>
            <div className="p-4" style={{ background: system.neutrals.darkSurface }}>
              <div
                className="rounded-xl p-4 mb-3"
                style={{
                  background: system.neutrals.darkBackground,
                  border: `1px solid color-mix(in srgb, ${system.neutrals.darkForeground} 15%, transparent)`,
                }}
              >
                <div className="text-sm font-semibold mb-1" style={{ color: system.neutrals.darkForeground }}>Card Title</div>
                <div className="text-xs" style={{ color: `color-mix(in srgb, ${system.neutrals.darkForeground} 55%, transparent)` }}>Your design in dark mode.</div>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary text-xs px-3 py-1.5">Action</button>
                <button
                  className="text-xs px-3 py-1.5 font-medium"
                  style={{
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    background: 'transparent',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
