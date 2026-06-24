'use client'

import { Settings, RotateCcw } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDesignStore } from '@/stores/designStore'
import { cn } from '@/lib/utils'
import type { FocusMode } from '@/types/design'

const FOCUS_OPTIONS: { value: FocusMode; label: string; description: string }[] = [
  { value: 'off',  label: 'Off',  description: 'No overlay while editing' },
  { value: 'dark', label: 'Dark', description: 'Vignette dims inactive areas' },
  { value: 'blur', label: 'Blur', description: 'Blurs inactive areas softly' },
]

export function SettingsMenu() {
  const { focusMode, setFocusMode, resetToDefault } = useDesignStore()

  return (
    <Popover>
      <PopoverTrigger
        title="Settings"
        className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'w-8 h-8 p-0' })}
      >
        <Settings className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-64 p-4 flex flex-col gap-4">

        {/* Focus Mode */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Focus Mode</div>
          <div className="text-xs text-muted-foreground -mt-1">Dims the preview while you adjust sliders</div>
          <div className="flex flex-col gap-1">
            {FOCUS_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setFocusMode(opt.value)}
                className={cn(
                  'text-left px-3 py-2 rounded-md text-sm transition-colors',
                  focusMode === opt.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <div className="font-medium">{opt.label}</div>
                <div className={cn('text-xs mt-0.5', focusMode === opt.value ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="border-t border-border pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full gap-1.5 text-muted-foreground hover:text-destructive"
            onClick={() => {
              if (confirm('Reset all settings to defaults?')) resetToDefault()
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Defaults
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
