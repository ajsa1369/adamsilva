import type { ServiceComparisonRow } from '@/lib/data/services'
import { Check, X } from 'lucide-react'

interface Props {
  title: string
  rows: ServiceComparisonRow[]
  accentColor: string
}

function CellContent({ text }: { text: string }) {
  if (text === 'Yes' || text === 'Included') {
    return <Check size={16} className="text-green-500 mx-auto" aria-label="Yes" />
  }
  if (text === 'No' || text === 'Not included') {
    return <X size={16} className="text-red-400 mx-auto" aria-label="No" />
  }
  return <span>{text}</span>
}

export function ServiceComparisonTable({ title, rows, accentColor }: Props) {
  return (
    <section className="section" aria-labelledby="comparison-heading">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <span
            className="badge mb-4"
            style={{
              background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            Comparison
          </span>
          <h2
            id="comparison-heading"
            className="text-3xl font-bold text-[var(--color-text)]"
          >
            {title}
          </h2>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm" aria-label={title}>
            <thead>
              <tr
                style={{
                  background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                }}
              >
                <th className="text-left p-4 font-semibold text-[var(--color-text)]">
                  Feature
                </th>
                <th
                  className="text-center p-4 font-bold"
                  style={{ color: accentColor }}
                >
                  Adam Silva Consulting
                </th>
                <th className="text-center p-4 font-semibold text-[var(--color-muted-2)]">
                  Typical Alternative
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-[var(--color-border)]"
                >
                  <td className="p-4 text-[var(--color-text)] font-medium">
                    {row.feature}
                  </td>
                  <td className="p-4 text-center text-[var(--color-text)]">
                    <CellContent text={row.us} />
                  </td>
                  <td className="p-4 text-center text-[var(--color-muted-2)]">
                    <CellContent text={row.them} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
