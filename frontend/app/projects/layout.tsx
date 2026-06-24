'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuthStore()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/projects')
    }
  }, [user, loading])

  if (loading) return null
  if (!user) return null

  return <>{children}</>
}
