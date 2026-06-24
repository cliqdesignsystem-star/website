'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'
import { Icon } from '@/components/common/Icon'

const ICON_PROVIDERS = [
  { id: 'lucide',       label: 'Lucide',      desc: 'Outlined SVG' },
  { id: 'fontawesome',  label: 'FontAwesome',  desc: 'Solid + outline' },
  { id: 'material',     label: 'Material',     desc: 'Google Symbols' },
] as const

const PREVIEW_ICON_NAMES = [
  'bell', 'star', 'mail', 'heart', 'search',
  'settings', 'home', 'user', 'download', 'share',
] as const

export function IconControls() {
  const { system, updateSystem } = useDesignStore()
  const { icons } = system

  return (
    <div className="flex flex-col gap-6">

      {/* ── Provider ────────────────────────────── */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Icon Provider
        </h4>
        <div className="flex flex-col gap-1.5">
          {ICON_PROVIDERS.map(p => (
            <button
              key={p.id}
              onClick={() => updateSystem({ icons: { provider: p.id as any } })}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left text-sm transition-colors ${
                icons.provider === p.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="font-medium">{p.label}</span>
              <span className={`text-[10px] ${icons.provider === p.id ? 'text-primary/70' : 'text-muted-foreground'}`}>
                {p.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Style ───────────────────────────────── */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Style
        </h4>
        <div className="flex gap-1 p-0.5 bg-muted rounded-lg w-fit">
          {(['outlined', 'filled'] as const).map(style => (
            <button
              key={style}
              onClick={() => updateSystem({ icons: { style } })}
              className={`text-xs px-3 py-1 rounded-md transition-colors ${
                icons.style === style
                  ? 'bg-background shadow-sm font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* ── Sizing ──────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sizing
        </h4>
        <LabeledSlider
          label="Stroke Width"
          value={icons.strokeWidth}
          min={1}
          max={3}
          step={0.25}
          varName="--icon-stroke-width"
          onChange={v => updateSystem({ icons: { strokeWidth: v } })}
        />
        <LabeledSlider
          label="Size Scale"
          value={icons.sizeScale}
          min={0.8}
          max={1.5}
          step={0.05}
          varName="--icon-size-scale"
          onChange={v => updateSystem({ icons: { sizeScale: v } })}
        />
      </section>

      {/* ── Preview ─────────────────────────────── */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Preview
        </h4>
        <div className="flex flex-wrap gap-3 p-4 rounded-xl border border-border bg-surface">
          {PREVIEW_ICON_NAMES.map(name => (
            <Icon
              key={name}
              name={name}
              size={16}
              style={{ color: 'var(--foreground)' }}
            />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Icons in the preview canvas update to match your selection.
        </p>
      </section>

    </div>
  )
}
