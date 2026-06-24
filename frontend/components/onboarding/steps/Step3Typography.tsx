'use client'

import { useEffect } from 'react'
import { useDesignStore } from '@/stores/designStore'
import { FontSelector } from '@/components/common/FontSelector'
import { LabeledSlider } from '@/components/common/LabeledSlider'
import { FONT_PRESETS } from '@/lib/presets'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TextCasing } from '@/types/design'
import { loadGoogleFont } from '@/lib/fontLoader'
import { cn } from '@/lib/utils'

export function Step3Typography() {
  const { system, updateSystem, userPlan } = useDesignStore()

  useEffect(() => {
    FONT_PRESETS.forEach(p => {
      loadGoogleFont(p.display).catch(() => {})
      if (p.body !== p.display) loadGoogleFont(p.body).catch(() => {})
    })
  }, [])
  const isPro = userPlan !== 'free'

  async function applyFontPreset(preset: typeof FONT_PRESETS[number]) {
    await Promise.all([
      loadGoogleFont(preset.display),
      loadGoogleFont(preset.heading),
      loadGoogleFont(preset.body),
    ])
    updateSystem({
      typography: {
        displayFont: preset.display,
        headingFont: preset.heading,
        bodyFont: preset.body,
      },
    })
  }

  return (
    <div className="grid grid-cols-2 gap-6 min-h-0">
      {/* ── Left: Settings ───────────────────── */}
      <div className="flex flex-col gap-4 overflow-y-auto pr-1">
        <div>
          <h3 className="text-base font-semibold mb-1">Typography System</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Font pairings that define voice and hierarchy.
          </p>
        </div>

        {/* Font presets */}
        <div className="grid grid-cols-2 gap-2">
          {FONT_PRESETS.map(preset => {
            const isSelected = system.typography.displayFont === preset.display && system.typography.bodyFont === preset.body
            return (
              <button
                key={preset.name}
                onClick={() => applyFontPreset(preset)}
                style={{ fontFamily: `'${preset.display}', sans-serif` }}
                className={cn('p-3 rounded-xl border text-left transition-colors', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}
              >
                <div className="font-semibold text-sm mb-0.5">{preset.name}</div>
                <div style={{ fontFamily: `'${preset.body}', sans-serif` }} className="text-[10px] text-muted-foreground truncate">
                  {preset.display} / {preset.body}
                </div>
              </button>
            )
          })}
        </div>

        {/* Font selectors */}
        <div className="flex flex-col gap-3">
          <FontSelector
            label="Display Font (H1)"
            varName="--font-display-family"
            value={system.typography.displayFont}
            onChange={async v => {
              await loadGoogleFont(v)
              updateSystem({ typography: { displayFont: v } })
            }}
            disabled={!isPro}
          />
          <FontSelector
            label="Heading Font (H2–H6)"
            varName="--font-heading-family"
            value={system.typography.headingFont}
            onChange={async v => {
              await loadGoogleFont(v)
              updateSystem({ typography: { headingFont: v } })
            }}
            disabled={!isPro}
          />
          <FontSelector
            label="Body Font"
            varName="--font-body-family"
            value={system.typography.bodyFont}
            onChange={async v => {
              await loadGoogleFont(v)
              updateSystem({ typography: { bodyFont: v } })
            }}
            disabled={!isPro}
          />
        </div>

        {/* Size + weight */}
        <div className="grid grid-cols-2 gap-3">
          <LabeledSlider
            label="Base Font Size"
            value={system.typography.fontSize}
            min={12}
            max={24}
            unit="px"
            varName="--font-size-base"
            onChange={v => updateSystem({ typography: { fontSize: v } })}
          />
          <LabeledSlider
            label="Body Weight"
            value={system.typography.bodyWeight}
            min={300}
            max={700}
            step={100}
            varName="--font-weight-body"
            onChange={v => updateSystem({ typography: { bodyWeight: v } })}
          />
        </div>

        {/* Text case */}
        <div>
          <label className="text-sm font-medium block mb-2">Text Case</label>
          <Select
            value={system.typography.casing}
            onValueChange={(v: TextCasing | null) => v && updateSystem({ typography: { casing: v } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Default (Aa)</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Right: Live Preview ───────────────── */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Live Preview
        </div>

        <div className="rounded-xl border border-border overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="text-[10px] text-muted-foreground font-mono mb-1.5">H1 · Display</div>
            <p
              className="text-2xl font-bold leading-tight"
              style={{
                fontFamily: `'${system.typography.displayFont}', sans-serif`,
                textTransform: system.typography.casing === 'none' ? 'none' : system.typography.casing,
              }}
            >
              The quick brown fox
            </p>
          </div>
          <div className="p-4 border-b border-border bg-background">
            <div className="text-[10px] text-muted-foreground font-mono mb-1.5">H2 · Heading</div>
            <p
              className="text-lg font-semibold"
              style={{ fontFamily: `'${system.typography.headingFont}', sans-serif` }}
            >
              A fast brown fox leaps over a sleepy dog.
            </p>
          </div>
          <div className="p-4" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="text-[10px] text-muted-foreground font-mono mb-1.5">Body · Reading</div>
            <p
              className="leading-relaxed text-muted-foreground"
              style={{
                fontFamily: `'${system.typography.bodyFont}', sans-serif`,
                fontSize: `${system.typography.fontSize}px`,
                fontWeight: system.typography.bodyWeight,
              }}
            >
              Once upon a time, a quick brown fox jumped over a lazy dog. The scene was calm, yet full
              of motion — a perfect balance of energy and stillness.
            </p>
          </div>
        </div>

        {/* Scale reference */}
        <div className="rounded-xl border border-border p-4 flex flex-col gap-2" style={{ backgroundColor: 'var(--surface)' }}>
          {[
            { label: 'Display', size: 32, font: system.typography.displayFont, weight: 700 },
            { label: 'H2', size: 24, font: system.typography.headingFont, weight: 600 },
            { label: 'H3', size: 20, font: system.typography.headingFont, weight: 600 },
            { label: 'Body', size: system.typography.fontSize, font: system.typography.bodyFont, weight: system.typography.bodyWeight },
            { label: 'Small', size: Math.max(10, system.typography.fontSize - 2), font: system.typography.bodyFont, weight: system.typography.bodyWeight },
          ].map(s => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="text-[10px] text-muted-foreground w-10 shrink-0">{s.label}</span>
              <span style={{ fontFamily: `'${s.font}', sans-serif`, fontSize: s.size, fontWeight: s.weight, lineHeight: 1.2 }}>
                Aa
              </span>
              <span className="text-[10px] text-muted-foreground">{s.size}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
