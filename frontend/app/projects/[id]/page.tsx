'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { projectApi, type Project } from '@/lib/api'
import { useDesignStore } from '@/stores/designStore'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { setSystem, syncToDOM } = useDesignStore()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    projectApi.get(id)
      .then(p => {
        setProject(p)
        if (p.system) {
          setSystem(p.system)
          syncToDOM()
        }
      })
      .catch(() => router.replace('/projects'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading project…</p>
      </div>
    )
  }

  return <DashboardLayout project={project} />
}
