import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

/**
 * supabase/functions/generate-proposal/index.ts
 *
 * Phase 4 Implementation (replaces scaffold from Phase 2).
 * Accepts proposal data from app/api/intake/chat/route.ts (via onFinish callback)
 * or directly from app/api/intake/pdf/route.ts.
 * Inserts a full row into the proposals table using the service role key.
 * Returns: { success: true, proposal_id: string }
 *
 * INTAKE-05: Generated proposal is stored in Supabase proposals table
 */

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

interface GenerateProposalRequest {
  prospect_name: string
  prospect_email: string
  industry?: string
  locations?: number
  monthly_leads?: number
  platform?: string
  platform_tier?: 'legacy' | 'full' | 'migration'
  integrations_detected?: Array<{ name: string; tier: number; setupCost: number; monthlyCost: number; included: boolean }>
  goals?: string[]
  recommended_package: string
  setup_total: number
  monthly_total: number
  proposal_pdf_url?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: CORS_HEADERS,
    })
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Supabase credentials not configured' }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }

  let body: GenerateProposalRequest
  try {
    body = await req.json() as GenerateProposalRequest
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: CORS_HEADERS,
    })
  }

  // Validate required fields
  const { prospect_name, prospect_email, recommended_package, setup_total, monthly_total } = body
  if (!prospect_name || !prospect_email || !recommended_package || setup_total == null || monthly_total == null) {
    return new Response(JSON.stringify({ error: 'Missing required fields: prospect_name, prospect_email, recommended_package, setup_total, monthly_total' }), {
      status: 400,
      headers: CORS_HEADERS,
    })
  }

  // Insert into proposals table via Supabase REST API
  const insertPayload = {
    prospect_name,
    prospect_email,
    industry: body.industry ?? null,
    locations: body.locations ?? null,
    monthly_leads: body.monthly_leads ?? null,
    platform: body.platform ?? null,
    platform_tier: body.platform_tier ?? null,
    integrations_detected: body.integrations_detected ? JSON.stringify(body.integrations_detected) : null,
    goals: body.goals ? JSON.stringify(body.goals) : null,
    recommended_package,
    setup_total,
    monthly_total,
    proposal_pdf_url: body.proposal_pdf_url ?? null,
    status: 'pending_call',
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/proposals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(insertPayload),
  })

  if (!res.ok) {
    const errText = await res.text()
    return new Response(JSON.stringify({ error: `Database insert failed: ${errText}` }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }

  const rows = await res.json() as Array<{ id: string }>
  const proposal_id = rows[0]?.id ?? null

  return new Response(JSON.stringify({ success: true, proposal_id }), {
    status: 200,
    headers: CORS_HEADERS,
  })
})
