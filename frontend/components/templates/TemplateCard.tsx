'use client'

import type { Template } from '@/lib/templates'
import type { Plan } from '@/types/design'
import { Lock } from 'lucide-react'

interface Props {
  template: Template
  plan: Plan
  onSelect: (template: Template) => void
}

function MinimalCard({ name, description, locked }: { name: string; description: string; locked: boolean }) {
  return (
    <div className="relative w-full h-56 bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Mini UI chrome */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
        <div className="ml-3 h-4 flex-1 rounded bg-gray-100" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {name}
        </h1>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="h-8 px-4 rounded-md bg-gray-900 flex items-center">
          <div className="h-2 w-14 rounded-full bg-white/70" />
        </div>
        <div className="h-8 px-4 rounded-md border border-gray-200 flex items-center">
          <div className="h-2 w-10 rounded-full bg-gray-300" />
        </div>
      </div>
      {locked && <LockedBadge />}
    </div>
  )
}

function GlassCard({ name, description, locked }: { name: string; description: string; locked: boolean }) {
  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)' }}>
      {/* Frosted pane */}
      <div className="absolute inset-4 rounded-xl border border-white/25 flex flex-col justify-between p-6"
        style={{ backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.12)' }}>
        <div className="flex gap-1">
          <div className="h-2 w-16 rounded-full bg-white/40" />
          <div className="h-2 w-10 rounded-full bg-white/20" />
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            {name}
          </h1>
          <p className="text-sm text-white/60">{description}</p>
        </div>
        <div className="flex gap-2">
          <div className="h-8 px-4 rounded-lg border border-white/30 bg-white/20 flex items-center">
            <div className="h-2 w-12 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
      {locked && <LockedBadge />}
    </div>
  )
}

function NeumorphCard({ name, description, locked }: { name: string; description: string; locked: boolean }) {
  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden flex flex-col justify-between p-8"
      style={{ background: '#e0e5ec', boxShadow: '8px 8px 16px #b8c0cc, -8px -8px 16px #ffffff' }}>
      <div className="flex gap-1.5">
        {[1,2,3].map(i => (
          <div key={i} className="h-6 px-3 rounded-full flex items-center"
            style={{ background: '#e0e5ec', boxShadow: '2px 2px 4px #b8c0cc, -2px -2px 4px #ffffff' }}>
            <div className="h-1.5 w-8 rounded-full bg-[#9aa0b0]" />
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-4xl font-medium text-[#3d4356] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {name}
        </h1>
        <p className="text-sm text-[#7a8094]">{description}</p>
      </div>
      <div className="h-10 rounded-xl flex items-center justify-center w-36"
        style={{ background: '#e0e5ec', boxShadow: '4px 4px 8px #b8c0cc, -4px -4px 8px #ffffff' }}>
        <div className="h-2 w-16 rounded-full bg-[#4d7cfe]/60" />
      </div>
      {locked && <LockedBadge />}
    </div>
  )
}

function NeobrutCard({ name, description, locked }: { name: string; description: string; locked: boolean }) {
  return (
    <div className="relative w-full h-56 bg-[#fde047] border-4 border-black overflow-hidden flex flex-col justify-between p-8"
      style={{ boxShadow: '8px 8px 0 #000' }}>
      <div className="flex gap-2">
        <div className="h-7 px-3 border-2 border-black bg-white flex items-center">
          <div className="h-2 w-10 rounded-sm bg-black" />
        </div>
        <div className="h-7 px-3 border-2 border-black bg-black flex items-center">
          <div className="h-2 w-8 rounded-sm bg-white" />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-black text-black mb-2 uppercase tracking-tight" style={{ fontFamily: 'Arial Black, sans-serif' }}>
          {name}
        </h1>
        <p className="text-sm font-bold text-black/70">{description}</p>
      </div>
      <div className="h-10 border-2 border-black bg-black flex items-center justify-center w-36">
        <div className="h-2 w-16 bg-[#fde047]" />
      </div>
      {locked && <LockedBadge dark />}
    </div>
  )
}

function GradientCard({ name, description, locked }: { name: string; description: string; locked: boolean }) {
  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden flex flex-col justify-between p-8"
      style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%)' }}>
      {/* Glow orbs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)' }} />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)' }} />
      <div className="flex gap-1.5 relative">
        <div className="h-2 w-16 rounded-full bg-white/40" />
        <div className="h-2 w-10 rounded-full bg-white/20" />
      </div>
      <div className="relative">
        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {name}
        </h1>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <div className="relative h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center w-36">
        <div className="h-2 w-14 rounded-full bg-white/70" />
      </div>
      {locked && <LockedBadge />}
    </div>
  )
}

function LockedBadge({ dark }: { dark?: boolean }) {
  return (
    <div className={`absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${dark ? 'bg-black text-[#fde047]' : 'bg-black/60 text-white'}`}>
      <Lock className="w-3 h-3" />
      Pro
    </div>
  )
}

const CARD_MAP: Record<string, React.ComponentType<{ name: string; description: string; locked: boolean }>> = {
  minimal: MinimalCard,
  glass: GlassCard,
  neumorph: NeumorphCard,
  neobrutal: NeobrutCard,
  gradient: GradientCard,
}

export function TemplateCard({ template, plan, onSelect }: Props) {
  const isLocked = template.isPro && plan === 'free'
  const CardComponent = CARD_MAP[template.id] ?? MinimalCard

  return (
    <button
      onClick={() => onSelect(template)}
      className={`group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl transition-transform duration-200 hover:-translate-y-1 ${isLocked ? 'cursor-pointer' : 'cursor-pointer'}`}
    >
      <CardComponent name={template.name} description={template.description} locked={isLocked} />
    </button>
  )
}
