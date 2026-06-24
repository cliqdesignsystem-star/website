'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'

export function Step6Components() {
  const { system, updateSystem } = useDesignStore()
  const { components } = system

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold mb-1">Components</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Fine-tune individual component styles for cards and modals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cards panel */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold border-b border-border pb-2">Cards</h4>
            <LabeledSlider
              label="Radius"
              value={components.card.radius}
              min={0}
              max={32}
              unit="px"
              onChange={v => updateSystem({ components: { card: { radius: v } } })}
            />
            <LabeledSlider
              label="Shadow"
              value={components.card.shadowIntensity}
              min={0}
              max={300}
              onChange={v => updateSystem({ components: { card: { shadowIntensity: v } } })}
            />
            <LabeledSlider
              label="Border Width"
              value={components.card.borderWidth}
              min={0}
              max={4}
              unit="px"
              onChange={v => updateSystem({ components: { card: { borderWidth: v } } })}
            />
            <LabeledSlider
              label="Padding"
              value={components.card.padding}
              min={8}
              max={48}
              unit="px"
              onChange={v => updateSystem({ components: { card: { padding: v } } })}
            />

            {/* Card preview */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: `${components.card.radius}px`,
                borderWidth: `${components.card.borderWidth}px`,
                borderStyle: 'solid',
                borderColor: 'var(--border)',
                padding: `${components.card.padding}px`,
                boxShadow: `0 4px 12px rgba(0,0,0,${components.card.shadowIntensity / 1000})`,
              }}
            >
              <div
                className="w-full h-24 rounded-lg mb-3"
                style={{ backgroundColor: `color-mix(in srgb, var(--primary) 15%, var(--surface))` }}
              />
              <div className="text-sm font-semibold mb-1">Card Title</div>
              <div className="text-xs text-muted-foreground mb-3">
                This is how your card component will look.
              </div>
              <button className="btn-primary text-xs px-3 py-1.5">Action</button>
            </div>
          </div>

          {/* Modals panel */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold border-b border-border pb-2">Modals</h4>
            <LabeledSlider
              label="Radius"
              value={components.modal.radius}
              min={0}
              max={32}
              unit="px"
              onChange={v => updateSystem({ components: { modal: { radius: v } } })}
            />
            <LabeledSlider
              label="Shadow Depth"
              value={components.modal.shadowIntensity}
              min={0}
              max={500}
              onChange={v => updateSystem({ components: { modal: { shadowIntensity: v } } })}
            />
            <LabeledSlider
              label="Backdrop Opacity"
              value={components.modal.backdropOpacity}
              min={0}
              max={80}
              unit="%"
              onChange={v => updateSystem({ components: { modal: { backdropOpacity: v } } })}
            />
            <LabeledSlider
              label="Max Width"
              value={components.modal.maxWidth}
              min={320}
              max={720}
              unit="px"
              onChange={v => updateSystem({ components: { modal: { maxWidth: v } } })}
            />

            {/* Modal preview */}
            <div className="relative overflow-hidden rounded-xl border border-border" style={{ minHeight: '180px' }}>
              {/* Backdrop */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: `rgba(0,0,0,${components.modal.backdropOpacity / 100})`,
                  backdropFilter: 'blur(2px)',
                }}
              />
              {/* Modal content */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%]"
                style={{
                  backgroundColor: 'var(--background)',
                  borderRadius: `${components.modal.radius}px`,
                  boxShadow: `0 8px 40px rgba(0,0,0,${components.modal.shadowIntensity / 1000})`,
                  padding: '16px',
                }}
              >
                <div className="text-sm font-semibold mb-1">Confirm Action</div>
                <div className="text-xs text-muted-foreground mb-3">
                  This modal uses your custom shadow and radius settings.
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary text-xs px-3 py-1">Confirm</button>
                  <button className="btn-secondary text-xs px-3 py-1">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
