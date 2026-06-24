'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'

export function LayoutControls() {
  const { system, updateSystem, setActiveTarget } = useDesignStore()
  const { layout, uiStyle, components } = system

  return (
    <div className="flex flex-col gap-6">

      {/* ── Spacing ─────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Spacing</h4>
        <LabeledSlider
          label="Page Max Width"
          value={layout.pageMaxWidth}
          min={720}
          max={1920}
          step={40}
          unit="px"
          varName="--page-max-width"
          onChange={v => { updateSystem({ layout: { pageMaxWidth: v } }); setActiveTarget('page-max-width') }}
        />
        <LabeledSlider
          label="Navbar Height"
          value={layout.navbarHeight}
          min={48}
          max={96}
          unit="px"
          varName="--navbar-height"
          onChange={v => { updateSystem({ layout: { navbarHeight: v } }); setActiveTarget('navbar-height') }}
        />
        <LabeledSlider
          label="Section Padding"
          value={layout.sectionPadding}
          min={40}
          max={120}
          unit="px"
          varName="--section-padding"
          onChange={v => { updateSystem({ layout: { sectionPadding: v } }); setActiveTarget('section-padding') }}
        />
        <LabeledSlider
          label="Hero Padding"
          value={layout.heroPadding}
          min={60}
          max={160}
          unit="px"
          varName="--hero-padding"
          onChange={v => { updateSystem({ layout: { heroPadding: v } }); setActiveTarget('hero-padding') }}
        />
        <LabeledSlider
          label="Grid Gap"
          value={layout.gridGap}
          min={8}
          max={48}
          unit="px"
          varName="--grid-gap"
          onChange={v => { updateSystem({ layout: { gridGap: v } }); setActiveTarget('grid-gap') }}
        />
      </section>

      {/* ── Global Defaults ──────────────────────── */}
      <section className="flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Globals</h4>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">Applied to all components unless overridden</p>
        </div>
        <LabeledSlider label="Border Radius"    value={uiStyle.radius}          min={0}   max={24}  unit="px"  varName="--radius"        onChange={v => { updateSystem({ uiStyle: { radius: v } });          setActiveTarget('radius-global') }} />
        <LabeledSlider label="Shadow Intensity" value={uiStyle.shadowIntensity} min={0}   max={300}            varName="--shadow"        onChange={v => { updateSystem({ uiStyle: { shadowIntensity: v } }); setActiveTarget('card-shadow') }} />
        <LabeledSlider label="Border Width"     value={uiStyle.borderWidth}     min={0}   max={4}   unit="px"  varName="--border-width"  onChange={v => { updateSystem({ uiStyle: { borderWidth: v } });     setActiveTarget('border-width') }} />
        <LabeledSlider label="Spacing Scale"    value={uiStyle.spacingScale}    min={0.5} max={2}   step={0.1} varName="--spacing-scale" onChange={v => { updateSystem({ uiStyle: { spacingScale: v } });    setActiveTarget('spacing-scale') }} />
      </section>

      {/* ── Cards ───────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cards</h4>
        <LabeledSlider label="Radius"   value={components.card.radius}          min={0}   max={32}  unit="px" onChange={v => { updateSystem({ components: { card: { radius: v } } });          setActiveTarget('card-radius') }} />
        <LabeledSlider label="Shadow"   value={components.card.shadowIntensity} min={0}   max={300}          onChange={v => { updateSystem({ components: { card: { shadowIntensity: v } } }); setActiveTarget('card-shadow') }} />
        <LabeledSlider label="Border"   value={components.card.borderWidth}     min={0}   max={4}   unit="px" onChange={v => { updateSystem({ components: { card: { borderWidth: v } } });     setActiveTarget('card-border') }} />
        <LabeledSlider label="Padding"  value={components.card.padding}         min={8}   max={48}  unit="px" onChange={v => { updateSystem({ components: { card: { padding: v } } });         setActiveTarget('card-padding') }} />
      </section>

      {/* ── Modals ──────────────────────────────── */}
      <section className="flex flex-col gap-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modals</h4>
        <LabeledSlider label="Radius"           value={components.modal.radius}          min={0}   max={32}  unit="px" onChange={v => { updateSystem({ components: { modal: { radius: v } } });          setActiveTarget('modal-radius') }} />
        <LabeledSlider label="Shadow"           value={components.modal.shadowIntensity} min={0}   max={500}          onChange={v => { updateSystem({ components: { modal: { shadowIntensity: v } } }); setActiveTarget('modal-shadow') }} />
        <LabeledSlider label="Backdrop Opacity" value={components.modal.backdropOpacity} min={0}   max={80}  unit="%" onChange={v => { updateSystem({ components: { modal: { backdropOpacity: v } } }); setActiveTarget('modal-backdrop') }} />
        <LabeledSlider label="Max Width"        value={components.modal.maxWidth}        min={320} max={720} unit="px" onChange={v => { updateSystem({ components: { modal: { maxWidth: v } } });        setActiveTarget('modal-radius') }} />
      </section>

    </div>
  )
}
