'use client'

import { useDesignStore } from '@/stores/designStore'
import { CheckCircle } from 'lucide-react'

export function StepFinal() {
  const { system } = useDesignStore()

  const summary = [
    { label: 'Background',    value: system.neutrals.background,  type: 'color' },
    { label: 'Primary',       value: system.palette.primary,       type: 'color' },
    { label: 'Secondary',     value: system.palette.secondary,     type: 'color' },
    { label: 'Display Font',  value: system.typography.displayFont, type: 'text' },
    { label: 'Body Font',     value: system.typography.bodyFont,    type: 'text' },
    { label: 'Border Radius', value: `${system.uiStyle.radius}px`, type: 'text' },
    { label: 'Section Padding',value: `${system.layout.sectionPadding}px`, type: 'text' },
    { label: 'Icons',         value: system.icons.provider,        type: 'text' },
    { label: 'Theme',         value: system.theme,                 type: 'text' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: 'var(--primary)' }} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display-family)' }}>
          Your system is ready.
        </h3>
        <p className="text-sm text-muted-foreground">
          Review your choices and enter the dashboard to explore and export.
        </p>
      </div>

      {/* Summary */}
      <div
        className="rounded-xl border border-border overflow-hidden"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        {summary.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <span className="text-sm text-muted-foreground">{item.label}</span>
            {item.type === 'color' ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded border border-border"
                  style={{ backgroundColor: item.value }}
                />
                <span className="text-xs font-mono text-muted-foreground">{item.value}</span>
              </div>
            ) : (
              <span className="text-sm font-medium capitalize">{item.value}</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Click <strong>Enter Dashboard</strong> below to continue.
      </p>
    </div>
  )
}
