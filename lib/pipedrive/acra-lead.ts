/**
 * lib/pipedrive/acra-lead.ts
 *
 * Creates a Pipedrive Person + Deal for ACRA strategy call bookings.
 * Requires: PIPEDRIVE_API_TOKEN, PIPEDRIVE_DOMAIN env vars.
 * PIPEDRIVE_DOMAIN = your subdomain, e.g. "adamsilvaconsulting"
 */

const PILLAR_LABELS: Record<string, string> = {
  protocol: 'Protocol Compliance',
  'structured-data': 'Structured Data',
  aeo: 'AEO',
  geo: 'GEO',
  seo: 'SEO Foundation',
  social: 'Social Authority',
  press: 'Press Coverage',
  'ai-authority': 'AI Authority',
  'llm-recommendation': 'LLM Recommendation',
}

interface ACRALeadPayload {
  name: string
  email: string
  company?: string
  phone?: string
  domain: string
  acraScore?: number
  criticalGaps?: number
  pillarScores?: Record<string, number>
  message?: string
}

interface PipedrivePersonResponse {
  success: boolean
  data?: { id: number }
}

interface PipedriveDealResponse {
  success: boolean
  data?: { id: number }
}

function pipedriveUrl(path: string): string {
  const domain = process.env.PIPEDRIVE_DOMAIN ?? 'api'
  const token = process.env.PIPEDRIVE_API_TOKEN ?? ''
  return `https://${domain}.pipedrive.com/api/v1${path}?api_token=${token}`
}

async function findOrCreatePerson(name: string, email: string, phone?: string, company?: string): Promise<number | null> {
  const token = process.env.PIPEDRIVE_API_TOKEN
  if (!token) return null

  // Search for existing person by email
  try {
    const searchRes = await fetch(
      pipedriveUrl(`/persons/search`) + `&term=${encodeURIComponent(email)}&fields=email&exact_match=true`,
      { headers: { 'Content-Type': 'application/json' } }
    )
    if (searchRes.ok) {
      const searchData = await searchRes.json() as { success: boolean; data?: { items?: Array<{ item: { id: number } }> } }
      if (searchData.success && searchData.data?.items?.length) {
        return searchData.data.items[0].item.id
      }
    }
  } catch { /* fall through to create */ }

  // Create new person
  const createRes = await fetch(pipedriveUrl('/persons'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email: [{ value: email, primary: true }],
      phone: phone ? [{ value: phone, primary: true }] : [],
      org_name: company ?? '',
    }),
  })

  if (!createRes.ok) return null
  const createData = await createRes.json() as PipedrivePersonResponse
  return createData.success && createData.data ? createData.data.id : null
}

async function createDeal(personId: number, title: string): Promise<number | null> {
  const ownerId = process.env.PIPEDRIVE_OWNER_ID ? parseInt(process.env.PIPEDRIVE_OWNER_ID, 10) : undefined
  const pipelineId = process.env.PIPEDRIVE_PIPELINE_ID ? parseInt(process.env.PIPEDRIVE_PIPELINE_ID, 10) : undefined
  const res = await fetch(pipedriveUrl('/deals'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      person_id: personId,
      status: 'open',
      ...(ownerId && { user_id: ownerId }),
      ...(pipelineId && { pipeline_id: pipelineId }),
    }),
  })
  if (!res.ok) return null
  const data = await res.json() as PipedriveDealResponse
  return data.success && data.data ? data.data.id : null
}

async function addNote(dealId: number, content: string): Promise<void> {
  await fetch(pipedriveUrl('/notes'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ deal_id: dealId, content }),
  })
}

export async function pushACRALeadToPipedrive(payload: ACRALeadPayload): Promise<{ success: boolean; dealId?: number }> {
  if (!process.env.PIPEDRIVE_API_TOKEN) {
    return { success: false }
  }

  try {
    const personId = await findOrCreatePerson(payload.name, payload.email, payload.phone, payload.company)
    if (!personId) return { success: false }

    const dealTitle = `ACRA Strategy Call — ${payload.domain}${payload.acraScore != null ? ` (Score: ${payload.acraScore}/100)` : ''}`
    const dealId = await createDeal(personId, dealTitle)
    if (!dealId) return { success: false }

    // Build pillar scores table for note
    const pillarTable = payload.pillarScores
      ? Object.entries(payload.pillarScores)
          .map(([key, score]) => {
            const label = PILLAR_LABELS[key] ?? key
            const bar = '█'.repeat(Math.round(score / 10)).padEnd(10, '░')
            const status = score >= 60 ? '✅' : score >= 40 ? '⚠️' : '❌'
            return `${status} ${label}: <b>${score}/100</b> ${bar}`
          })
          .join('<br>')
      : null

    // Build recommended services list
    const recs: string[] = []
    const p = payload.pillarScores ?? {}
    if ((p['protocol'] ?? 100) < 60) recs.push('• UCP/ACP/AP2 Protocol Implementation — From $15,000')
    if ((p['press'] ?? 100) < 60) recs.push('• Press Release Syndication — $6,500 + $3,000/mo')
    if ((p['aeo'] ?? 100) < 60) recs.push('• AEO Audit + Implementation — $5,000')
    if ((p['geo'] ?? 100) < 60) recs.push('• GEO Content Architecture — $7,500')
    if ((p['social'] ?? 100) < 60) recs.push('• Social Authority Building — $6,500 + $1,500/mo')
    if ((p['structured-data'] ?? 100) < 60) recs.push('• Structured Data & Schema Library — $5,000')
    if ((p['ai-authority'] ?? 100) < 60 && (p['llm-recommendation'] ?? 100) < 50) recs.push('• AI Authority & Brand Entity Program — $15,000')

    const noteLines = [
      `<b>ACRA Report — ${payload.domain}</b>`,
      payload.acraScore != null ? `Overall Score: <b>${payload.acraScore}/100</b>` : '',
      payload.criticalGaps != null ? `Critical Gaps: <b>${payload.criticalGaps}</b>` : '',
      pillarTable ? `<br><b>Pillar Scores:</b><br>${pillarTable}` : '',
      recs.length > 0 ? `<br><b>Recommended Services:</b><br>${recs.join('<br>')}` : '',
      payload.message ? `<br><b>Message:</b><br>${payload.message.replace(/\n/g, '<br>')}` : '',
      `<br><i>Lead source: ACRA Tool — Free Strategy Call request</i>`,
    ].filter(Boolean).join('<br>')

    await addNote(dealId, noteLines)

    return { success: true, dealId }
  } catch {
    return { success: false }
  }
}
