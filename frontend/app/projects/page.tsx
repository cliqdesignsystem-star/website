'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { projectApi, logoUrl, type Project } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { Plus, FolderOpen, Trash2, LayoutDashboard, Zap, Home, LogOut } from 'lucide-react'

const TEMPLATE_LABELS: Record<string, string> = {
  minimal: 'Minimal',
  glass: 'Glassmorphism',
  neumorph: 'Neumorphism',
  neobrutal: 'Neobrutalism',
  gradient: 'Gradient',
}

const TEMPLATE_COLORS: Record<string, string> = {
  minimal: 'bg-gray-100 text-gray-600',
  glass: 'bg-indigo-100 text-indigo-700',
  neumorph: 'bg-blue-100 text-blue-700',
  neobrutal: 'bg-yellow-200 text-yellow-800',
  gradient: 'bg-pink-100 text-pink-700',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ProjectsPage() {
  const { user, logout } = useAuthStore()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    projectApi.list()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('Delete this project?')) return
    await projectApi.remove(id).catch(() => {})
    setProjects(prev => prev.filter(p => p._id !== id))
  }

  const displayName = user?.profile?.fullName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
  const plan = user?.plan ?? 'free'

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-60 shrink-0 border-r border-border bg-surface flex flex-col">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0">
            <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
          </div>
          <span className="text-sm font-bold tracking-tight">Cliq System</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4 shrink-0" />
            Homepage
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium bg-primary/8 text-primary">
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            Projects
          </div>

          {/* Projects list */}
          {projects.length > 0 && (
            <div className="pt-3 pb-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1">
                Recent
              </p>
              {projects.slice(0, 6).map(p => (
                <Link
                  key={p._id}
                  href={`/projects/${p._id}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group"
                >
                  <div className="w-5 h-5 rounded shrink-0 bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary">
                    {p.name[0]?.toUpperCase()}
                  </div>
                  <span className="truncate flex-1">{p.name}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-border mt-2">
            <Link
              href="/pricing"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Zap className="w-4 h-4 shrink-0 text-amber-500" />
              {plan === 'free' ? 'Upgrade to Pro' : 'Manage plan'}
            </Link>
          </div>
        </nav>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted transition-colors group">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{displayName}</div>
              <div className="text-[10px] text-muted-foreground capitalize">{plan} plan</div>
            </div>
            <button
              onClick={logout}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-border px-8 py-5 flex items-center justify-between bg-background">
          <div>
            <h1 className="text-xl font-semibold">Projects</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/projects/new"
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New project
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-7">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-44 rounded-xl bg-surface animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-64 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold">No projects yet</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-6">Pick a template and start building.</p>
              <Link
                href="/projects/new"
                className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map(project => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="h-36 bg-gradient-to-br from-muted to-surface flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                    {project.logoUrl ? (
                      <img src={logoUrl(project.logoUrl)} alt={project.name} className="h-14 w-14 object-contain relative z-10" />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-2xl font-bold text-primary relative z-10">
                        {project.name[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold truncate leading-snug">{project.name}</h3>
                      <button
                        onClick={e => handleDelete(e, project._id)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all shrink-0 mt-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${TEMPLATE_COLORS[project.templateId] || 'bg-muted text-muted-foreground'}`}>
                        {TEMPLATE_LABELS[project.templateId] || project.templateId}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(project.updatedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
