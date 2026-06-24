'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

const PROFESSIONS = ['Designer', 'Developer', 'Product Manager', 'Founder', 'Other']
const INTENDED_USES = ['Personal', 'Client work', 'Internal tooling', 'Open source', 'Other']
const REFERRAL_SOURCES = ['Twitter / X', 'Reddit', 'Friend', 'Blog', 'Search', 'Other']

export default function OnboardingPage() {
  const router = useRouter()
  const { submitOnboarding, skipOnboarding } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    profession: '',
    company: '',
    intendedUse: '',
    referralSource: '',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitOnboarding(form)
      router.push('/projects')
    } catch {
      router.push('/projects')
    } finally {
      setLoading(false)
    }
  }

  async function handleSkip() {
    setLoading(true)
    try {
      await skipOnboarding()
    } catch {}
    router.push('/projects')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Get to know you</h1>
          <p className="text-sm text-muted-foreground mt-1">Help us personalise your experience. You can skip this anytime.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-1">Full name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={e => set('fullName', e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">What best describes you?</label>
            <select
              value={form.profession}
              onChange={e => set('profession', e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select…</option>
              {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Company <span className="text-muted-foreground">(optional)</span></label>
            <input
              type="text"
              value={form.company}
              onChange={e => set('company', e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">How will you use Cliq System?</label>
            <select
              value={form.intendedUse}
              onChange={e => set('intendedUse', e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select…</option>
              {INTENDED_USES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">How did you hear about us?</label>
            <select
              value={form.referralSource}
              onChange={e => set('referralSource', e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select…</option>
              {REFERRAL_SOURCES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSkip}
              disabled={loading}
              className="flex-1 rounded-md border border-border py-2 text-sm font-medium hover:bg-surface transition-colors disabled:opacity-50"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
