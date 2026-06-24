'use client'

import { useDesignStore } from '@/stores/designStore'
import { PremiumLock } from '@/components/common/PremiumLock'
import { loadMaterialIconsCDN } from '@/lib/fontLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart, faStar, faHome, faCog, faBell, faSearch,
  faUser, faEnvelope, faDownload, faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import {
  Heart, Star, Home, Settings, Bell, Search,
  User, Mail, Download, Share2,
} from 'lucide-react'
import type { IconProvider } from '@/types/design'
import { cn } from '@/lib/utils'

const LUCIDE_ICONS = [Heart, Star, Home, Settings, Bell, Search, User, Mail, Download, Share2]
const FA_ICONS = [faHeart, faStar, faHome, faCog, faBell, faSearch, faUser, faEnvelope, faDownload, faShareNodes]
const MATERIAL_ICONS = ['favorite', 'star', 'home', 'settings', 'notifications', 'search', 'person', 'mail', 'download', 'share']

const PROVIDERS: { id: IconProvider; name: string; desc: string; free: boolean }[] = [
  { id: 'lucide', name: 'Lucide',      desc: 'Clean, consistent, open source', free: true  },
  { id: 'fontawesome', name: 'FontAwesome', desc: 'Industry standard icon set',    free: false },
  { id: 'material',    name: 'Material Icons', desc: 'Google\'s Material Design icons', free: false },
]

export function Step7Assets() {
  const { system, updateSystem, userPlan } = useDesignStore()
  const isPro = userPlan !== 'free'
  const selected = system.icons.provider

  function selectProvider(provider: IconProvider) {
    if (provider === 'material') loadMaterialIconsCDN()
    updateSystem({ icons: { provider } })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold mb-1">Icon Provider</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Choose your icon library. It will be used throughout your exported system.
        </p>

        <div className="flex flex-col gap-3">
          {PROVIDERS.map(provider => (
            <PremiumLock key={provider.id} locked={!provider.free && !isPro}>
              <button
                onClick={() => (provider.free || isPro) && selectProvider(provider.id)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border transition-colors',
                  selected === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50',
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold">{provider.name}</div>
                    <div className="text-xs text-muted-foreground">{provider.desc}</div>
                  </div>
                  {selected === provider.id && (
                    <div
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)', color: 'var(--primary)' }}
                    >
                      Selected
                    </div>
                  )}
                </div>

                {/* Icon samples */}
                <div className="flex gap-3 flex-wrap">
                  {provider.id === 'lucide' && LUCIDE_ICONS.slice(0, 8).map((Icon, i) => (
                    <Icon key={i} className="w-5 h-5 text-muted-foreground" />
                  ))}
                  {provider.id === 'fontawesome' && FA_ICONS.slice(0, 8).map((icon, i) => (
                    <FontAwesomeIcon key={i} icon={icon} className="w-5 h-5 text-muted-foreground" />
                  ))}
                  {provider.id === 'material' && MATERIAL_ICONS.slice(0, 8).map(icon => (
                    <span key={icon} className="material-icons" style={{ fontSize: '20px', color: 'var(--muted-foreground)' }}>
                      {icon}
                    </span>
                  ))}
                </div>
              </button>
            </PremiumLock>
          ))}
        </div>
      </div>
    </div>
  )
}
