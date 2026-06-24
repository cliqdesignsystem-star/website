'use client'

import { useState } from 'react'
import { Shuffle, X } from 'lucide-react'
import { useDesignStore } from '@/stores/designStore'
import { ColorPicker } from '@/components/common/ColorPicker'
import { RatioVisualizer } from '@/components/common/RatioVisualizer'
import { PALETTE_CATEGORIES, NEUTRAL_PRESETS, RATIO_PRESETS } from '@/lib/presets'
import type { NeutralPreset, PalettePreset } from '@/lib/presets'
import { PremiumLock } from '@/components/common/PremiumLock'
import { cn } from '@/lib/utils'

function shuffleFrom<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function SavePrompt({ onSave }: { onSave: (name: string) => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  if (!open) return (
    <button onClick={() => setOpen(true)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
      + Save
    </button>
  )
  return (
    <div className="flex items-center gap-1">
      <input
        autoFocus
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && name.trim()) { onSave(name.trim()); setOpen(false); setName('') }
          if (e.key === 'Escape') { setOpen(false); setName('') }
        }}
        placeholder="Name…"
        className="h-6 text-xs px-2 border border-border rounded bg-background w-24 focus:outline-none focus:ring-1 ring-primary"
      />
      <button
        onClick={() => { if (name.trim()) { onSave(name.trim()); setOpen(false); setName('') } }}
        className="text-xs text-primary font-medium"
      >OK</button>
    </div>
  )
}

