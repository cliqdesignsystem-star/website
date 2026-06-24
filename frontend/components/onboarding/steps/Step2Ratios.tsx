'use client'

import { useDesignStore } from '@/stores/designStore'
import { RatioVisualizer } from '@/components/common/RatioVisualizer'
import { PremiumLock } from '@/components/common/PremiumLock'
import { RATIO_PRESETS } from '@/lib/presets'

export function Step2Ratios() {
  const { system, updateSystem, userPlan } = useDesignStore()
  const isPro = userPlan !== 'free'
  const isDark = system.theme === 'dark'
  const bg = isDark ? system.neutrals.darkBackground : system.neutrals.background
  const fg = isDark ? system.neutrals.darkForeground : system.neutrals.foreground

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold mb-1">Color Distribution</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Control visual balance. The 60-30-10 rule distributes color weight across your UI.
        </p>

        {/* Preset cards */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {RATIO_PRESETS.map(preset => (
            <PremiumLock key={preset.name} locked={!preset.free && !isPro}>
              <button
                onClick={() => updateSystem({ ratio: preset.ratio })}
                className={`w-full p-3 rounded-xl border text-left transition-colors ${
                  JSON.stringify(system.ratio) === JSON.stringify(preset.ratio)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex h-3 rounded-full overflow-hidden mb-2">
                  {preset.ratio.map((v, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${v}%`,
                        backgroundColor: i === 0
                          ? bg
                          : i === 1 ? system.palette.primary : system.palette.tertiary,
                        border: i === 0 ? '1px solid var(--border)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs font-semibold">{preset.name}</div>
                <div className="text-xs text-muted-foreground">
                  {preset.ratio.join(' / ')}
                </div>
              </button>
            </PremiumLock>
          ))}
        </div>

        {/* Interactive visualizer */}
        <RatioVisualizer
          ratio={system.ratio}
          colors={system.ratio.length === 4
            ? [bg, system.palette.primary, system.palette.tertiary, system.palette.secondary]
            : [bg, system.palette.primary, system.palette.tertiary]
          }
          onChange={isPro ? (r) => updateSystem({ ratio: r }) : undefined}
          readOnly={!isPro}
        />
        {!isPro && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Upgrade to Pro to drag custom ratios
          </p>
        )}
      </div>

      {/* Live section preview */}
      <div className="border border-border rounded-xl overflow-hidden">
        <div
          className="h-12 flex items-center px-4 justify-between"
          style={{ backgroundColor: bg }}
        >
          <span className="text-sm font-semibold" style={{ color: fg }}>
            Navbar (60%)
          </span>
          <button
            className="text-xs px-3 py-1 rounded"
            style={{ backgroundColor: system.palette.primary, color: 'white' }}
          >
            CTA
          </button>
        </div>
        <div
          className="p-6"
          style={{ backgroundColor: `color-mix(in srgb, ${system.palette.primary} ${system.ratio[1]}%, ${bg})` }}
        >
          <div className="text-sm font-medium mb-2" style={{ color: fg }}>
            Hero (30%)
          </div>
          <div className="flex gap-2">
            <button
              className="text-xs px-3 py-1.5 rounded"
              style={{ backgroundColor: system.palette.tertiary, color: 'white' }}
            >
              Accent (10%)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
