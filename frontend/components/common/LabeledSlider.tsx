'use client'

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface LabeledSliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  varName?: string
  onChange: (value: number) => void
  className?: string
  disabled?: boolean
}

export function LabeledSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  varName,
  onChange,
  className,
  disabled,
}: LabeledSliderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1">
          <span className="text-sm font-mono tabular-nums text-muted-foreground">
            {value}{unit}
          </span>
          {varName && (
            <span className="text-xs text-muted-foreground font-mono ml-2">{varName}</span>
          )}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))}
        disabled={disabled}
        className={disabled ? 'opacity-50' : ''}
      />
    </div>
  )
}