export function ColorControls() {
  const {
    system, updateSystem, setActiveTarget, userPlan,
    savedNeutrals, savedPalettes,
    saveCurrentNeutrals, saveCurrentPalette,
    removeSavedItem,
  } = useDesignStore()

  const isPro = userPlan !== 'free'
  const [neutralMode, setNeutralMode] = useState<'light' | 'dark'>('light')

  function applyNeutral(p: NeutralPreset) {
    updateSystem({ neutrals: { background: p.background, foreground: p.foreground, surface: p.surface, darkBackground: p.darkBackground, darkForeground: p.darkForeground, darkSurface: p.darkSurface } })
    setActiveTarget('neutrals')
  }

  function applyPalette(p: PalettePreset) {
    updateSystem({ palette: { primary: p.primary, secondary: p.secondary, tertiary: p.tertiary } })
    setActiveTarget('palette-primary')
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Color Ratio ──────────────────────────── */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Color Ratio
        </h4>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {RATIO_PRESETS.map(preset => (
            <PremiumLock key={preset.name} locked={!preset.free && !isPro}>
              <button
                onClick={() => (preset.free || isPro) && updateSystem({ ratio: preset.ratio })}
                className="w-full text-xs px-2 py-1.5 rounded-md border border-border hover:border-primary/50 transition-colors text-left"
              >
                <div className="font-semibold mb-0.5">{preset.name}</div>
                <div className="text-muted-foreground text-[10px]">
                  {preset.ratio.join(' / ')}
                </div>
              </button>
            </PremiumLock>
          ))}
        </div>
        <RatioVisualizer
          ratio={system.ratio}
          colors={system.ratio.length === 4
            ? [system.neutrals.background, system.palette.primary, system.palette.tertiary, system.palette.secondary]
            : [system.neutrals.background, system.palette.primary, system.palette.tertiary]
          }
          readOnly={!isPro}
          onChange={r => { updateSystem({ ratio: r }); setActiveTarget('hero-padding') }}
        />
      </section>

      {/* ── Neutrals ─────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Neutrals</h4>
          <div className="flex items-center gap-2">
            <SavePrompt onSave={saveCurrentNeutrals} />
            <button onClick={() => applyNeutral(shuffleFrom(NEUTRAL_PRESETS))} className="p-1 hover:bg-muted rounded transition-colors" title="Shuffle">
              <Shuffle className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {savedNeutrals.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] text-muted-foreground mb-1.5">Saved</p>
            <div className="grid grid-cols-3 gap-1.5">
              {savedNeutrals.map(p => (
                <div key={p.name} className="relative group">
                  <button onClick={() => applyNeutral(p)} className="w-full text-xs px-2 py-1.5 rounded-md border border-border hover:border-primary/50 transition-colors text-left">
                    <div className="flex gap-0.5 mb-0.5">
                      <div className="w-3 h-3 rounded-sm border border-border/50" style={{ backgroundColor: p.background }} />
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.surface }} />
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.foreground }} />
                    </div>
                    <span className="truncate block text-[10px]">{p.name}</span>
                  </button>
                  <button onClick={() => removeSavedItem('neutral', p.name)} className="absolute -top-1 -right-1 hidden group-hover:flex w-4 h-4 rounded-full bg-destructive text-white items-center justify-center">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1">Saved to browser storage</p>
          </div>
        )}

        <div className="flex gap-1 mb-3 p-0.5 bg-muted rounded-lg w-fit">
          {(['light', 'dark'] as const).map(mode => (
            <button key={mode} onClick={() => setNeutralMode(mode)} className={cn('text-xs px-3 py-1 rounded-md transition-colors', neutralMode === mode ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground')}>
              {mode === 'light' ? '☀ Light' : '🌙 Dark'}
            </button>
          ))}
        </div>

        {neutralMode === 'light' ? (
          <div className="flex flex-col gap-2.5">
            <ColorPicker label="Background" value={system.neutrals.background} varName="--background" onChange={v => { updateSystem({ neutrals: { background: v } }); setActiveTarget('neutrals') }} />
            <ColorPicker label="Foreground" value={system.neutrals.foreground} varName="--foreground" onChange={v => { updateSystem({ neutrals: { foreground: v } }); setActiveTarget('neutrals') }} />
            <ColorPicker label="Surface"    value={system.neutrals.surface}    varName="--surface"    onChange={v => { updateSystem({ neutrals: { surface: v } });    setActiveTarget('neutrals') }} />
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <ColorPicker label="Background (dark)" value={system.neutrals.darkBackground} onChange={v => { updateSystem({ neutrals: { darkBackground: v } }); setActiveTarget('neutrals') }} />
            <ColorPicker label="Foreground (dark)" value={system.neutrals.darkForeground} onChange={v => { updateSystem({ neutrals: { darkForeground: v } }); setActiveTarget('neutrals') }} />
            <ColorPicker label="Surface (dark)"    value={system.neutrals.darkSurface}    onChange={v => { updateSystem({ neutrals: { darkSurface: v } });    setActiveTarget('neutrals') }} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mt-3">
          {NEUTRAL_PRESETS.map(preset => (
            <button key={preset.name} onClick={() => applyNeutral(preset)} className="text-xs px-2 py-1.5 rounded-md border border-border hover:border-primary/50 transition-colors text-left" title={preset.name}>
              <div className="flex gap-0.5 mb-1">
                <div className="w-3 h-3 rounded-sm border border-border/50" style={{ backgroundColor: preset.background }} />
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.surface }} />
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.foreground }} />
              </div>
              <span className="truncate block">{preset.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Brand Palette ─────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Brand Palette</h4>
          <div className="flex items-center gap-2">
            <SavePrompt onSave={saveCurrentPalette} />
            <button onClick={() => applyPalette(shuffleFrom(PALETTE_CATEGORIES.flatMap(c => c.presets)))} className="p-1 hover:bg-muted rounded transition-colors" title="Shuffle">
              <Shuffle className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {savedPalettes.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] text-muted-foreground mb-1.5">Saved</p>
            <div className="grid grid-cols-2 gap-1.5">
              {savedPalettes.map(p => (
                <div key={p.name} className="relative group">
                  <button onClick={() => applyPalette(p)} className="w-full text-xs px-2 py-1.5 rounded-md border border-border hover:border-primary/50 transition-colors text-left">
                    <div className="flex gap-0.5 mb-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.primary }} />
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.secondary }} />
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.tertiary }} />
                    </div>
                    <span className="truncate block">{p.name}</span>
                  </button>
                  <button onClick={() => removeSavedItem('palette', p.name)} className="absolute -top-1 -right-1 hidden group-hover:flex w-4 h-4 rounded-full bg-destructive text-white items-center justify-center">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1">Saved to browser storage</p>
          </div>
        )}

        <div className="flex flex-col gap-2.5 mb-4">
          <ColorPicker label="Primary"   value={system.palette.primary}   varName="--primary"   onChange={v => { updateSystem({ palette: { primary: v } });   setActiveTarget('palette-primary') }} />
          <ColorPicker label="Secondary" value={system.palette.secondary} varName="--secondary" onChange={v => { updateSystem({ palette: { secondary: v } }); setActiveTarget('palette-secondary') }} />
          <ColorPicker label="Tertiary"  value={system.palette.tertiary}  varName="--tertiary"  onChange={v => { updateSystem({ palette: { tertiary: v } });  setActiveTarget('palette-tertiary') }} />
        </div>

        <div className="flex flex-col gap-4">
          {PALETTE_CATEGORIES.map(cat => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{cat.category}</span>
                <button onClick={() => applyPalette(shuffleFrom(cat.presets))} className="p-0.5 hover:bg-muted rounded transition-colors" title={`Shuffle ${cat.category}`}>
                  <Shuffle className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {cat.presets.map(preset => {
                  const isSelected = system.palette.primary === preset.primary && system.palette.secondary === preset.secondary
                  return (
                    <button
                      key={preset.name}
                      onClick={() => applyPalette(preset)}
                      className={cn('text-xs px-2 py-1.5 rounded-md border transition-colors text-left', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}
                    >
                      <div className="flex gap-0.5 mb-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.primary }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.secondary }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: preset.tertiary }} />
                      </div>
                      <span className="truncate block">{preset.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
