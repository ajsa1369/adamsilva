import React from 'react'

export interface ComparisonRow {
  feature: string           // row label
  values: (boolean | string | null)[]  // one per column
  // boolean: true = check, false = cross
  // string: displayed as-is
  // null: displayed as dash
  highlight?: boolean       // bold row label
}

export interface ComparisonTableProps {
  columns: string[]         // column headers
  rows: ComparisonRow[]
  caption?: string
  className?: string
}

function CellValue({ value }: { value: boolean | string | null }): React.JSX.Element {
  if (value === true) {
    return <span className="text-emerald-400 font-bold">✓</span>
  }
  if (value === false) {
    return <span className="text-red-400">✗</span>
  }
  if (value === null) {
    return <span className="text-[var(--color-muted-2)]">—</span>
  }
  return <span className="text-[var(--color-muted)]">{value}</span>
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  className = '',
}: ComparisonTableProps): React.JSX.Element {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className="w-full text-sm border-collapse">
        {caption && (
          <caption className="text-xs text-[var(--color-muted-2)] py-2 text-left">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-[var(--color-surface-2)]">
            {/* Feature column header */}
            <th className="text-left text-[var(--color-text)] font-semibold py-3 px-4 min-w-[160px]">
              Feature
            </th>
            {columns.map((col, i) => (
              <th
                key={i}
                className="text-center text-[var(--color-text)] font-semibold py-3 px-4 min-w-[120px]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-[var(--color-border)] ${
                rowIdx % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-transparent'
              }`}
            >
              <td
                className={`py-3 px-4 text-left ${
                  row.highlight
                    ? 'font-bold text-[var(--color-text)]'
                    : 'font-medium text-[var(--color-text)]'
                }`}
              >
                {row.feature}
              </td>
              {row.values.map((val, colIdx) => (
                <td key={colIdx} className="py-3 px-4 text-center">
                  <CellValue value={val} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
