import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      email: string
      phone: string
      consentText: string
      supabaseUserId?: string
    }

    const { email, phone, consentText, supabaseUserId } = body

    if (!email || !phone || !consentText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Capture IP and user agent for legal consent record
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const consentedAt = new Date().toISOString()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/acra_consent_log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          email,
          phone,
          consent_text: consentText,
          consented_at: consentedAt,
          ip_address: ip,
          user_agent: userAgent,
          supabase_user_id: supabaseUserId ?? null,
        }),
      })

      if (!res.ok) {
        console.error('Consent log insert failed:', await res.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Register route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
