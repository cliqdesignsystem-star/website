import type { DesignSystem } from '@/types/design'
import { MINIMAL_SYSTEM, GLASS_SYSTEM, NEUMORPH_SYSTEM, NEOBRUTAL_SYSTEM, GRADIENT_SYSTEM } from '@/lib/defaultSystem'

export type { TemplateId } from '@/types/design'

export interface Template {
  id: string
  name: string
  description: string
  isPro: boolean
  defaultSystem: DesignSystem
}

export const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, restrained, content-first.',
    isPro: false,
    defaultSystem: MINIMAL_SYSTEM,
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    description: 'Frosted glass, translucent depth.',
    isPro: true,
    defaultSystem: GLASS_SYSTEM,
  },
  {
    id: 'neumorph',
    name: 'Neumorphism',
    description: 'Soft shadows, embossed surfaces.',
    isPro: true,
    defaultSystem: NEUMORPH_SYSTEM,
  },
  {
    id: 'neobrutal',
    name: 'Neobrutalism',
    description: 'Hard offsets, bold colors, chunky.',
    isPro: true,
    defaultSystem: NEOBRUTAL_SYSTEM,
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Vivid gradients, smooth blends.',
    isPro: true,
    defaultSystem: GRADIENT_SYSTEM,
  },
]
