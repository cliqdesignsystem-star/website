'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { useDesignStore } from '@/stores/designStore'

const FOOTER_LINKS = {
  Product: ['Features', 'Templates', 'Pricing', 'Changelog'],
  Resources: ['Docs', 'Blog', 'Examples', 'Status'],
}

export function Footer() {
  const { setShowOnboarding } = useDesignStore()

  return (
    <footer data-cliq-target="footer" className="border-t border-border bg-background">
      {/* Final CTA */}
      <div
        className="text-center py-20"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <h2
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Stop designing in fragments.
        </h2>
        <p className="text-white/80 text-lg max-w-md mx-auto mb-8">
          Design systems that Cliq — from color to components.
        </p>
        <button
          onClick={() => setShowOnboarding(true)}
          className="px-8 py-3 rounded-[var(--radius)] font-semibold bg-white hover:bg-white/90 transition-colors"
          style={{ color: 'var(--primary)' }}
        >
          Start Designing Your System
        </button>
      </div>

      {/* Links */}
      <div className="mx-auto px-6 py-12" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg overflow-hidden shrink-0"
              >
                <img src="/cliq.png" className="w-full h-full object-contain" alt="Cliq" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display-family)' }}>
                Cliq System
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Built for designers and developers who think in systems.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold mb-4">{group}</h3>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg border border-border hover:bg-surface transition-colors">
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg border border-border hover:bg-surface transition-colors">
                <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cliq System. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
