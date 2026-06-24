import type { DesignSystem, Theme } from '@/types/design'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.179 ? '#111111' : '#ffffff'
}

function mixHex(a: string, b: string, ratio: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  if (!ca || !cb) return a
  const r  = Math.round(ca.r * (1 - ratio) + cb.r * ratio)
  const g  = Math.round(ca.g * (1 - ratio) + cb.g * ratio)
  const bl = Math.round(ca.b * (1 - ratio) + cb.b * ratio)
  return `#${[r, g, bl].map(n => n.toString(16).padStart(2, '0')).join('')}`
}

export function applyDesignSystem(s: DesignSystem): void {
  if (typeof window === 'undefined') return
  const r = document.documentElement
  const set = (k: string, v: string) => r.style.setProperty(k, v)

  // Pick the correct neutral set based on current theme
  const bg   = s.theme === 'dark' ? s.neutrals.darkBackground : s.neutrals.background
  const fg   = s.theme === 'dark' ? s.neutrals.darkForeground : s.neutrals.foreground
  const surf = s.theme === 'dark' ? s.neutrals.darkSurface    : s.neutrals.surface

  // Neutrals — override shadcn oklch defaults with hex
  set('--background', bg)
  set('--foreground', fg)
  set('--surface',    surf)
  set('--card',       surf)
  set('--popover',    surf)
  set('--muted',      mixHex(surf, bg, 0.5))

  // Brand palette
  set('--primary',   s.palette.primary)
  set('--secondary', s.palette.secondary)
  set('--tertiary',  s.palette.tertiary)
  set('--accent',    s.palette.secondary)

  // Auto-derived foreground values
  set('--primary-foreground',   getContrastColor(s.palette.primary))
  set('--secondary-foreground', getContrastColor(s.palette.secondary))
  set('--card-foreground',      fg)
  set('--popover-foreground',   fg)
  set('--muted-foreground',     mixHex(fg, bg, 0.45))
  set('--accent-foreground',    getContrastColor(s.palette.secondary))

  // UI chrome
  set('--border', mixHex(fg, bg, 0.85))
  set('--input',  mixHex(fg, bg, 0.85))
  set('--ring',   s.palette.primary)

  // Typography
  set('--font-display-family', `'${s.typography.displayFont}', sans-serif`)
  set('--font-heading-family', `'${s.typography.headingFont}', sans-serif`)
  set('--font-body-family',    `'${s.typography.bodyFont}', sans-serif`)
  set('--font-size-base',      `${s.typography.fontSize}px`)
  set('--font-weight-body',    String(s.typography.bodyWeight))
  set('--text-casing',         s.typography.casing === 'none' ? 'none' : s.typography.casing)

  // UI style
  const shadowAlpha = s.uiStyle.shadowIntensity / 1000
  set('--radius',        `${s.uiStyle.radius}px`)
  set('--shadow',        `0 4px 12px rgba(0,0,0,${shadowAlpha})`)
  set('--border-width',  `${s.uiStyle.borderWidth}px`)
  set('--spacing-scale', String(s.uiStyle.spacingScale))

  // Layout
  set('--page-max-width',  `${s.layout.pageMaxWidth}px`)
  set('--navbar-height',   `${s.layout.navbarHeight}px`)
  set('--section-padding', `${s.layout.sectionPadding}px`)
  set('--hero-padding',    `${s.layout.heroPadding}px`)
  set('--grid-gap',        `${s.layout.gridGap}px`)

  // Icons
  set('--icon-stroke-width', String(s.icons.strokeWidth))
  set('--icon-size-scale',   String(s.icons.sizeScale))

  // Component-level overrides (consumed by .card via CSS fallback chain)
  set('--card-radius',   `${s.components.card.radius}px`)
  set('--card-shadow',   `0 4px 12px rgba(0,0,0,${s.components.card.shadowIntensity / 1000})`)
  set('--card-border',   `${s.components.card.borderWidth}px`)
  set('--card-padding',  `${s.components.card.padding}px`)
  set('--modal-radius',  `${s.components.modal.radius}px`)
  set('--modal-shadow',  `0 8px 40px rgba(0,0,0,${s.components.modal.shadowIntensity / 1000})`)
  set('--modal-max-w',   `${s.components.modal.maxWidth}px`)
  set('--modal-backdrop-opacity', `${s.components.modal.backdropOpacity / 100}`)
}

export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function getCSSVariable(name: string): string {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
