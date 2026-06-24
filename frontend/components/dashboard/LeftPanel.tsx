'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Type, LayoutGrid, Shapes } from 'lucide-react'
import { ColorControls } from './controls/ColorControls'
import { TypographyControls } from './controls/TypographyControls'
import { LayoutControls } from './controls/LayoutControls'
import { IconControls } from './controls/IconControls'
import { UserProfile } from './UserProfile'

export function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--font-display-family)' }}>
          Customize
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Tune every token in your system
        </p>
      </div>

      <Tabs defaultValue="colors" className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid grid-cols-4 mx-3 mt-3">
          <TabsTrigger value="colors" className="gap-1.5 text-xs">
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Color</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="gap-1.5 text-xs">
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Type</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="gap-1.5 text-xs">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
          <TabsTrigger value="icons" className="gap-1.5 text-xs">
            <Shapes className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Icons</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <TabsContent value="colors" className="mt-0">
            <ColorControls />
          </TabsContent>
          <TabsContent value="typography" className="mt-0">
            <TypographyControls />
          </TabsContent>
          <TabsContent value="layout" className="mt-0">
            <LayoutControls />
          </TabsContent>
          <TabsContent value="icons" className="mt-0">
            <IconControls />
          </TabsContent>
        </div>
      </Tabs>

      <div className="border-t border-border">
        <UserProfile />
      </div>
    </div>
  )
}
