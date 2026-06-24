'use client'

import { motion } from 'framer-motion'
import { Icon, type IconName } from '@/components/common/Icon'

const FEATURES: Array<{
  iconName: IconName
  title: string
  subtitle: string
  body: string
}> = [
  {
    iconName: 'palette',
    title: 'Color Systems',
    subtitle: 'Structured color, not guesswork.',
    body: 'Define core neutrals, brand palette, and see how they distribute across real UI using proven ratios like 60–30–10.',
  },
  {
    iconName: 'type',
    title: 'Typography',
    subtitle: 'Type that actually works in UI.',
    body: 'Pair fonts, control hierarchy, and preview real text instantly. "The quick brown fox jumps over the lazy dog."',
  },
  {
    iconName: 'layers',
    title: 'UI Style',
    subtitle: 'Shape your interface feel.',
    body: 'Adjust border radius, spacing, shadows, and density — and watch your UI transform live with every change.',
  },
  {
    iconName: 'grid',
    title: 'Layout System',
    subtitle: 'Design how sections breathe.',
    body: 'Control spacing, structure, and layout rhythm across navbar, hero, and content sections dynamically.',
  },
  {
    iconName: 'eye',
    title: 'Live Preview',
    subtitle: 'See your system in context.',
    body: 'Your design isn\'t previewed on abstract boxes — it\'s applied to a full interface that updates instantly.',
  },
  {
    iconName: 'download',
    title: 'Export Ready',
    subtitle: 'Take your system anywhere.',
    body: 'Export as CSS variables, Tailwind config, JSON tokens, or a complete HTML template.',
  },
]

export function Features() {
  return (
    <section id="features" className="section bg-background">
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            Everything your design system needs.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From color palettes to typography to layout — all connected, all live.
          </p>
        </div>

        <div
          data-cliq-target="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'var(--grid-gap)' }}
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              data-cliq-target="card surface"
              className="card group hover:shadow-lg transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                }}
              >
                <Icon
                  name={feature.iconName}
                  size={20}
                  style={{ color: 'var(--primary)' }}
                />
              </div>
              <h3
                className="text-base font-semibold mb-1"
                style={{ fontFamily: 'var(--font-heading-family)' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--primary)' }}>
                {feature.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
