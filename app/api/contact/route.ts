import { NextRequest, NextResponse } from 'next/server'
import { transporter } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Get IP and user agent for spam prevention
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Try to store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            name,
            email,
            company: company || null,
            service: service || null,
            message,
            ip_address: ip,
            user_agent: userAgent,
            status: 'new',
          }),
        })

        if (!res.ok) {
          console.error('Supabase insert failed:', await res.text())
        }
      } catch (err) {
        console.error('Supabase error:', err)
      }
    }

    // Send email notification via SMTP
    if (process.env.SMTP_HOST) {
      try {
        await transporter.sendMail({
          from: `"Adam Silva Consulting" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          replyTo: email,
          subject: `New Contact: ${name} — ${service || 'General Inquiry'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <small>IP: ${ip} | ${new Date().toISOString()}</small>
          `,
        })
      } catch (err) {
        console.error('Email send error:', err)
      }
    }

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll respond within 24 hours.' })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
