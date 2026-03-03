/**
 * lib/email/smtp.ts
 *
 * Shared SMTP email sender using nodemailer.
 * Reads SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS from env.
 * Used by authority-map routes (and any future server-side email in Next.js routes).
 *
 * Supabase edge functions (send-proposal-email) use Resend separately.
 */

import nodemailer from 'nodemailer'

export interface MailOptions {
  to: string | string[]
  subject: string
  html: string
  from?: string  // defaults to SMTP_FROM or "Adam Silva Consulting <SMTP_USER>"
}

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT ?? '465', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS in env')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,   // true for SSL (465), false for STARTTLS (587)
    auth: { user, pass },
  })
}

export async function sendMail(options: MailOptions): Promise<void> {
  const transporter = createTransporter()
  const smtpUser = process.env.SMTP_USER ?? ''
  const defaultFrom = process.env.SMTP_FROM ?? `Adam Silva Consulting <${smtpUser}>`

  await transporter.sendMail({
    from: options.from ?? defaultFrom,
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    subject: options.subject,
    html: options.html,
  })
}
