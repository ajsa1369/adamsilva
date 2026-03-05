import type { ServiceSection } from '@/lib/data/services'

interface Props {
  sections: ServiceSection[]
  accentColor: string
}

export function ServiceDeepDive({ sections, accentColor }: Props) {
  return (
    <section className="section" aria-labelledby="deep-dive-heading">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <span
            className="badge mb-4"
            style={{
              background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            Deep Dive
          </span>
          <h2
            id="deep-dive-heading"
            className="text-3xl font-bold text-[var(--color-text)]"
          >
            Why This Matters
          </h2>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <article key={i} className="card p-6 lg:p-8">
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">
                {section.heading}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-sm speakable-answer">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
