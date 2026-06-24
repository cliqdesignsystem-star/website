'use client'

import { Lock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface PremiumLockProps {
  children: React.ReactNode
  locked?: boolean
  className?: string
}

export function PremiumLock({ children, locked = true, className }: PremiumLockProps) {
  if (!locked) return <>{children}</>
  return (
    <Tooltip>
      <div className={cn('relative', className)}>
        {/* absolutely-positioned trigger avoids nesting a <button> inside children */}
        <TooltipTrigger className="absolute inset-0 z-10 w-full cursor-not-allowed rounded-[inherit] bg-transparent" />
        <div className="opacity-40 pointer-events-none select-none">{children}</div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-1.5 bg-background/90 border border-border rounded-full px-2.5 py-1 shadow-sm">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Pro</span>
          </div>
        </div>
      </div>
      <TooltipContent>
        <p>Upgrade to Pro to unlock this feature</p>
      </TooltipContent>
    </Tooltip>
  )
}
