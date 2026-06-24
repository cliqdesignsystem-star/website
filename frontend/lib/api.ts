import type { DesignSystem, TemplateId } from '@/types/design'

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

export function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem('cliq-token')
}

export function setToken(token: string | null) {
  if (typeof localStorage === 'undefined') return
  if (token) localStorage.setItem('cliq-token', token)
  else localStorage.removeItem('cliq-token')
}

async function request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const isFormData = options.body instanceof FormData
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || body.errors?.[0]?.msg || `HTTP ${res.status}`)
  }
  return res.json()
}

export interface UserProfile {
  fullName: string
  profession: string
  company: string
  intendedUse: string
  referralSource: string
}

export interface User {
  id: string
  email: string
  plan: 'free' | 'pro' | 'pro+'
  profile: UserProfile
  onboardingComplete: boolean
  createdAt: string
}

export interface Project {
  _id: string
  userId: string
  name: string
  templateId: TemplateId
  logoUrl: string
  system: DesignSystem | null
  createdAt: string
  updatedAt: string
}

export const authApi = {
  register: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ user: User }>('/auth/me'),
  onboarding: (profile: Partial<UserProfile>) =>
    request<{ user: User }>('/auth/onboarding', {
      method: 'POST',
      body: JSON.stringify(profile),
    }),
  onboardingSkip: () =>
    request<{ user: User }>('/auth/onboarding/skip', { method: 'POST' }),
}

export const projectApi = {
  list: () => request<Project[]>('/projects'),
  get: (id: string) => request<Project>(`/projects/${id}`),
  create: (data: { name: string; templateId: TemplateId; system?: DesignSystem }) =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Pick<Project, 'name' | 'system' | 'templateId'>>) =>
    request<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) => request<{ ok: true }>(`/projects/${id}`, { method: 'DELETE' }),
  uploadLogo: (id: string, file: File) => {
    const form = new FormData()
    form.append('logo', file)
    return request<{ logoUrl: string; project: Project }>(`/projects/${id}/logo`, {
      method: 'POST',
      body: form,
    })
  },
}

export const designSystemApi = {
  list: () => request('/design-systems'),
  create: (data: { name?: string; system: any; isDefault?: boolean }) =>
    request('/design-systems', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { name?: string; system: any; isDefault?: boolean }) =>
    request(`/design-systems/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id: string) =>
    request(`/design-systems/${id}`, { method: 'DELETE' }),
}

export function logoUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}
