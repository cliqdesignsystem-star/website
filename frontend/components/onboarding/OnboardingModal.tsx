'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Download, LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDesignStore } from '@/stores/designStore'
import { useAuthStore } from '@/stores/authStore'
import { projectApi } from '@/lib/api'
import { OnboardingNavbar } from './OnboardingNavbar'
import { Step1Foundation } from './steps/Step1Foundation'
import { Step2Ratios } from './steps/Step2Ratios'
import { Step3Typography } from './steps/Step3Typography'
import { Step4UIStyle } from './steps/Step4UIStyle'
import { Step5Layout } from './steps/Step5Layout'
import { Step6Components } from './steps/Step6Components'
import { Step7Assets } from './steps/Step7Assets'
import { StepFinal } from './steps/StepFinal'

const STEPS = [
  Step1Foundation,
  Step2Ratios,
  Step3Typography,
  Step4UIStyle,
  Step5Layout,
  Step6Components,
  Step7Assets,
  StepFinal,
]

const TOTAL_STEPS = STEPS.length

type GateAction = 'export' | 'dashboard' | null

export function OnboardingModal() {
  const { showOnboarding, setShowOnboarding, currentStep, nextStep, prevStep, setOnboardingComplete, system } = useDesignStore()
  const { user, signup, login } = useAuthStore()
  const router = useRouter()
  const StepComponent = STEPS[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === TOTAL_STEPS - 1

  const [gateAction, setGateAction] = useState<GateAction>(null)
  const [gateEmail, setGateEmail] = useState('')
  const [gatePassword, setGatePassword] = useState('')
  const [gateError, setGateError] = useState('')
  const [gateLoading, setGateLoading] = useState(false)
  const [gateMode, setGateMode] = useState<'signup' | 'login'>('signup')

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGateError('')
    setGateLoading(true)
    try {
      if (gateMode === 'signup') {
        await signup(gateEmail, gatePassword)
      } else {
        await login(gateEmail, gatePassword)
      }
      await continueAfterAuth(gateAction!)
    } catch (err: any) {
      setGateError(err.message || 'Auth failed.')
    } finally {
      setGateLoading(false)
    }
  }

  async function continueAfterAuth(action: GateAction) {
    setOnboardingComplete(true)
    setShowOnboarding(false)
    if (action === 'export') {
      router.push('/dashboard')
    } else {
      // Create "Landing Page" project with current system
      try {
        const project = await projectApi.create({ name: 'Landing Page', templateId: 'minimal' as any, system })
        router.push(`/projects/${project._id}`)
      } catch {
        router.push('/projects')
      }
    }
  }

  function triggerAction(action: GateAction) {
    if (user) {
      continueAfterAuth(action)
    } else {
      setGateAction(action)
    }
  }

  function enterDashboard() {
    triggerAction('dashboard')
  }

  function handleExport() {
    triggerAction('export')
  }

  return (
    <>
    <Dialog open={showOnboarding} onOpenChange={(open) => setShowOnboarding(open)}>
      <DialogContent
        className="max-w-2xl! w-[calc(100%-2rem)]! p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Design System Onboarding</DialogTitle>
        <DialogDescription className="sr-only">
          Configure your design system in {TOTAL_STEPS} steps.
        </DialogDescription>

        <div className="px-6 pt-5">
          <OnboardingNavbar />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer — visible on ALL steps; Back is always available */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
          <Button variant="ghost" onClick={prevStep} disabled={isFirst} className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === currentStep ? '24px' : '6px',
                  backgroundColor: i <= currentStep
                    ? 'var(--primary)'
                    : 'color-mix(in srgb, var(--foreground) 15%, transparent)',
                }}
              />
            ))}
          </div>

          {isLast ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} className="gap-1">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button onClick={enterDashboard} className="gap-1">
                <LayoutDashboard className="w-4 h-4" />
                Access Dashboard
              </Button>
            </div>
          ) : (
            <Button onClick={nextStep} className="gap-1">
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
    {/* Signup gate modal */}
    {gateAction && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
        <div className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <h2 className="text-lg font-semibold mb-1">
            {gateMode === 'signup' ? 'Create your account' : 'Sign in'}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {gateAction === 'export' ? 'Sign up to export your design system.' : 'Sign up to save and access your dashboard.'}
          </p>
          <form onSubmit={handleGateSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={gateEmail}
              onChange={e => setGateEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              required
              minLength={8}
              value={gatePassword}
              onChange={e => setGatePassword(e.target.value)}
              placeholder={gateMode === 'signup' ? 'Password (min. 8 chars)' : 'Password'}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            {gateError && <p className="text-sm text-red-500">{gateError}</p>}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setGateAction(null)}
                className="flex-1 rounded-md border border-border py-2 text-sm hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={gateLoading}
                className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {gateLoading ? '…' : gateMode === 'signup' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-4">
            {gateMode === 'signup' ? (
              <>Already have an account? <button className="text-primary hover:underline" onClick={() => setGateMode('login')}>Sign in</button></>
            ) : (
              <>No account? <button className="text-primary hover:underline" onClick={() => setGateMode('signup')}>Sign up</button></>
            )}
          </p>
        </div>
      </div>
    )}
    </>
  )
}
