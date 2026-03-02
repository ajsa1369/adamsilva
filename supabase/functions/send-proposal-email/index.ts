import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

// Phase 4 Implementation:
// - Accept: { proposal_id, prospect_email, prospect_name, proposal_pdf_url }
// - Send branded proposal email via Resend with PDF attachment link
// - Return: { success: true, email_id }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
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

  return new Response(
    JSON.stringify({ success: true, message: 'send-proposal-email scaffold', phase: 4 }),
    { headers: CORS_HEADERS, status: 200 }
  )
})
