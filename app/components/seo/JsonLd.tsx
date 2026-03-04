interface JsonLdProps {
  data: object | object[]
}

export function JsonLd({ data }: JsonLdProps) {
  // Ensure every JSON-LD block has @context and uses @graph for arrays
  const normalized = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data }
    : (data as Record<string, unknown>)['@context']
      ? data
      : { '@context': 'https://schema.org', ...data }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(normalized, null, 0),
      }}
    />
  )
}
