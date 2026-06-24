import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StoreInitializer } from '@/components/StoreInitializer'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cliq System — Design systems that Cliq.',
  description: 'Design systems that Cliq. Build, preview, and export complete UI systems in real time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <TooltipProvider>
          <StoreInitializer />
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
