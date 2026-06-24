'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    step: '01',
    title: 'Define your foundation',
    body: 'Pick your base colors and brand palette. Set the neutrals that everything else will reference.',
  },
  {
    step: '02',
    title: 'Shape your system',
    body: 'Adjust typography, layout, and UI style — from font pairings to border radius to spacing scale.',
  },
  {
    step: '03',
    title: 'See it live',
    body: 'Watch your system applied to a real interface. Every change reflects instantly across all sections.',
  },
  {
    step: '04',
    title: 'Export and use',
    body: 'Download your design system as CSS variables, Tailwind config, JSON tokens, or a full HTML template.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading-family)' }}
          >
            From idea to system in minutes.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No design degree required. Just answer a few guided questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 25%, transparent)' }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 relative"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold z-10"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {step.step}
              </div>
              <h3
                className="text-lg font-semibold"
                style={{ fontFamily: 'var(--font-heading-family)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
