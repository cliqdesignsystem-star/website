'use client'

import { useState } from 'react'
import { Copy, Download, Check } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useDesignStore } from '@/stores/designStore'
import {
  exportAsCSS, exportAsTailwindConfig, exportAsJSONTokens,
  exportAsHTMLTemplate, exportAsMarkdown, downloadFile, copyToClipboard,
} from '@/lib/exportUtils'

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Format = {
  id: string
  label: string
  filename: string
  mime: string
  generate: (s: any) => string
}

const FORMATS: Format[] = [
  { id: 'css',      label: 'CSS',      filename: 'design-system.css',  mime: 'text/css',           generate: exportAsCSS },
  { id: 'tailwind', label: 'Tailwind', filename: 'tailwind.config.js', mime: 'text/javascript',    generate: exportAsTailwindConfig },
  { id: 'json',     label: 'JSON',     filename: 'tokens.json',        mime: 'application/json',   generate: exportAsJSONTokens },
  { id: 'html',     label: 'HTML',     filename: 'design-system.html', mime: 'text/html',          generate: exportAsHTMLTemplate },
  { id: 'markdown', label: 'Markdown', filename: 'design-system.md',   mime: 'text/markdown',      generate: exportAsMarkdown },
]

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { system } = useDesignStore()
  const [copied, setCopied] = useState<string | null>(null)

  async function handleCopy(format: Format) {
    try {
      await copyToClipboard(format.generate(system))
      setCopied(format.id)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

  function handleDownload(format: Format) {
    downloadFile(format.generate(system), format.filename, format.mime)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-3xl !w-[calc(100%-2rem)] max-h-[85vh] overflow-hidden flex flex-col p-0"
      >
        <div className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle>Export Design System</DialogTitle>
          <DialogDescription>
            Choose a format, copy to clipboard, or download.
          </DialogDescription>
        </div>

        <Tabs defaultValue="css" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid grid-cols-5 mx-6 mt-4">
            {FORMATS.map(f => (
              <TabsTrigger key={f.id} value={f.id}>
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {FORMATS.map(f => {
            const content = f.generate(system)
            const isCopied = copied === f.id
            return (
              <TabsContent
                key={f.id}
                value={f.id}
                className="flex-1 flex flex-col min-h-0 mt-4 px-6 pb-6"
              >
                <div className="flex items-center justify-end gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(f)}
                    className="gap-1.5"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(f)}
                    className="gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </Button>
                </div>
                <pre className="flex-1 overflow-auto rounded-lg bg-muted p-4 text-xs font-mono leading-relaxed">
                  <code>{content}</code>
                </pre>
              </TabsContent>
            )
          })}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
