export type IconProvider = 'lucide' | 'fontawesome' | 'material'
export type IconStyle = 'outlined' | 'filled'
export type TextCasing = 'none' | 'uppercase' | 'lowercase' | 'capitalize'
export type Theme = 'light' | 'dark'
export type Plan = 'free' | 'pro' | 'pro+'
export type TemplateId = 'minimal' | 'glass' | 'neumorph' | 'neobrutal' | 'gradient'
export type FocusMode = 'off' | 'dark' | 'blur'

export interface DesignSystem {
  templateId: TemplateId
  neutrals: {
    background: string
    foreground: string
    surface: string
    darkBackground: string
    darkForeground: string
    darkSurface: string
  }
  palette: {
    primary: string
    secondary: string
    tertiary: string
  }
  ratio: number[]
  typography: {
    displayFont: string
    headingFont: string
    bodyFont: string
    fontSize: number
    bodyWeight: number
    casing: TextCasing
    splitHeadings: boolean
  }
  uiStyle: {
    radius: number
    shadowIntensity: number
    borderWidth: number
    spacingScale: number
  }
  layout: {
    pageMaxWidth: number
    navbarHeight: number
    sectionPadding: number
    heroPadding: number
    gridGap: number
  }
  components: {
    card: {
      radius: number
      shadowIntensity: number
      borderWidth: number
      padding: number
    }
    modal: {
      radius: number
      shadowIntensity: number
      backdropOpacity: number
      maxWidth: number
    }
  }
  icons: {
    provider: IconProvider
    strokeWidth: number
    sizeScale: number
    style: IconStyle
  }
  theme: Theme
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
