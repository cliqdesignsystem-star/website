'use client'

import { HexColorPicker, HexColorInput } from 'react-colorful'
import { cn } from '@/lib/utils'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  varName?: string
  className?: string
}

export function ColorPicker({ value, onChange, label, varName, className }: ColorPickerProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          {varName && (
            <span className="text-xs text-muted-foreground font-mono">{varName}</span>
          )}
        </div>
      )}
      <HexColorPicker color={value} onChange={onChange} style={{ width: '100%' }} />
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded border border-border flex-shrink-0"
          style={{ backgroundColor: value }}
        />
        <HexColorInput
          color={value}
          onChange={onChange}
          prefixed
          className="flex-1 h-8 px-2 text-sm font-mono border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  )
}
