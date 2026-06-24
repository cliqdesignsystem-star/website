'use client'

import { useDesignStore } from '@/stores/designStore'
import type { Plan } from '@/types/design'

const PLANS: { label: string; value: Plan; description: string }[] = [
  { label: 'Free', value: 'free', description: 'No premium features unlocked' },
  { label: 'Pro', value: 'pro', description: 'Font selectors and advanced controls' },
  { label: 'Pro+', value: 'pro+', description: 'Full access including exports' },
]

export default function AdminPage() {
  const { userPlan, setUserPlan } = useDesignStore()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="mb-6 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 w-fit mx-auto">
          <span className="text-xs font-mono text-yellow-600 dark:text-yellow-400">Dev Admin — not public</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-display-family)' }}>
          Plan Override
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Toggle the active plan to test gated features.
        </p>

        <div className="flex flex-col gap-3">
          {PLANS.map(plan => {
            const isActive = userPlan === plan.value
            return (
              <button
                key={plan.value}
                onClick={() => setUserPlan(plan.value)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors text-left"
                style={{
                  borderColor: isActive ? 'var(--primary)' : undefined,
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : undefined,
                }}
              >
                <div>
                  <div className="text-sm font-semibold">{plan.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{plan.description}</div>
                </div>
                {isActive && (
                  <div
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                      color: 'var(--primary)',
                    }}
                  >
                    Active
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Current plan: <span className="font-mono font-semibold">{userPlan}</span>
        </p>
      </div>
    </div>
  )
}
