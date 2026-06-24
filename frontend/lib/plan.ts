import type { IconProvider, Plan } from '@/types/design'

export const PLAN_LIMITS: Record<Plan, {
  ratioPresets: string[]
  iconProviders: IconProvider[]
  customFonts: boolean
  exportHTML: boolean
  saveToCloud: boolean
  multiProject: boolean
}> = {
  free: {
    ratioPresets: ['Classic'],
    iconProviders: ['lucide'],
    customFonts: false,
    exportHTML: true,
    saveToCloud: false,
    multiProject: false,
  },
  pro: {
    ratioPresets: ['Classic', 'Advanced'],
    iconProviders: ['lucide', 'fontawesome', 'material'],
    customFonts: true,
    exportHTML: true,
    saveToCloud: true,
    multiProject: false,
  },
  'pro+': {
    ratioPresets: ['Classic', 'Advanced'],
    iconProviders: ['lucide', 'fontawesome', 'material'],
    customFonts: true,
    exportHTML: true,
    saveToCloud: true,
    multiProject: true,
  },
}

export function canUse(plan: Plan, feature: keyof (typeof PLAN_LIMITS)[Plan]): boolean {
  return !!PLAN_LIMITS[plan][feature]
}

export function canUseRatio(plan: Plan, presetName: string): boolean {
  return PLAN_LIMITS[plan].ratioPresets.includes(presetName)
}

export function canUseIconProvider(plan: Plan, provider: IconProvider): boolean {
  return (PLAN_LIMITS[plan].iconProviders as IconProvider[]).includes(provider)
}
