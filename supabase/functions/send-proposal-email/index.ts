import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

/**
 * supabase/functions/send-proposal-email/index.ts
 *
 * Phase 4 Implementation (replaces scaffold from Phase 2).
 * Sends a branded proposal email to the prospect via Resend.
 * Called after generate-proposal returns a proposal_id and PDF URL is available.
 * Returns: { success: true, email_id: string }
 *
 * INTAKE-06: Prospect receives a PDF proposal via email automatically
 */

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const FROM_EMAIL = 'Adam Silva Consulting <info@adamsilvaconsulting.com>'
const SITE_URL = 'https://www.adamsilvaconsulting.com'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

interface SendProposalEmailRequest {
  proposal_id: string
  prospect_email: string
  prospect_name: string
  proposal_pdf_url: string
  package_name: string
  setup_total: number
  monthly_total: number
}

function proposalEmailHtml(
  name: string,
  packageName: string,
  setupTotal: number,
  monthlyTotal: number,
  pdfUrl: string,
  proposalId: string,
): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your ASC Proposal</title></head>
<body style="font-family: Inter, sans-serif; background: #f8faff; margin: 0; padding: 40px 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: #1B2E4B; padding: 40px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Your Proposal is Ready</h1>
      <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0;">Adam Silva Consulting · Agentic Commerce Platform</p>
    </div>
    <div style="padding: 40px;">
      <h2 style="color: #1B2E4B; font-size: 20px; margin: 0 0 16px;">Hi ${name},</h2>
      <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
        Thank you for going through our qualification process. Based on your business context and tech stack,
        we've prepared a personalized proposal for you.
      </p>

      <div style="background: #f8faff; border-radius: 8px; padding: 24px; margin: 24px 0; border-left: 4px solid #4D8EC0;">
        <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">Recommended Package</p>
        <p style="color: #1B2E4B; font-size: 22px; font-weight: 800; margin: 0 0 16px;">${packageName}</p>
        <div style="display: flex; gap: 32px;">
          <div>
            <p style="color: #64748b; font-size: 12px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">Setup Investment</p>
            <p style="color: #1B2E4B; font-size: 18px; font-weight: 700; margin: 0;">$${setupTotal.toLocaleString()}</p>
          </div>
          <div>
            <p style="color: #64748b; font-size: 12px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">Monthly Retainer</p>
            <p style="color: #1B2E4B; font-size: 18px; font-weight: 700; margin: 0;">$${monthlyTotal.toLocaleString()}/mo</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${pdfUrl}" style="background: #4D8EC0; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">
          Download Your PDF Proposal &rarr;
        </a>
      </div>

      <p style="color: #475569; line-height: 1.6; margin: 24px 0 16px;">
        Ready to discuss the details? Book a complimentary 30-minute strategy call:
      </p>
      <div style="text-align: center; margin: 16px 0;">
        <a href="https://calendly.com/adamsilva/strategy" style="background: #1B2E4B; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
          Book Strategy Call
        </a>
      </div>

      <p style="color: #94a3b8; font-size: 12px; margin: 32px 0 0;">Proposal reference: ${proposalId}</p>
    </div>
    <div style="background: #f8faff; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Adam Silva Consulting · <a href="${SITE_URL}" style="color: #64748b;">adamsilvaconsulting.com</a></p>
    </div>
  </div>
</body>
</html>`
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

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }

  let body: SendProposalEmailRequest
  try {
    body = await req.json() as SendProposalEmailRequest
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: CORS_HEADERS,
    })
  }

  const { proposal_id, prospect_email, prospect_name, proposal_pdf_url, package_name, setup_total, monthly_total } = body
  if (!proposal_id || !prospect_email || !prospect_name || !proposal_pdf_url) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: CORS_HEADERS,
    })
  }

  const html = proposalEmailHtml(
    prospect_name,
    package_name ?? 'ASC Package',
    setup_total ?? 0,
    monthly_total ?? 0,
    proposal_pdf_url,
    proposal_id,
  )

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [prospect_email],
      subject: `Your Adam Silva Consulting Proposal — ${package_name ?? 'Review'}`,
      html,
      tags: [
        { name: 'type', value: 'proposal_delivery' },
        { name: 'proposal_id', value: proposal_id },
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    return new Response(JSON.stringify({ success: false, error: `Resend ${res.status}: ${errText}` }), {
      status: 500,
      headers: CORS_HEADERS,
    })
  }

  const data = await res.json() as { id: string }
  return new Response(JSON.stringify({ success: true, email_id: data.id }), {
    status: 200,
    headers: CORS_HEADERS,
  })
})
