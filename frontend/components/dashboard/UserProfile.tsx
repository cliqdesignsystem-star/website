'use client'

import { useAuthStore } from '@/stores/authStore'

const PLAN_COLORS = {
  free: 'bg-gray-100 text-gray-600',
  pro: 'bg-blue-100 text-blue-700',
  'pro+': 'bg-violet-100 text-violet-700',
}

export function UserProfile() {
  const { user } = useAuthStore()

  if (!user) return null

  const displayName = user.profile?.fullName || user.email.split('@')[0]
  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="px-4 py-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{displayName}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase ${PLAN_COLORS[user.plan]}`}>
            {user.plan}
          </span>
          {user.plan === 'free' && (
            <a href="/pricing" className="text-[10px] text-primary hover:underline">Upgrade</a>
          )}
        </div>
      </div>
    </div>
  )
}
