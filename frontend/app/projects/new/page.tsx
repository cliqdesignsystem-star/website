'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { projectApi } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { TEMPLATES, type Template } from '@/lib/templates'
import { TemplateCard } from '@/components/templates/TemplateCard'

export default function NewProjectPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const plan = user?.plan ?? 'free'
  const [creating, setCreating] = useState(false)
  const [upgradePitch, setUpgradePitch] = useState(false)

  async function handleSelect(template: Template) {
    if (template.isPro && plan === 'free') {
      setUpgradePitch(true)
      return
    }
    setCreating(true)
    try {
      const project = await projectApi.create({
        name: 'Untitled Project',
        templateId: template.id as any,
        system: template.defaultSystem,
      })
      router.push(`/projects/${project._id}`)
    } catch {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 block">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Choose a template</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your project starts from one of these templates.</p>
      </header>

      <main className="px-6 py-8 max-w-5xl mx-auto">
        {creating ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-muted-foreground text-sm">Creating project…</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEMPLATES.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                plan={plan}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        {upgradePitch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
              <h2 className="text-lg font-semibold mb-2">Pro templates</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Upgrade to Pro to unlock Glassmorphism, Neumorphism, Neobrutalism, and Gradient templates.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setUpgradePitch(false)}
                  className="flex-1 rounded-md border border-border py-2 text-sm hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <a
                  href="/pricing"
                  className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition-opacity text-center"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
