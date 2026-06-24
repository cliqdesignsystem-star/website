'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'

export function Step5Layout() {
  const { system, updateSystem } = useDesignStore()
  const { layout } = system

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold mb-1">Layout System</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Control how your sections breathe — spacing, rhythm, and structure.
        </p>

        <div className="flex flex-col gap-5">
          <LabeledSlider
            label="Navbar Height"
            value={layout.navbarHeight}
            min={48}
            max={96}
            unit="px"
            varName="--navbar-height"
            onChange={v => updateSystem({ layout: { navbarHeight: v } })}
          />
          <LabeledSlider
            label="Section Padding"
            value={layout.sectionPadding}
            min={40}
            max={120}
            unit="px"
            varName="--section-padding"
            onChange={v => updateSystem({ layout: { sectionPadding: v } })}
          />
          <LabeledSlider
            label="Hero Padding"
            value={layout.heroPadding}
            min={60}
            max={160}
            unit="px"
            varName="--hero-padding"
            onChange={v => updateSystem({ layout: { heroPadding: v } })}
          />
          <LabeledSlider
            label="Grid Gap"
            value={layout.gridGap}
            min={8}
            max={48}
            unit="px"
            varName="--grid-gap"
            onChange={v => updateSystem({ layout: { gridGap: v } })}
          />
        </div>
      </div>

      {/* Skeleton preview */}
      <div className="border border-border rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
        {/* Navbar */}
        <div
          className="border-b border-border flex items-center justify-between px-4"
          style={{ height: `${Math.round(layout.navbarHeight * 0.5)}px`, backgroundColor: 'var(--surface)' }}
        >
          <div className="text-xs font-semibold text-muted-foreground">Navbar</div>
          <div className="flex gap-2">
            <div className="w-10 h-2 rounded bg-border" />
            <div className="w-10 h-2 rounded bg-border" />
            <div
              className="h-4 w-14 rounded text-xs text-white flex items-center justify-center font-medium"
              style={{ backgroundColor: 'var(--primary)', fontSize: '8px' }}
            >
              CTA
            </div>
          </div>
        </div>

        {/* Hero */}
        <div
          className="border-b border-border flex flex-col items-center justify-center gap-2 text-center"
          style={{ padding: `${Math.round(layout.heroPadding * 0.3)}px 16px` }}
        >
          <div className="w-2/3 h-3 rounded bg-border" />
          <div className="w-1/2 h-2 rounded bg-border/60" />
          <div className="flex gap-2 mt-2">
            <div className="w-14 h-5 rounded" style={{ backgroundColor: 'var(--primary)' }} />
            <div className="w-14 h-5 rounded border border-border" />
          </div>
        </div>

        {/* Features grid */}
        <div
          className="border-b border-border"
          style={{ padding: `${Math.round(layout.sectionPadding * 0.3)}px 16px` }}
        >
          <div
            className="grid grid-cols-3"
            style={{ gap: `${Math.round(layout.gridGap * 0.5)}px` }}
          >
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded border border-border p-2"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div className="w-4 h-4 rounded mb-1" style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }} />
                <div className="w-full h-1.5 rounded bg-border mb-1" />
                <div className="w-3/4 h-1.5 rounded bg-border/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-center"
          style={{ height: '24px', backgroundColor: 'var(--surface)' }}
        >
          <div className="text-xs text-muted-foreground">Footer</div>
        </div>
      </div>
    </div>
  )
}
