'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'

export function UIStyleControls() {
  const { system, updateSystem, setActiveTarget } = useDesignStore()
  const { uiStyle, components } = system

  return (
    <div className="flex flex-col gap-6">

      {/* ── Cards (most specific) ────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cards</h4>
        <LabeledSlider label="Radius"      value={components.card.radius}          min={0}   max={32}  unit="px" onChange={v => { updateSystem({ components: { card: { radius: v } } });          setActiveTarget('card-radius') }} />
        <LabeledSlider label="Shadow"      value={components.card.shadowIntensity} min={0}   max={300}          onChange={v => { updateSystem({ components: { card: { shadowIntensity: v } } }); setActiveTarget('card-shadow') }} />
        <LabeledSlider label="Border"      value={components.card.borderWidth}     min={0}   max={4}   unit="px" onChange={v => { updateSystem({ components: { card: { borderWidth: v } } });     setActiveTarget('card-border') }} />
        <LabeledSlider label="Padding"     value={components.card.padding}         min={8}   max={48}  unit="px" onChange={v => { updateSystem({ components: { card: { padding: v } } });         setActiveTarget('card-padding') }} />
      </section>

      {/* ── Modals (most specific) ───────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modals</h4>
        <LabeledSlider label="Radius"          value={components.modal.radius}          min={0}   max={32}  unit="px" onChange={v => { updateSystem({ components: { modal: { radius: v } } });          setActiveTarget('modal-radius') }} />
        <LabeledSlider label="Shadow"          value={components.modal.shadowIntensity} min={0}   max={500}          onChange={v => { updateSystem({ components: { modal: { shadowIntensity: v } } }); setActiveTarget('modal-shadow') }} />
        <LabeledSlider label="Backdrop Opacity" value={components.modal.backdropOpacity} min={0}  max={80}  unit="%" onChange={v => { updateSystem({ components: { modal: { backdropOpacity: v } } }); setActiveTarget('modal-backdrop') }} />
        <LabeledSlider label="Max Width"       value={components.modal.maxWidth}        min={320} max={720} unit="px" onChange={v => { updateSystem({ components: { modal: { maxWidth: v } } });        setActiveTarget('modal-radius') }} />
      </section>

      {/* ── Global Defaults (least specific) ─────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Global — Defaults</h4>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">Applied to all components unless overridden above</p>
        </div>
        <LabeledSlider label="Border Radius"   value={uiStyle.radius}          min={0}   max={24}  unit="px"  varName="--radius"        onChange={v => { updateSystem({ uiStyle: { radius: v } });          setActiveTarget('radius-global') }} />
        <LabeledSlider label="Shadow Intensity" value={uiStyle.shadowIntensity} min={0}   max={300}            varName="--shadow"        onChange={v => { updateSystem({ uiStyle: { shadowIntensity: v } }); setActiveTarget('card-shadow') }} />
        <LabeledSlider label="Border Width"    value={uiStyle.borderWidth}     min={0}   max={4}   unit="px"  varName="--border-width"  onChange={v => { updateSystem({ uiStyle: { borderWidth: v } });     setActiveTarget('border-width') }} />
        <LabeledSlider label="Spacing Scale"   value={uiStyle.spacingScale}    min={0.5} max={2}   step={0.1} varName="--spacing-scale" onChange={v => { updateSystem({ uiStyle: { spacingScale: v } });    setActiveTarget('spacing-scale') }} />
      </section>
    </div>
  )
}
