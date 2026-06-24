'use client'

import { useEffect, useRef } from 'react'
import { useDesignStore } from '@/stores/designStore'
import { Hero } from '@/components/homepage/Hero'
import { Features } from '@/components/homepage/Features'
import { TypographyShowcase } from '@/components/homepage/TypographyShowcase'
import { ComponentShowcase } from '@/components/homepage/ComponentShowcase'
import { Footer } from '@/components/homepage/Footer'

const CLEAR_DELAY = 2000

export function PreviewCanvas() {
  const { activeTarget, targetTick, focusMode, focusActiveAt, clearFocusActive } = useDesignStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce clearing the focus active state
  useEffect(() => {
    if (focusActiveAt == null) return
    if (clearTimer.current) clearTimeout(clearTimer.current)
    clearTimer.current = setTimeout(clearFocusActive, CLEAR_DELAY)
    return () => { if (clearTimer.current) clearTimeout(clearTimer.current) }
  }, [focusActiveAt, clearFocusActive])

  // Scroll + pulse on target change
  useEffect(() => {
    if (!activeTarget || !scrollRef.current) return
    const container = scrollRef.current
    const matches = Array.from(
      container.querySelectorAll<HTMLElement>(`[data-cliq-target~="${activeTarget}"]`)
    )
    if (matches.length === 0) return

    const containerRect = container.getBoundingClientRect()
    const isVisible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return r.top < containerRect.bottom - 40 && r.bottom > containerRect.top + 40
    }
    const visible = matches.filter(isVisible)

    const pulse = (el: HTMLElement) => {
      el.classList.remove('cliq-pulse')
      void el.offsetWidth
      el.classList.add('cliq-pulse')
      setTimeout(() => el.classList.remove('cliq-pulse'), 1700)
    }

    if (visible.length > 0) {
      visible.forEach(pulse)
    } else {
      const target = matches[0]
      const r = target.getBoundingClientRect()
      const top = container.scrollTop + (r.top - containerRect.top) - 60
      container.scrollTo({ top, behavior: 'smooth' })
      setTimeout(() => pulse(target), 380)
    }
  }, [activeTarget, targetTick])

  const overlayVisible = focusMode !== 'off' && focusActiveAt != null

  return (
    <div ref={scrollRef} className="flex-1 overflow-auto bg-muted/30">
      <div className="p-6">
        <div
          className="preview-canvas-root origin-top-left shadow-xl rounded-xl overflow-hidden"
          data-focus-on={overlayVisible ? 'true' : 'false'}
          data-focus-target={overlayVisible ? activeTarget ?? '' : ''}
          style={{ transform: 'scale(0.8)', width: '125%', transformOrigin: 'top left' }}
        >
          {/* Stable overlay — no remounting; opacity driven by state */}
          {focusMode !== 'off' && (
            <div
              className={`cliq-focus-overlay cliq-focus-overlay--${focusMode}`}
              style={{
                opacity: overlayVisible ? 1 : 0,
                transition: 'opacity 400ms ease-out',
              }}
            />
          )}

          <div style={{ backgroundColor: 'var(--background)' }}>
            <div
              data-cliq-target="nav"
              className="border-b border-border flex items-center justify-between px-8"
              style={{ height: 'var(--navbar-height)', backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
                  <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
                </div>
                <span className="font-bold" style={{ fontFamily: 'var(--font-display-family)' }}>
                  Your Brand
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>Features</span>
                <span>Pricing</span>
                <span>About</span>
                <button className="btn-primary text-sm" data-cliq-target="primary-btn palette">Get Started</button>
              </div>
            </div>

            <Hero />
            <Features />
            <TypographyShowcase />
            <ComponentShowcase />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
