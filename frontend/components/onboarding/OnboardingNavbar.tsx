'use client'

import { Moon, Sun, X } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useDesignStore } from '@/stores/designStore'

const STEP_LABELS = [
  'Foundation',
  'Color Ratios',
  'Typography',
  'UI Style',
  'Layout',
  'Components',
  'Assets',
  'Review',
]

export function OnboardingNavbar() {
  const { system, setTheme, setShowOnboarding, currentStep } = useDesignStore()
  const isDark = system.theme === 'dark'
  const totalSteps = STEP_LABELS.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-border">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md overflow-hidden shrink-0"
          >
            <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
          </div>
          <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display-family)' }}>
            Cliq System
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-muted-foreground" />
            <Switch
              checked={isDark}
              onCheckedChange={v => setTheme(v ? 'dark' : 'light')}
              className="scale-75"
            />
            <Moon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>

          {/* Step indicator */}
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </span>

          {/* Close */}
          <button
            onClick={() => setShowOnboarding(false)}
            className="p-1 rounded-md hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: 'var(--primary)' }}
        />
      </div>

      {/* Step label */}
      <p className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
        {STEP_LABELS[currentStep]}
      </p>
    </div>
  )
}
