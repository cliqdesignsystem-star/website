'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { loadGoogleFont, searchGoogleFonts, POPULAR_FONTS } from '@/lib/fontLoader'
import { cn } from '@/lib/utils'

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
  label?: string
  varName?: string
  disabled?: boolean
}

export function FontSelector({ value, onChange, label, varName, disabled }: FontSelectorProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [fonts, setFonts] = useState(POPULAR_FONTS)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (!open) return
    if (!query) {
      setFonts(POPULAR_FONTS)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const results = await searchGoogleFonts(query)
      setFonts(results)
    }, 300)
  }, [query, open])

  async function handleSelect(family: string) {
    setOpen(false)
    try {
      await loadGoogleFont(family)
    } catch {}
    onChange(family)
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{label}</label>
          {varName && (
            <span className="text-xs text-muted-foreground font-mono">{varName}</span>
          )}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={buttonVariants({ variant: 'outline', className: 'w-full justify-between font-normal' })}
        >
          <span style={{ fontFamily: `'${value}', sans-serif` }}>{value}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search fonts..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No fonts found.</CommandEmpty>
              <CommandGroup>
                {fonts.map(font => (
                  <CommandItem
                    key={font.family}
                    value={font.family}
                    onSelect={() => handleSelect(font.family)}
                    className="flex items-center justify-between"
                  >
                    <span style={{ fontFamily: `'${font.family}', sans-serif` }}>
                      {font.family}
                    </span>
                    {value === font.family && <Check className="h-4 w-4 text-primary" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
