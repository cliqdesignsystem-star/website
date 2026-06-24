'use client'

import { Undo2, Redo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDesignStore } from '@/stores/designStore'

export function UndoRedoButtons() {
  const { undo, redo, canUndo, canRedo, hasHydrated } = useDesignStore()

  const undoDisabled = !hasHydrated || !canUndo()
  const redoDisabled = !hasHydrated || !canRedo()

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={undo}
        disabled={undoDisabled}
        title="Undo (Ctrl+Z)"
        className="w-8 h-8 p-0 rounded-r-none"
      >
        <Undo2 className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={redo}
        disabled={redoDisabled}
        title="Redo (Ctrl+Shift+Z)"
        className="w-8 h-8 p-0 rounded-l-none border-l border-border"
      >
        <Redo2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  )
}
