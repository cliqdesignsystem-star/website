export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-[340px] border-r border-border bg-surface p-5">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          <div className="h-3 w-40 rounded bg-muted animate-pulse" />
          <div className="h-9 w-full rounded bg-muted animate-pulse mt-4" />
          <div className="space-y-2 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between">
          <div className="h-5 w-40 rounded bg-muted animate-pulse" />
          <div className="h-9 w-24 rounded bg-muted animate-pulse" />
        </header>
        <div className="flex-1 bg-muted/30 p-8">
          <div className="rounded-xl bg-muted animate-pulse h-full" />
        </div>
      </main>
    </div>
  )
}
