import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignSystem, DeepPartial, Theme, Plan, FocusMode } from '@/types/design'
import { DEFAULT_DESIGN_SYSTEM } from '@/lib/defaultSystem'
import { applyDesignSystem, applyTheme } from '@/lib/cssVariables'
import type { FontPreset, PalettePreset, NeutralPreset } from '@/lib/presets'

function deepMerge<T extends object>(base: T, partial: DeepPartial<T>): T {
  const result = { ...base }
  for (const key in partial) {
    const k = key as keyof T
    const pv = partial[k]
    if (pv !== undefined && pv !== null) {
      if (typeof pv === 'object' && !Array.isArray(pv) && typeof base[k] === 'object') {
        ;(result as any)[k] = deepMerge(base[k] as object, pv as object)
      } else {
        ;(result as any)[k] = pv
      }
    }
  }
  return result
}

// Map raw control key → resolved DOM target. The PreviewCanvas effect uses
// `[data-cliq-target~="${resolved}"]` (whitespace-token match) so a single
// element can carry multiple labels (e.g. "primary-btn palette").
const TARGET_MAP: Record<string, string> = {
  // Cards / global radius family
  'card-radius':       'card',
  'card-padding':      'card',
  'card-border':       'card',
  'card-shadow':       'card',
  'radius-global':     'card',
  'border-width':      'card',
  'spacing-scale':     'card',

  // Modal
  'modal-radius':      'modal',
  'modal-shadow':      'modal',
  'modal-backdrop':    'modal',

  // Palette colors (resolved to specific element labels — what was "hybrid" before)
  'palette-primary':   'primary-btn',
  'palette-secondary': 'secondary-btn',
  'palette-tertiary':  'accent-badge',

  // Neutrals
  'neutrals':          'surface',

  // Typography
  'font-display':      'typography',
  'font-heading':      'typography',
  'font-body':         'typography',
  'font-size':         'typography',
  'font-weight':       'typography',
  'font-casing':       'typography',

  // Layout
  'navbar-height':     'nav',
  'nav-padding':       'nav',
  'section-padding':   'hero',
  'hero-padding':      'hero',
  'grid-gap':          'grid',
  'page-max-width':    'hero',
}

const HISTORY_LIMIT = 50

interface DesignStore {
  system: DesignSystem
  hasHydrated: boolean
  showOnboarding: boolean
  currentStep: number
  onboardingComplete: boolean
  userPlan: Plan

  activeTarget: string | null
  targetTick: number
  focusMode: FocusMode
  focusActiveAt: number | null

  history: DesignSystem[]
  historyIndex: number

  savedFontPairings: FontPreset[]
  savedPalettes: PalettePreset[]
  savedNeutrals: NeutralPreset[]

  setSystem: (s: DesignSystem) => void
  updateSystem: (partial: DeepPartial<DesignSystem>) => void
  setTheme: (t: Theme) => void
  resetToDefault: () => void
  setShowOnboarding: (v: boolean) => void
  setCurrentStep: (n: number) => void
  nextStep: () => void
  prevStep: () => void
  setOnboardingComplete: (v: boolean) => void
  syncToDOM: () => void
  setUserPlan: (p: Plan) => void

  setActiveTarget: (rawKey: string) => void
  setFocusMode: (mode: FocusMode) => void
  setFocusActive: () => void
  clearFocusActive: () => void

  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  saveCurrentFontPairing: (name: string) => void
  saveCurrentPalette: (name: string) => void
  saveCurrentNeutrals: (name: string) => void
  removeSavedItem: (type: 'font' | 'palette' | 'neutral', name: string) => void
}

let historyTimer: ReturnType<typeof setTimeout> | null = null

