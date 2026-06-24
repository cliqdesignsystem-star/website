'use client'

import { create } from 'zustand'
import { authApi, getToken, setToken, type User, type UserProfile } from '@/lib/api'

interface AuthState {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  signup: (email: string, password: string) => Promise<User>
  logout: () => void
  refreshUser: () => Promise<User | null>
  submitOnboarding: (profile: Partial<UserProfile>) => Promise<User>
  skipOnboarding: () => Promise<User>
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  loading: true,

  refreshUser: async () => {
    if (!getToken()) {
      set({ user: null, loading: false })
      return null
    }
    try {
      const { user } = await authApi.me()
      set({ user, loading: false })
      return user
    } catch {
      setToken(null)
      set({ user: null, loading: false })
      return null
    }
  },

  login: async (email, password) => {
    const { token, user } = await authApi.login(email, password)
    setToken(token)
    set({ user })
    return user
  },

  signup: async (email, password) => {
    const { token, user } = await authApi.register(email, password)
    setToken(token)
    set({ user })
    return user
  },

  logout: () => {
    setToken(null)
    set({ user: null })
  },

  submitOnboarding: async (profile) => {
    const { user } = await authApi.onboarding(profile)
    set({ user })
    return user
  },

  skipOnboarding: async () => {
    const { user } = await authApi.onboardingSkip()
    set({ user })
    return user
  },
}))

export function useAuth() {
  return useAuthStore()
}
