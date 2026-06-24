export interface PalettePreset {
  name: string
  primary: string
  secondary: string
  tertiary: string
}

export interface NeutralPreset {
  name: string
  background: string
  foreground: string
  surface: string
  darkBackground: string
  darkForeground: string
  darkSurface: string
}

export interface FontPreset {
  name: string
  display: string
  heading: string
  body: string
}

// ─── Palette categories ────────────────────────────────────────────────────
export const PALETTE_CATEGORIES: Array<{ category: string; presets: PalettePreset[] }> = [
  {
    category: 'Vibrant',
    presets: [
      { name: 'Indigo Dream',   primary: '#6366f1', secondary: '#8b5cf6', tertiary: '#f59e0b' },
      { name: 'Rose Gold',      primary: '#f43f5e', secondary: '#ec4899', tertiary: '#fbbf24' },
      { name: 'Electric Blue',  primary: '#3b82f6', secondary: '#6366f1', tertiary: '#f97316' },
      { name: 'Neon Lime',      primary: '#84cc16', secondary: '#22c55e', tertiary: '#f59e0b' },
    ],
  },
  {
    category: 'Ocean',
    presets: [
      { name: 'Ocean Deep',     primary: '#0ea5e9', secondary: '#3b82f6', tertiary: '#06b6d4' },
      { name: 'Teal Wave',      primary: '#14b8a6', secondary: '#0ea5e9', tertiary: '#818cf8' },
      { name: 'Midnight Sea',   primary: '#1d4ed8', secondary: '#0891b2', tertiary: '#7c3aed' },
      { name: 'Arctic',         primary: '#38bdf8', secondary: '#67e8f9', tertiary: '#a78bfa' },
    ],
  },
  {
    category: 'Earth Tones',
    presets: [
      { name: 'Sunset',         primary: '#f97316', secondary: '#ef4444', tertiary: '#facc15' },
      { name: 'Terracotta',     primary: '#c2410c', secondary: '#d97706', tertiary: '#65a30d' },
      { name: 'Forest',         primary: '#15803d', secondary: '#166534', tertiary: '#d97706' },
      { name: 'Sand Dune',      primary: '#a16207', secondary: '#92400e', tertiary: '#4d7c0f' },
    ],
  },
  {
    category: 'Pastel',
    presets: [
      { name: 'Lavender Mist',  primary: '#a78bfa', secondary: '#c4b5fd', tertiary: '#fca5a5' },
      { name: 'Peach Bloom',    primary: '#fb923c', secondary: '#fca5a5', tertiary: '#fdba74' },
      { name: 'Mint Fresh',     primary: '#6ee7b7', secondary: '#86efac', tertiary: '#bef264' },
      { name: 'Candy Pop',      primary: '#f9a8d4', secondary: '#f0abfc', tertiary: '#93c5fd' },
    ],
  },
  {
    category: 'Monochrome',
    presets: [
      { name: 'Slate Pro',      primary: '#475569', secondary: '#64748b', tertiary: '#0ea5e9' },
      { name: 'Charcoal',       primary: '#374151', secondary: '#4b5563', tertiary: '#6b7280' },
      { name: 'Carbon',         primary: '#1f2937', secondary: '#374151', tertiary: '#9ca3af' },
    ],
  },
  {
    category: 'Night',
    presets: [
      { name: 'Deep Purple',    primary: '#7c3aed', secondary: '#6d28d9', tertiary: '#c026d3' },
      { name: 'Neon Noir',      primary: '#a855f7', secondary: '#ec4899', tertiary: '#06b6d4' },
      { name: 'Emerald Night',  primary: '#059669', secondary: '#0d9488', tertiary: '#6366f1' },
    ],
  },
]

export const PALETTE_PRESETS: PalettePreset[] = PALETTE_CATEGORIES.flatMap(c => c.presets)

// ─── Neutral presets (paired light + dark) ────────────────────────────────
export const NEUTRAL_PRESETS: NeutralPreset[] = [
  {
    name: 'Pure White',
    background: '#ffffff', foreground: '#111111', surface: '#f5f5f5',
    darkBackground: '#0f0f0f', darkForeground: '#f0f0f0', darkSurface: '#1a1a1a',
  },
  {
    name: 'Warm White',
    background: '#fdfdf1', foreground: '#1a1a1a', surface: '#f5f5ec',
    darkBackground: '#1c1917', darkForeground: '#fafaf9', darkSurface: '#292524',
  },
  {
    name: 'Cool Gray',
    background: '#f8fafc', foreground: '#0f172a', surface: '#f1f5f9',
    darkBackground: '#0f172a', darkForeground: '#f8fafc', darkSurface: '#1e293b',
  },
  {
    name: 'Midnight Blue',
    background: '#f0f4ff', foreground: '#1e3a5f', surface: '#e8eef8',
    darkBackground: '#0f172a', darkForeground: '#e2e8f0', darkSurface: '#1e293b',
  },
  {
    name: 'Soft Cream',
    background: '#fef9ef', foreground: '#292018', surface: '#fdf3de',
    darkBackground: '#1c1810', darkForeground: '#f5edd8', darkSurface: '#2a2215',
  },
  {
    name: 'Stone',
    background: '#fafaf9', foreground: '#1c1917', surface: '#f5f5f4',
    darkBackground: '#1c1917', darkForeground: '#fafaf9', darkSurface: '#292524',
  },
]

// ─── Font pairings ────────────────────────────────────────────────────────
export const FONT_PRESETS: FontPreset[] = [
  { name: 'Modern Minimal',    display: 'Inter',              heading: 'Inter',              body: 'Inter' },
  { name: 'Editorial',         display: 'Playfair Display',   heading: 'Playfair Display',   body: 'Source Sans 3' },
  { name: 'Geometric',         display: 'Space Grotesk',      heading: 'Space Grotesk',      body: 'Inter' },
  { name: 'Classic Serif',     display: 'Crimson Pro',        heading: 'Crimson Pro',        body: 'Lora' },
  { name: 'Tech',              display: 'JetBrains Mono',     heading: 'IBM Plex Sans',      body: 'IBM Plex Sans' },
  { name: 'Friendly',          display: 'Poppins',            heading: 'Poppins',            body: 'Nunito' },
  { name: 'Elegant',           display: 'Cormorant Garamond', heading: 'Libre Baskerville',  body: 'Libre Baskerville' },
  { name: 'Bold Sans',         display: 'Barlow',             heading: 'Barlow',             body: 'Barlow' },
]

// ─── Ratio presets ────────────────────────────────────────────────────────
export const RATIO_PRESETS: Array<{
  name: string
  ratio: number[]
  free: boolean
}> = [
  { name: 'Classic',  ratio: [60, 30, 10],     free: true  },
  { name: 'Advanced', ratio: [60, 20, 10, 10], free: false },
]
