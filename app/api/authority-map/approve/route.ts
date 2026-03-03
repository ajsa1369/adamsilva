/**
 * app/api/authority-map/approve/route.ts
 *
 * GET endpoint: client clicks the "Approve Content Calendar" link in their email.
 * Fetches the authority_maps row, sets approved_at, returns an HTML confirmation page.
 *
 * URL: /api/authority-map/approve?id={uuid}
 */

export const runtime = 'nodejs'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getMonthLabel(yyyyMm: string): string {
  const [year, monthNum] = yyyyMm.split('-')
  const idx = parseInt(monthNum, 10) - 1
  return `${MONTHS[idx]} ${year}`
}

function htmlResponse(title: string, body: string, status = 200): Response {
  return new Response(
    `<html>
<head>
  <title>${title}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; color: #1B2E4B; padding: 0 20px; }
    h1 { color: #4D8EC0; }
    p { line-height: 1.6; }
    a { color: #4D8EC0; }
  </style>
</head>
<body>
  ${body}
</body>
</html>`,
    { status, headers: { 'Content-Type': 'text/html' } },
  )
}

interface AuthorityMapRow {
  id: string
  client_id: string
  month: string
  approved_at: string | null
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return htmlResponse(
        'Missing Parameter',
        '<h1>Invalid Link</h1><p>This approval link is missing a required parameter. Please contact <a href="mailto:info@adamsilvaconsulting.com">info@adamsilvaconsulting.com</a> if you need help.</p>',
        400,
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey) {
      throw new Error('Supabase environment variables not configured')
    }

    // Fetch the row
    const fetchRes = await fetch(
      `${supabaseUrl}/rest/v1/authority_maps?id=eq.${encodeURIComponent(id)}&select=id,client_id,month,approved_at`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!fetchRes.ok) {
      return htmlResponse(
        'Not Found',
        '<h1>Not Found</h1><p>This content calendar could not be found. Please contact <a href="mailto:info@adamsilvaconsulting.com">info@adamsilvaconsulting.com</a>.</p>',
        404,
      )
    }

    const rows = await fetchRes.json() as AuthorityMapRow[]
    if (!rows || rows.length === 0) {
      return htmlResponse(
        'Not Found',
        '<h1>Not Found</h1><p>This content calendar could not be found. Please contact <a href="mailto:info@adamsilvaconsulting.com">info@adamsilvaconsulting.com</a>.</p>',
        404,
      )
    }

    const row = rows[0]
    const monthLabel = getMonthLabel(row.month)

    // Already approved — idempotent response
    if (row.approved_at) {
      return htmlResponse(
        'Already Approved',
        `<h1>Already Approved</h1>
         <p>Your ${monthLabel} content calendar was already approved. Blog production is underway.</p>
         <p>You'll receive updates from Adam Silva Consulting as each post is produced.</p>
         <p><a href="https://www.adamsilvaconsulting.com">Return to site</a></p>`,
      )
    }

    // Set approved_at
    const patchRes = await fetch(
      `${supabaseUrl}/rest/v1/authority_maps?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved_at: new Date().toISOString() }),
      },
    )

    if (!patchRes.ok) {
      const errText = await patchRes.text()
      throw new Error(`Supabase PATCH failed: ${patchRes.status} ${errText}`)
    }

    // Return confirmation page
    return new Response(
      `<html><head><title>Content Calendar Approved</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>body{font-family:sans-serif;max-width:600px;margin:40px auto;color:#1B2E4B;padding:0 20px;}
h1{color:#4D8EC0;}p{line-height:1.6;}a{color:#4D8EC0;}</style></head>
<body><h1>Content Calendar Approved</h1>
<p>Your ${monthLabel} content calendar has been approved. Blog production begins this week.</p>
<p>You'll receive updates from Adam Silva Consulting as each post is produced.</p>
<p><a href="https://www.adamsilvaconsulting.com" style="color:#4D8EC0;">Return to site</a></p>
</body></html>`,
      { headers: { 'Content-Type': 'text/html' } },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ error: message }, { status: 500 })
  }
}
