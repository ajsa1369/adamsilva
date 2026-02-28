import { NextRequest, NextResponse } from 'next/server'
import { transporter } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    let email: string
    let firstName: string | undefined

    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = body.email
      firstName = body.first_name || body.firstName
    } else {
      const formData = await request.formData()
      email = formData.get('email') as string
      firstName = formData.get('first_name') as string || undefined
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/newsletter_signups`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal,resolution=ignore-duplicates',
          },
          body: JSON.stringify({
            email,
            first_name: firstName || email.split('@')[0],
            opted_in: true,
          }),
        })
        if (!res.ok && res.status !== 409) {
          console.error('Newsletter signup failed:', await res.text())
        }
      } catch (err) {
        console.error('Supabase error:', err)
      }
    }

    if (process.env.SMTP_HOST) {
      try {
        await transporter.sendMail({
          from: `"Adam Silva Consulting" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'Welcome to the Agentic Commerce Intelligence Brief',
          html: `
            <h2>You're in.</h2>
            <p>Hi${firstName ? ` ${firstName}` : ''},</p>
            <p>You're now subscribed to the <strong>Agentic Commerce Intelligence Brief</strong> — the definitive source for UCP, ACP, and AP2 protocol updates, AI commerce strategy, and implementation intelligence.</p>
            <p>Every issue covers what AI agents are actually doing to commerce right now, and what you need to do about it.</p>
            <p><a href="https://www.adamsilvaconsulting.com/insights">Read our latest insights &rarr;</a></p>
            <hr>
            <p style="font-size:12px;color:#666;">Adam Silva Consulting &mdash; Global Infrastructure for Agentic Commerce<br>
            <a href="https://www.adamsilvaconsulting.com">adamsilvaconsulting.com</a></p>
          `,
        })
      } catch (err) {
        console.error('Welcome email error:', err)
      }
    }

    if (!contentType.includes('application/json')) {
      const referer = request.headers.get('referer') || '/'
      return NextResponse.redirect(new URL(referer))
    }

    return NextResponse.json({ success: true, message: "You're subscribed! Check your inbox." })
  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
