'use client'

import { useEffect, useState } from 'react'
import { Shuffle, X } from 'lucide-react'
import { useDesignStore } from '@/stores/designStore'
import { FontSelector } from '@/components/common/FontSelector'
import { LabeledSlider } from '@/components/common/LabeledSlider'
import { FONT_PRESETS } from '@/lib/presets'
import type { FontPreset } from '@/lib/presets'
import { loadGoogleFont } from '@/lib/fontLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TextCasing } from '@/types/design'
import { cn } from '@/lib/utils'

function shuffleFrom<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function SavePrompt({ onSave }: { onSave: (name: string) => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  if (!open) return (
    <button onClick={() => setOpen(true)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">+ Save</button>
  )
  return (
    <div className="flex items-center gap-1">
      <input autoFocus value={name} onChange={e => setName(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { onSave(name.trim()); setOpen(false); setName('') } if (e.key === 'Escape') { setOpen(false); setName('') } }}
        placeholder="Name…" className="h-6 text-xs px-2 border border-border rounded bg-background w-24 focus:outline-none focus:ring-1 ring-primary" />
      <button onClick={() => { if (name.trim()) { onSave(name.trim()); setOpen(false); setName('') } }} className="text-xs text-primary font-medium">OK</button>
    </div>
  )
}

export function TypographyControls() {
  const {
    system, updateSystem, userPlan, setActiveTarget,
    savedFontPairings, saveCurrentFontPairing, removeSavedItem,
  } = useDesignStore()
  const isPro = userPlan !== 'free'
  const { typography } = system

  // Pre-load all preset fonts on mount for card previews
  useEffect(() => {
    FONT_PRESETS.forEach(p => {
      loadGoogleFont(p.display).catch(() => {})
      if (p.body !== p.display) loadGoogleFont(p.body).catch(() => {})
    })
  }, [])

  async function applyPreset(preset: FontPreset) {
    await Promise.all([
      loadGoogleFont(preset.display).catch(() => {}),
      loadGoogleFont(preset.heading).catch(() => {}),
      loadGoogleFont(preset.body).catch(() => {}),
    ])
    updateSystem({ typography: { displayFont: preset.display, headingFont: preset.heading, bodyFont: preset.body } })
    setActiveTarget('font-display')
  }

  async function shuffleFont() {
    await applyPreset(shuffleFrom(FONT_PRESETS))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Font Pairings ─────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Font Pairings</h4>
          <div className="flex items-center gap-2">
            <SavePrompt onSave={saveCurrentFontPairing} />
            <button onClick={shuffleFont} className="p-1 hover:bg-muted rounded transition-colors" title="Shuffle">
              <Shuffle className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {savedFontPairings.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] text-muted-foreground mb-1.5">Saved</p>
            <div className="grid grid-cols-2 gap-1.5">
              {savedFontPairings.map(p => {
                const isSelected = typography.displayFont === p.display && typography.bodyFont === p.body
                return (
                  <div key={p.name} className="relative group">
                    <button
                      onClick={() => applyPreset(p)}
                      style={{ fontFamily: `'${p.display}', sans-serif` }}
                      className={cn('w-full text-xs px-2 py-2 rounded-md border transition-colors text-left', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}
                    >
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div style={{ fontFamily: `'${p.body}', sans-serif` }} className="text-[10px] text-muted-foreground mt-0.5">{p.display} / {p.body}</div>
                    </button>
                    <button onClick={() => removeSavedItem('font', p.name)} className="absolute -top-1 -right-1 hidden group-hover:flex w-4 h-4 rounded-full bg-destructive text-white items-center justify-center">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )
              })}
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1">Saved to browser storage</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {FONT_PRESETS.map(preset => {
            const isSelected = typography.displayFont === preset.display && typography.bodyFont === preset.body
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                style={{ fontFamily: `'${preset.display}', sans-serif` }}
                className={cn('text-xs px-2 py-2 rounded-md border transition-colors text-left', isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}
              >
                <div className="font-semibold text-sm">{preset.name}</div>
                <div style={{ fontFamily: `'${preset.body}', sans-serif` }} className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {preset.display} / {preset.body}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Custom Fonts ─────────────────────────── */}
      <section className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fonts</h4>
        <FontSelector label="Display" value={typography.displayFont} disabled={!isPro} onChange={async v => { await loadGoogleFont(v).catch(() => {}); updateSystem({ typography: { displayFont: v } }); setActiveTarget('font-display') }} />
        <FontSelector label="Heading" value={typography.headingFont} disabled={!isPro} onChange={async v => { await loadGoogleFont(v).catch(() => {}); updateSystem({ typography: { headingFont: v } }); setActiveTarget('font-heading') }} />
        <FontSelector label="Body"    value={typography.bodyFont}    disabled={!isPro} onChange={async v => { await loadGoogleFont(v).catch(() => {}); updateSystem({ typography: { bodyFont: v } });    setActiveTarget('font-body') }} />
      </section>

      {/* ── Settings ─────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Settings</h4>
        <LabeledSlider label="Base Size"   value={typography.fontSize}   min={12} max={24} unit="px" onChange={v => { updateSystem({ typography: { fontSize: v } });   setActiveTarget('font-size') }} />
        <LabeledSlider label="Body Weight" value={typography.bodyWeight} min={300} max={700} step={100} onChange={v => { updateSystem({ typography: { bodyWeight: v } }); setActiveTarget('font-weight') }} />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Text Casing</label>
          <Select value={typography.casing} onValueChange={(v: TextCasing) => { updateSystem({ typography: { casing: v } }); setActiveTarget('font-casing') }}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Normal</SelectItem>
              <SelectItem value="uppercase">UPPERCASE</SelectItem>
              <SelectItem value="lowercase">lowercase</SelectItem>
              <SelectItem value="capitalize">Capitalize</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  )
}
