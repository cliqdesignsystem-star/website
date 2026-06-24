import type { DesignSystem } from '@/types/design'

export const MINIMAL_SYSTEM: DesignSystem = {
  templateId: 'minimal',
  neutrals: {
    background: '#ffffff',
    foreground: '#111111',
    surface: '#f5f5f5',
    darkBackground: '#0f0f0f',
    darkForeground: '#f0f0f0',
    darkSurface: '#1a1a1a',
  },
  palette: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    tertiary: '#f59e0b',
  },
  ratio: [60, 30, 10],
  typography: {
    displayFont: 'Inter',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontSize: 16,
    bodyWeight: 400,
    casing: 'none',
    splitHeadings: false,
  },
  uiStyle: {
    radius: 8,
    shadowIntensity: 80,
    borderWidth: 1,
    spacingScale: 1,
  },
  layout: {
    pageMaxWidth: 1280,
    navbarHeight: 64,
    sectionPadding: 80,
    heroPadding: 120,
    gridGap: 24,
  },
  components: {
    card: {
      radius: 12,
      shadowIntensity: 60,
      borderWidth: 1,
      padding: 24,
    },
    modal: {
      radius: 16,
      shadowIntensity: 200,
      backdropOpacity: 50,
      maxWidth: 480,
    },
  },
  icons: {
    provider: 'lucide',
    strokeWidth: 2,
    sizeScale: 1,
    style: 'outlined',
  },
  theme: 'light',
}

export const GLASS_SYSTEM: DesignSystem = {
  ...MINIMAL_SYSTEM,
  templateId: 'glass',
  palette: { primary: '#06b6d4', secondary: '#a855f7', tertiary: '#ec4899' },
  uiStyle: { ...MINIMAL_SYSTEM.uiStyle, radius: 16, shadowIntensity: 30, borderWidth: 1 },
  components: {
    card: { radius: 20, shadowIntensity: 30, borderWidth: 1, padding: 24 },
    modal: { radius: 24, shadowIntensity: 100, backdropOpacity: 30, maxWidth: 480 },
  },
}

export const NEUMORPH_SYSTEM: DesignSystem = {
  ...MINIMAL_SYSTEM,
  templateId: 'neumorph',
  neutrals: {
    background: '#e0e5ec',
    foreground: '#3d4356',
    surface: '#e0e5ec',
    darkBackground: '#2a2d34',
    darkForeground: '#e0e5ec',
    darkSurface: '#2a2d34',
  },
  palette: { primary: '#4d7cfe', secondary: '#fe7d50', tertiary: '#50d0a0' },
  uiStyle: { radius: 16, shadowIntensity: 40, borderWidth: 0, spacingScale: 1 },
  components: {
    card: { radius: 20, shadowIntensity: 40, borderWidth: 0, padding: 28 },
    modal: { radius: 24, shadowIntensity: 80, backdropOpacity: 40, maxWidth: 480 },
  },
}

export const NEOBRUTAL_SYSTEM: DesignSystem = {
  ...MINIMAL_SYSTEM,
  templateId: 'neobrutal',
  neutrals: {
    background: '#fffbeb',
    foreground: '#000000',
    surface: '#fde68a',
    darkBackground: '#1a1a1a',
    darkForeground: '#ffffff',
    darkSurface: '#2a2a2a',
  },
  palette: { primary: '#ef4444', secondary: '#3b82f6', tertiary: '#10b981' },
  typography: { ...MINIMAL_SYSTEM.typography, bodyWeight: 700 },
  uiStyle: { radius: 0, shadowIntensity: 1000, borderWidth: 3, spacingScale: 1 },
  components: {
    card: { radius: 0, shadowIntensity: 1000, borderWidth: 3, padding: 24 },
    modal: { radius: 0, shadowIntensity: 1000, backdropOpacity: 60, maxWidth: 480 },
  },
}

export const GRADIENT_SYSTEM: DesignSystem = {
  ...MINIMAL_SYSTEM,
  templateId: 'gradient',
  palette: { primary: '#ec4899', secondary: '#8b5cf6', tertiary: '#f59e0b' },
  uiStyle: { radius: 20, shadowIntensity: 150, borderWidth: 0, spacingScale: 1 },
  components: {
    card: { radius: 20, shadowIntensity: 150, borderWidth: 0, padding: 24 },
    modal: { radius: 24, shadowIntensity: 250, backdropOpacity: 40, maxWidth: 480 },
  },
}

export const DEFAULT_DESIGN_SYSTEM: DesignSystem = MINIMAL_SYSTEM
