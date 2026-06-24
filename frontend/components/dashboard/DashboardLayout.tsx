'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Download, Moon, Sun, Upload, Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useDesignStore } from '@/stores/designStore'
import { useCurrentProject } from '@/hooks/useCurrentProject'
import { LeftPanel } from './LeftPanel'
import { PreviewCanvas } from './PreviewCanvas'
import { ExportModal } from './ExportModal'
import { UndoRedoButtons } from './UndoRedoButtons'
import { SettingsMenu } from './SettingsMenu'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/api'

interface Props {
  project?: Project | null
}

export function DashboardLayout({ project: initialProject }: Props = {}) {
  const { system, setTheme, undo, redo } = useDesignStore()
  const { project, updateName, saveSystem, uploadLogo, logoUrl, saveStatus } = useCurrentProject(initialProject ?? null)
  const [leftOpen, setLeftOpen] = useState(true)
  const [exportOpen, setExportOpen] = useState(false)
  const isDark = system.theme === 'dark'
  const nameRef = useRef<HTMLDivElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  // Save system to project whenever it changes (debounced inside hook)
  const prevSystem = useRef(system)
  useEffect(() => {
    if (prevSystem.current !== system && project) {
      prevSystem.current = system
      saveSystem()
    }
  }, [system])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      if (e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if (e.key.toLowerCase() === 'z' && e.shiftKey) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo])

  function handleNameBlur() {
    const name = nameRef.current?.textContent?.trim() || 'Untitled Project'
    if (name !== project?.name) updateName(name)
  }

  function handleNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); nameRef.current?.blur() }
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadLogo(file)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      <aside
        className={cn(
          'border-r border-border bg-surface transition-all duration-300 flex-shrink-0',
          leftOpen ? 'w-[340px]' : 'w-0',
        )}
        style={{ overflow: 'hidden' }}
      >
        <LeftPanel />
      </aside>

      <button
        onClick={() => setLeftOpen(v => !v)}
        aria-label="Toggle panel"
        className={cn(
          'absolute z-20 top-1/2 -translate-y-1/2 w-6 h-12 rounded-r-md border border-l-0 border-border bg-surface hover:bg-muted flex items-center justify-center transition-all',
        )}
        style={{ left: leftOpen ? '340px' : '0' }}
      >
        {leftOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            {/* Back to projects / home */}
            {project ? (
              <Link
                href="/projects"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Projects
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Home
              </Link>
            )}

            <div className="w-px h-4 bg-border" />

            {/* Logo area */}
            <div
              className="w-7 h-7 rounded-md overflow-hidden shrink-0 cursor-pointer relative group"
              onClick={() => project && logoInputRef.current?.click()}
            >
              {logoUrl ? (
                <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />
              ) : (
                <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
              )}
              {project && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" className="hidden" onChange={handleLogoChange} />

            <div>
              {project ? (
                <div
                  ref={nameRef}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleNameBlur}
                  onKeyDown={handleNameKeyDown}
                  className="text-sm font-semibold outline-none rounded px-1 -ml-1 hover:bg-surface focus:bg-surface cursor-text min-w-8"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  {project.name}
                </div>
              ) : (
                <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-display-family)' }}>
                  Your Design System
                </div>
              )}
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {saveStatus === 'saving' && (
                  <><Loader2 className="w-2.5 h-2.5 animate-spin" /> Saving…</>
                )}
                {saveStatus === 'saved' && (
                  <><Check className="w-2.5 h-2.5" /> Saved</>
                )}
                {saveStatus === 'idle' && 'Live preview'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <UndoRedoButtons />

            <div className="w-px h-5 bg-border mx-1" />

            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              <Switch
                checked={isDark}
                onCheckedChange={v => setTheme(v ? 'dark' : 'light')}
              />
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            <SettingsMenu />

            <Button onClick={() => setExportOpen(true)} className="gap-1.5">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </header>

        <PreviewCanvas />
      </main>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  )
}