export const useDesignStore = create<DesignStore>()(
  persist(
    (set, get) => {
      const pushHistory = (snapshot: DesignSystem) => {
        set(s => {
          const truncated = s.history.slice(0, s.historyIndex + 1)
          const next = [...truncated, snapshot]
          const capped = next.length > HISTORY_LIMIT ? next.slice(next.length - HISTORY_LIMIT) : next
          return { history: capped, historyIndex: capped.length - 1 }
        })
      }
      const scheduleHistoryPush = (snapshot: DesignSystem) => {
        if (historyTimer) clearTimeout(historyTimer)
        historyTimer = setTimeout(() => pushHistory(snapshot), 450)
      }

      return {
        system: DEFAULT_DESIGN_SYSTEM,
        hasHydrated: false,
        showOnboarding: false,
        currentStep: 0,
        onboardingComplete: false,
        userPlan: 'free',

        activeTarget: null,
        targetTick: 0,
        focusMode: 'off',
        focusActiveAt: null,

        history: [DEFAULT_DESIGN_SYSTEM],
        historyIndex: 0,

        savedFontPairings: [],
        savedPalettes: [],
        savedNeutrals: [],

        setSystem: (system) => {
          set({ system })
          applyDesignSystem(system)
          applyTheme(system.theme)
          scheduleHistoryPush(system)
        },

        updateSystem: (partial) => {
          const merged = deepMerge(get().system, partial)
          set({ system: merged })
          applyDesignSystem(merged)
          scheduleHistoryPush(merged)
        },

        setTheme: (theme) => {
          const system = { ...get().system, theme }
          set({ system })
          applyTheme(theme)
          applyDesignSystem(system)
          scheduleHistoryPush(system)
        },

        resetToDefault: () => {
          if (historyTimer) { clearTimeout(historyTimer); historyTimer = null }
          set({ system: DEFAULT_DESIGN_SYSTEM })
          applyDesignSystem(DEFAULT_DESIGN_SYSTEM)
          applyTheme(DEFAULT_DESIGN_SYSTEM.theme)
          pushHistory(DEFAULT_DESIGN_SYSTEM)
        },

        setShowOnboarding: (v) => set({ showOnboarding: v }),
        setCurrentStep: (n) => set({ currentStep: n }),
        nextStep: () => set(s => ({ currentStep: Math.min(s.currentStep + 1, 7) })),
        prevStep: () => set(s => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
        setOnboardingComplete: (v) => set({ onboardingComplete: v }),
        setUserPlan: (p) => set({ userPlan: p }),

        setActiveTarget: (rawKey) => {
          const resolved = TARGET_MAP[rawKey] ?? rawKey
          set(s => ({
            activeTarget: resolved,
            targetTick: s.targetTick + 1,
            focusActiveAt: Date.now(),
          }))
        },
        setFocusMode: (mode) => set({ focusMode: mode }),
        setFocusActive: () => set({ focusActiveAt: Date.now() }),
        clearFocusActive: () => set({ focusActiveAt: null }),

        undo: () => {
          if (historyTimer) { clearTimeout(historyTimer); historyTimer = null }
          const { history, historyIndex } = get()
          if (historyIndex <= 0) return
          const nextIndex = historyIndex - 1
          const snap = history[nextIndex]
          set({ system: snap, historyIndex: nextIndex })
          applyDesignSystem(snap)
          applyTheme(snap.theme)
        },
        redo: () => {
          if (historyTimer) { clearTimeout(historyTimer); historyTimer = null }
          const { history, historyIndex } = get()
          if (historyIndex >= history.length - 1) return
          const nextIndex = historyIndex + 1
          const snap = history[nextIndex]
          set({ system: snap, historyIndex: nextIndex })
          applyDesignSystem(snap)
          applyTheme(snap.theme)
        },
        canUndo: () => get().historyIndex > 0,
        canRedo: () => get().historyIndex < get().history.length - 1,

        syncToDOM: () => {
          applyDesignSystem(get().system)
          applyTheme(get().system.theme)
        },

        saveCurrentFontPairing: (name) => {
          const { typography } = get().system
          const entry: FontPreset = {
            name,
            display: typography.displayFont,
            heading: typography.headingFont,
            body: typography.bodyFont,
          }
          set(s => ({ savedFontPairings: [entry, ...s.savedFontPairings.filter(p => p.name !== name)] }))
        },

        saveCurrentPalette: (name) => {
          const { palette } = get().system
          const entry: PalettePreset = { name, ...palette }
          set(s => ({ savedPalettes: [entry, ...s.savedPalettes.filter(p => p.name !== name)] }))
        },

        saveCurrentNeutrals: (name) => {
          const { neutrals } = get().system
          const entry: NeutralPreset = { name, ...neutrals }
          set(s => ({ savedNeutrals: [entry, ...s.savedNeutrals.filter(p => p.name !== name)] }))
        },

        removeSavedItem: (type, name) => {
          if (type === 'font')    set(s => ({ savedFontPairings: s.savedFontPairings.filter(p => p.name !== name) }))
          if (type === 'palette') set(s => ({ savedPalettes: s.savedPalettes.filter(p => p.name !== name) }))
          if (type === 'neutral') set(s => ({ savedNeutrals: s.savedNeutrals.filter(p => p.name !== name) }))
        },
      }
    },
    {
      name: 'cliq-design',
      partialize: (state) => ({
        system: state.system,
        onboardingComplete: state.onboardingComplete,
        userPlan: state.userPlan,
        focusMode: state.focusMode,
        history: state.history,
        historyIndex: state.historyIndex,
        savedFontPairings: state.savedFontPairings,
        savedPalettes: state.savedPalettes,
        savedNeutrals: state.savedNeutrals,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.hasHydrated = true
        state.syncToDOM()
      },
    },
  ),
)
