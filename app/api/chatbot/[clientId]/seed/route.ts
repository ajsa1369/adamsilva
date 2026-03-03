import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import { embedText } from '@/lib/chatbot/embedder'

export const runtime = 'nodejs'

export async function POST(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  // Auth check
  const seedSecret = process.env.CHATBOT_SEED_SECRET
  if (seedSecret) {
    const authHeader = req.headers.get('x-seed-secret')
    if (authHeader !== seedSecret) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const { clientId } = params
  const body = await req.json() as {
    chunks: Array<{ content: string; source: string; metadata?: Record<string, unknown> }>
  }

  if (!Array.isArray(body.chunks) || body.chunks.length === 0) {
    return Response.json({ error: 'chunks array required' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  let seeded = 0
  let skipped = 0
  let errors = 0

  for (const chunk of body.chunks) {
    const contentHash = createHash('sha256').update(chunk.content).digest('hex')

    // Check if already exists (dedup by content_hash)
    const { data: existing } = await supabase
      .from('chatbot_knowledge')
      .select('id')
      .eq('client_id', clientId)
      .eq('content_hash', contentHash)
      .maybeSingle()

    if (existing) {
      skipped++
      continue
    }

    // Embed the content
    let embedding: number[]
    try {
      embedding = await embedText(chunk.content)
    } catch (err) {
      console.error('Embedding failed for chunk:', chunk.source, err)
      errors++
      continue
    }

    // Upsert knowledge chunk
    const { error } = await supabase.from('chatbot_knowledge').upsert(
      {
        client_id: clientId,
        content: chunk.content,
        source: chunk.source,
        metadata: chunk.metadata ?? {},
        content_hash: contentHash,
        embedding,
      },
      { onConflict: 'client_id,content_hash', ignoreDuplicates: true }
    )

    if (error) {
      console.error('Upsert failed:', error)
      errors++
    } else {
      seeded++
    }
  }

  return Response.json({ seeded, skipped, errors })
}
