const loaded = new Set<string>()

export function loadGoogleFont(family: string, weights = '300;400;500;600;700;800'): Promise<void> {
  if (typeof window === 'undefined' || loaded.has(family)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:wght@${weights}&display=swap`
    link.onload = async () => {
      loaded.add(family)
      try { await document.fonts.load(`16px "${family}"`) } catch {}
      resolve()
    }
    link.onerror = () => reject(new Error(`Failed to load font: ${family}`))
    document.head.appendChild(link)
  })
}

export async function searchGoogleFonts(
  query: string,
): Promise<{ family: string; category: string }[]> {
  const key = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY
  if (!key) {
    // Fallback: return popular fonts filtered by query
    return POPULAR_FONTS
      .filter(f => f.family.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 20)
  }
  const res = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${key}&sort=popularity`,
  )
  const data = await res.json()
  return (data.items as { family: string; category: string }[])
    .filter(f => f.family.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 20)
}

export function loadMaterialIconsCDN(): void {
  if (typeof window === 'undefined' || loaded.has('__material__')) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
  document.head.appendChild(link)
  loaded.add('__material__')
}

export const POPULAR_FONTS: { family: string; category: string }[] = [
  { family: 'Inter',            category: 'sans-serif' },
  { family: 'Roboto',           category: 'sans-serif' },
  { family: 'Open Sans',        category: 'sans-serif' },
  { family: 'Lato',             category: 'sans-serif' },
  { family: 'Montserrat',       category: 'sans-serif' },
  { family: 'Poppins',          category: 'sans-serif' },
  { family: 'Source Sans 3',    category: 'sans-serif' },
  { family: 'Nunito',           category: 'sans-serif' },
  { family: 'Raleway',          category: 'sans-serif' },
  { family: 'Space Grotesk',    category: 'sans-serif' },
  { family: 'DM Sans',          category: 'sans-serif' },
  { family: 'IBM Plex Sans',    category: 'sans-serif' },
  { family: 'Playfair Display', category: 'serif' },
  { family: 'Merriweather',     category: 'serif' },
  { family: 'Lora',             category: 'serif' },
  { family: 'Crimson Pro',      category: 'serif' },
  { family: 'EB Garamond',      category: 'serif' },
  { family: 'JetBrains Mono',   category: 'monospace' },
  { family: 'Fira Code',        category: 'monospace' },
  { family: 'IBM Plex Mono',    category: 'monospace' },
]
