'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_LABELS = ['Background', 'Primary', 'Accent', 'Secondary']

interface RatioVisualizerProps {
  ratio: number[]
  colors: string[]
  labels?: string[]
  onChange?: (ratio: number[]) => void
  readOnly?: boolean
  className?: string
}

export function RatioVisualizer({
  ratio,
  colors,
  labels = DEFAULT_LABELS,
  onChange,
  readOnly = false,
  className,
}: RatioVisualizerProps) {
  const total = ratio.reduce((a, b) => a + b, 0)
  const pct = ratio.map(v => (v / total) * 100)
  const n = ratio.length

  const barRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<null | { idx: number; startX: number; startPct: number[] }>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, segIdx: number) => {
      if (readOnly || !onChange) return
      dragging.current = { idx: segIdx, startX: e.clientX, startPct: [...pct] }
      const onMove = (ev: MouseEvent) => {
        if (!dragging.current || !barRef.current) return
        const barWidth = barRef.current.getBoundingClientRect().width
        const deltaPct = ((ev.clientX - dragging.current.startX) / barWidth) * 100
        const newPct = [...dragging.current.startPct]
        newPct[segIdx] = Math.max(5, Math.min(90, newPct[segIdx] + deltaPct))
        const leftover = 100 - newPct[segIdx]
        const otherIdxs = Array.from({ length: n }, (_, i) => i).filter(i => i !== segIdx)
        const otherSum = otherIdxs.reduce((s, i) => s + dragging.current!.startPct[i], 0)
        otherIdxs.forEach(i => {
          newPct[i] = Math.max(5, (dragging.current!.startPct[i] / Math.max(otherSum, 1)) * leftover)
        })
        const newSum = newPct.reduce((a, b) => a + b, 0)
        const norm = newPct.map(v => Math.round((v / newSum) * 100))
        onChange(norm)
      }
      const onUp = () => {
        dragging.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [pct, onChange, readOnly, n],
  )

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div ref={barRef} className="flex h-12 rounded-lg overflow-hidden border border-border">
        {ratio.map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center justify-center text-xs font-semibold transition-all duration-150',
              !readOnly && onChange && 'cursor-col-resize select-none',
            )}
            style={{
              width: `${pct[i]}%`,
              backgroundColor: colors[i] ?? '#ccc',
              color: isLight(colors[i] ?? '#ccc') ? '#111' : '#fff',
            }}
            onMouseDown={e => handleMouseDown(e, i)}
          >
            {pct[i] >= 10 ? `${Math.round(pct[i])}%` : ''}
          </div>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        {ratio.map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i] ?? '#ccc' }} />
            <span className="text-xs text-muted-foreground">
              {labels[i] ?? `Stop ${i + 1}`} <span className="font-mono">{Math.round(pct[i])}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function isLight(hex: string): boolean {
  if (!hex.startsWith('#') || hex.length < 7) return true
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
