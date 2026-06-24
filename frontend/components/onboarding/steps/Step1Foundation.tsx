'use client'

import { useState } from 'react'
import { ColorPicker } from '@/components/common/ColorPicker'
import { useDesignStore } from '@/stores/designStore'
import { PALETTE_PRESETS, NEUTRAL_PRESETS } from '@/lib/presets'
import { cn } from '@/lib/utils'

export function Step1Foundation() {
  const { system, updateSystem } = useDesignStore()
  const [neutralMode, setNeutralMode] = useState<'light' | 'dark'>('light')

  return (
    <div className="flex flex-col gap-8">
      {/* Neutrals */}
      <div>
        <h3 className="text-base font-semibold mb-1">Core Neutrals</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Define your base environment — background, text, and surfaces.
        </p>

        {/* Neutral presets */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {NEUTRAL_PRESETS.map(preset => {
            const isSelected = system.neutrals.background === preset.background && system.neutrals.foreground === preset.foreground
            return (
            <button
              key={preset.name}
              onClick={() => updateSystem({ neutrals: { background: preset.background, foreground: preset.foreground, surface: preset.surface, darkBackground: preset.darkBackground, darkForeground: preset.darkForeground, darkSurface: preset.darkSurface } })}
              className={cn('p-2 rounded-lg border transition-colors text-left', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/60')}
              title={preset.name}
            >
              <div className="flex gap-1 mb-1.5">
                <div className="w-4 h-4 rounded-sm border border-border/50" style={{ backgroundColor: preset.background }} />
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.foreground }} />
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.surface }} />
              </div>
              <span className="text-xs text-muted-foreground">{preset.name}</span>
            </button>
          )})}
        </div>

        {/* Light / Dark tab */}
        <div className="flex gap-1 mb-3 p-0.5 bg-muted rounded-lg w-fit">
          {(['light', 'dark'] as const).map(mode => (
            <button key={mode} onClick={() => setNeutralMode(mode)} className={cn('text-xs px-3 py-1 rounded-md transition-colors', neutralMode === mode ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground')}>
              {mode === 'light' ? '☀ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>

        {neutralMode === 'light' ? (
          <div className="grid grid-cols-3 gap-4">
            <ColorPicker label="Background" varName="--background" value={system.neutrals.background} onChange={v => updateSystem({ neutrals: { background: v } })} />
            <ColorPicker label="Foreground" varName="--foreground" value={system.neutrals.foreground} onChange={v => updateSystem({ neutrals: { foreground: v } })} />
            <ColorPicker label="Surface"    varName="--surface"    value={system.neutrals.surface}    onChange={v => updateSystem({ neutrals: { surface: v } })} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <ColorPicker label="Background (dark)" value={system.neutrals.darkBackground} onChange={v => updateSystem({ neutrals: { darkBackground: v } })} />
            <ColorPicker label="Foreground (dark)" value={system.neutrals.darkForeground} onChange={v => updateSystem({ neutrals: { darkForeground: v } })} />
            <ColorPicker label="Surface (dark)"    value={system.neutrals.darkSurface}    onChange={v => updateSystem({ neutrals: { darkSurface: v } })} />
          </div>
        )}
      </div>

      {/* Brand Palette */}
      <div>
        <h3 className="text-base font-semibold mb-1">Brand Palette</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Define your identity — primary, secondary, and accent colors.
        </p>

        {/* Palette presets */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {PALETTE_PRESETS.map(preset => {
            const isSelected = system.palette.primary === preset.primary && system.palette.secondary === preset.secondary && system.palette.tertiary === preset.tertiary
            return (
            <button
              key={preset.name}
              onClick={() => updateSystem({ palette: { primary: preset.primary, secondary: preset.secondary, tertiary: preset.tertiary } })}
              className={cn('p-2 rounded-lg border transition-colors text-left', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/60')}
            >
              <div className="flex gap-1 mb-1.5">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.primary }} />
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.secondary }} />
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.tertiary }} />
              </div>
              <span className="text-xs text-muted-foreground">{preset.name}</span>
            </button>
          )})}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ColorPicker
            label="Primary"
            varName="--primary"
            value={system.palette.primary}
            onChange={v => updateSystem({ palette: { primary: v } })}
          />
          <ColorPicker
            label="Secondary"
            varName="--secondary"
            value={system.palette.secondary}
            onChange={v => updateSystem({ palette: { secondary: v } })}
          />
          <ColorPicker
            label="Accent"
            varName="--tertiary"
            value={system.palette.tertiary}
            onChange={v => updateSystem({ palette: { tertiary: v } })}
          />
        </div>
      </div>

      {/* Live preview strip */}
      <div
        className="rounded-xl p-4 border border-border flex items-center gap-3 flex-wrap"
        style={{ backgroundColor: system.neutrals.surface }}
      >
        <button className="btn-primary text-sm">Primary Button</button>
        <button className="btn-secondary text-sm">Secondary</button>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `color-mix(in srgb, var(--tertiary) 15%, transparent)`,
            color: 'var(--tertiary)',
          }}
        >
          Accent Badge
        </span>
        <span className="text-sm" style={{ color: system.neutrals.foreground }}>
          Text sample
        </span>
      </div>
    </div>
  )
}
