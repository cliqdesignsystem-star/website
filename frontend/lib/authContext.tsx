// Auth state is managed by Zustand — see stores/authStore.ts
// This file re-exports for backwards compatibility.
export { useAuth, useAuthStore } from '@/stores/authStore'

// AuthProvider is a no-op shim kept for any existing imports.
// Zustand does not require a provider.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
