'use client'

import { useState, useRef, useCallback } from 'react'
import { projectApi, logoUrl as makeLogoUrl, type Project } from '@/lib/api'
import { useDesignStore } from '@/stores/designStore'

export type SaveStatus = 'idle' | 'saving' | 'saved'

export function useCurrentProject(initialProject: Project | null) {
  const [project, setProject] = useState<Project | null>(initialProject)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { system } = useDesignStore()

  const scheduleSave = useCallback((updates: Partial<Pick<Project, 'name' | 'system' | 'templateId'>>) => {
    if (!project) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        const updated = await projectApi.update(project._id, updates)
        setProject(updated)
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch {
        setSaveStatus('idle')
      }
    }, 500)
  }, [project])

  const updateName = useCallback((name: string) => {
    setProject(prev => prev ? { ...prev, name } : prev)
    scheduleSave({ name })
  }, [scheduleSave])

  const saveSystem = useCallback(() => {
    scheduleSave({ system })
  }, [scheduleSave, system])

  const uploadLogo = useCallback(async (file: File) => {
    if (!project) return
    try {
      const { project: updated } = await projectApi.uploadLogo(project._id, file)
      setProject(updated)
    } catch {}
  }, [project])

  const logoUrl = project?.logoUrl ? makeLogoUrl(project.logoUrl) : ''

  return { project, updateName, saveSystem, uploadLogo, logoUrl, saveStatus }
}
