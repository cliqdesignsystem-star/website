import type { DesignSystem } from '@/types/design'

// ── Base helpers ────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(n => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')).join('')}`
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex)
  if (!rgb) return { h: 0, s: 0, l: 0 }
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
    case g: h = ((b - r) / d + 2) / 6; break
    case b: h = ((r - g) / d + 4) / 6; break
  }
  return { h: h * 360, s, l }
}

export function hslToHex(h: number, s: number, l: number): string {
  const hk = h / 360
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((hk * 6) % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (hk < 1/6)      { r = c; g = x; b = 0 }
  else if (hk < 2/6) { r = x; g = c; b = 0 }
  else if (hk < 3/6) { r = 0; g = c; b = x }
  else if (hk < 4/6) { r = 0; g = x; b = c }
  else if (hk < 5/6) { r = x; g = 0; b = c }
  else               { r = c; g = 0; b = x }
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getContrastColor(bg: string): string {
  return getLuminance(bg) > 0.179 ? '#111111' : '#ffffff'
}

export function mixHex(a: string, b: string, ratio: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  if (!ca || !cb) return a
  return rgbToHex(
    ca.r * (1 - ratio) + cb.r * ratio,
    ca.g * (1 - ratio) + cb.g * ratio,
    ca.b * (1 - ratio) + cb.b * ratio,
  )
}

export function generatePalette(hex: string): Record<string, string> {
  const { h, s } = hexToHSL(hex)
  const stops = [0.95, 0.88, 0.78, 0.66, 0.55, 0.44, 0.34, 0.24, 0.15, 0.08]
  const keys = ['50','100','200','300','400','500','600','700','800','900']
  return Object.fromEntries(keys.map((k, i) => [k, hslToHex(h, s, stops[i])]))
}

// ── Adaptive Color Distribution Algorithm ──────────────────────────────────

export type PartRole = 'structure' | 'content' | 'interactive'

export interface SectionPart {
  key: string
  role: PartRole
  size: number        // 0–10 spatial weight
  importance: number  // 0–10 visual importance
}

export type ColorMapping = Record<string, string>
export type RatioMode = 'minimal' | 'balanced' | 'bold'

export function detectRatioMode(ratios: number[]): RatioMode {
  const dominant = Math.max(...ratios)
  if (dominant >= 75) return 'minimal'
  if (dominant >= 55) return 'balanced'
  return 'bold'
}

function assignRatios(parts: SectionPart[], ratios: number[]): Map<string, number> {
  const structural  = parts.filter(p => p.role === 'structure')
  const content     = parts.filter(p => p.role === 'content')
  const interactive = parts.filter(p => p.role === 'interactive')

  const scored = parts
    .map(p => ({ ...p, score: p.size * 0.6 + p.importance * 0.4 }))
    .sort((a, b) => b.score - a.score)

  const ratiosSorted = [...ratios].sort((a, b) => b - a)
  const mapping = new Map<string, number>()

  const totalStructuralSize = structural.reduce((s, p) => s + p.size, 0)
  const dominantPart = structural.reduce((best, p) => {
    if (p.key === 'bg') return best.size / totalStructuralSize >= 0.4 ? p : best
    return p.size > best.size ? p : best
  }, structural[0] ?? parts[0])

  mapping.set(dominantPart.key, ratiosSorted[0])

  const remaining = scored.filter(p => p.key !== dominantPart.key)
  remaining.forEach((part, i) => {
    mapping.set(part.key, ratiosSorted[i + 1] ?? ratiosSorted[ratiosSorted.length - 1])
  })

  // Enforce minimums — borrow from dominant
  for (const p of interactive) {
    const cur = mapping.get(p.key) ?? 0
    if (cur < 10) {
      const deficit = 10 - cur
      mapping.set(p.key, 10)
      mapping.set(dominantPart.key, Math.max(0, (mapping.get(dominantPart.key) ?? 0) - deficit))
    }
  }
  for (const p of content) {
    const cur = mapping.get(p.key) ?? 0
    if (cur < 15) {
      const deficit = 15 - cur
      mapping.set(p.key, 15)
      mapping.set(dominantPart.key, Math.max(0, (mapping.get(dominantPart.key) ?? 0) - deficit))
    }
  }

  return mapping
}

function assignColors(
  parts: SectionPart[],
  ratioMap: Map<string, number>,
  system: DesignSystem,
  mode: RatioMode,
): ColorMapping {
  const palette = [system.palette.primary, system.palette.secondary, system.palette.tertiary]
  const shuffled = [...palette].sort(() => Math.random() - 0.5)
  const result: ColorMapping = {}

  const bgColor = result['bg'] ?? system.neutrals.background

  for (const part of parts) {
    if (part.role === 'structure') {
      result[part.key] = part.key === 'bg'
        ? system.neutrals.background
        : system.neutrals.surface
    } else if (part.role === 'content') {
      result[part.key] = getContrastColor(result['bg'] ?? system.neutrals.background)
    } else {
      const preferred = mode === 'minimal'
        ? system.palette.primary
        : (shuffled[0] ?? system.palette.primary)
      const ratio = ratioMap.get(part.key) ?? 0
      result[part.key] = system.palette.tertiary === preferred && ratio > 15
        ? system.palette.primary
        : preferred
    }
  }

  // Ensure content contrast is computed after bg is known
  for (const part of parts) {
    if (part.role === 'content') {
      result[part.key] = getContrastColor(result['bg'] ?? bgColor)
    }
  }

  return result
}

export function distributeColors(
  system: DesignSystem,
  def: { parts: SectionPart[] },
): ColorMapping {
  const mode = detectRatioMode(system.ratio)
  const ratioMap = assignRatios(def.parts, system.ratio)
  return assignColors(def.parts, ratioMap, system, mode)
}

export const SECTION_DEFS: Record<string, { parts: SectionPart[] }> = {
  hero: {
    parts: [
      { key: 'bg',       role: 'structure',   size: 8, importance: 10 },
      { key: 'headline', role: 'content',     size: 6, importance: 9  },
      { key: 'body',     role: 'content',     size: 4, importance: 7  },
      { key: 'cta',      role: 'interactive', size: 2, importance: 10 },
    ],
  },
  features: {
    parts: [
      { key: 'bg',   role: 'structure',   size: 10, importance: 5 },
      { key: 'card', role: 'structure',   size: 5,  importance: 6 },
      { key: 'text', role: 'content',     size: 6,  importance: 8 },
      { key: 'icon', role: 'interactive', size: 1,  importance: 7 },
    ],
  },
  footer: {
    parts: [
      { key: 'bg',   role: 'structure',   size: 10, importance: 8 },
      { key: 'text', role: 'content',     size: 5,  importance: 7 },
      { key: 'link', role: 'interactive', size: 1,  importance: 6 },
    ],
  },
  card: {
    parts: [
      { key: 'bg',     role: 'structure',   size: 8, importance: 6 },
      { key: 'title',  role: 'content',     size: 4, importance: 9 },
      { key: 'body',   role: 'content',     size: 3, importance: 7 },
      { key: 'action', role: 'interactive', size: 1, importance: 8 },
    ],
  },
  modal: {
    parts: [
      { key: 'bg',      role: 'structure',   size: 8, importance: 7 },
      { key: 'title',   role: 'content',     size: 4, importance: 9 },
      { key: 'body',    role: 'content',     size: 5, importance: 7 },
      { key: 'confirm', role: 'interactive', size: 2, importance: 10 },
      { key: 'cancel',  role: 'interactive', size: 2, importance: 5  },
    ],
  },
}
