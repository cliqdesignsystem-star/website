'use client'

import { useDesignStore } from '@/stores/designStore'
import { LabeledSlider } from '@/components/common/LabeledSlider'

export function Step4UIStyle() {
  const { system, updateSystem } = useDesignStore()
  const { uiStyle } = system

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold mb-1">UI Style</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Shape how your interface feels — roundness, depth, weight, and density.
        </p>

        <div className="flex flex-col gap-5">
          <LabeledSlider
            label="Border Radius"
            value={uiStyle.radius}
            min={0}
            max={24}
            unit="px"
            varName="--radius"
            onChange={v => updateSystem({ uiStyle: { radius: v } })}
          />
          <LabeledSlider
            label="Shadow Intensity"
            value={uiStyle.shadowIntensity}
            min={0}
            max={300}
            varName="--shadow"
            onChange={v => updateSystem({ uiStyle: { shadowIntensity: v } })}
          />
          <LabeledSlider
            label="Border Width"
            value={uiStyle.borderWidth}
            min={0}
            max={4}
            unit="px"
            varName="--border-width"
            onChange={v => updateSystem({ uiStyle: { borderWidth: v } })}
          />
          <LabeledSlider
            label="Spacing Scale"
            value={uiStyle.spacingScale}
            min={0.5}
            max={2}
            step={0.1}
            varName="--spacing-scale"
            onChange={v => updateSystem({ uiStyle: { spacingScale: v } })}
          />
        </div>
      </div>

      {/* Live preview */}
      <div className="border border-border rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: 'var(--surface)' }}>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</h4>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
          <button
            className="font-medium border text-foreground"
            style={{
              padding: `${0.5 * uiStyle.spacingScale}rem ${1 * uiStyle.spacingScale}rem`,
              borderRadius: `${uiStyle.radius}px`,
              borderWidth: `${uiStyle.borderWidth}px`,
              borderStyle: 'solid',
              borderColor: 'var(--border)',
            }}
          >
            Ghost
          </button>
        </div>

        {/* Input */}
        <input
          className="w-full bg-background text-sm focus:outline-none"
          placeholder="Type something..."
          readOnly
          style={{
            padding: `${0.5 * uiStyle.spacingScale}rem ${0.75 * uiStyle.spacingScale}rem`,
            borderRadius: `${uiStyle.radius}px`,
            borderWidth: `${uiStyle.borderWidth}px`,
            borderStyle: 'solid',
            borderColor: 'var(--border)',
            boxShadow: uiStyle.shadowIntensity > 50 ? `inset 0 1px 2px rgba(0,0,0,${uiStyle.shadowIntensity / 2000})` : 'none',
          }}
        />

        {/* Card */}
        <div
          style={{
            backgroundColor: 'var(--background)',
            borderRadius: `${uiStyle.radius * 1.5}px`,
            borderWidth: `${uiStyle.borderWidth}px`,
            borderStyle: 'solid',
            borderColor: 'var(--border)',
            padding: `${1.5 * uiStyle.spacingScale}rem`,
            boxShadow: `0 4px 12px rgba(0,0,0,${uiStyle.shadowIntensity / 1000})`,
          }}
        >
          <div className="text-sm font-semibold mb-1">Card Component</div>
          <div className="text-xs text-muted-foreground">
            Border radius {uiStyle.radius}px · Shadow {uiStyle.shadowIntensity / 10}% · Scale {uiStyle.spacingScale}×
          </div>
        </div>
      </div>
    </div>
  )
}
