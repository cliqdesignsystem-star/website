'use client'

import { useEffect } from 'react'
import { useDesignStore } from '@/stores/designStore'
import { useAuthStore } from '@/stores/authStore'
import { designSystemApi, getToken } from '@/lib/api'

export function StoreInitializer() {
  const { hasHydrated, syncToDOM, setSystem } = useDesignStore()
  const { refreshUser } = useAuthStore()

  useEffect(() => {
    refreshUser()
  }, [])

  useEffect(() => {
    if (!hasHydrated) return

    syncToDOM()

    if (!getToken()) return

    designSystemApi.list()
      .then((systems: any[]) => {
        const def = systems.find(s => s.isDefault)
        if (def?.system) setSystem(def.system)
      })
      .catch(() => {})
  }, [hasHydrated])

  return null
}
