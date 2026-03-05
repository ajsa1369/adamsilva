'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'signup'

// Free / consumer email domains — business emails only
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.ca',
  'yahoo.com.au', 'ymail.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.ca',
  'outlook.com', 'live.com', 'live.co.uk', 'msn.com', 'aol.com',
  'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me',
  'pm.me', 'mail.com', 'gmx.com', 'gmx.net', 'zoho.com', 'inbox.com',
  'fastmail.com', 'hey.com', 'tutanota.com', 'guerrillamail.com',
])

function isBusinessEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain)
}

const CONSENT_TEXT =
  'I agree to receive marketing communications from Adam Silva Consulting via email and SMS. ' +
  'Message and data rates may apply. You may unsubscribe at any time by replying STOP or clicking unsubscribe.'

export function ACRALoginForm({ defaultMode = 'signup', redirectTo = '/acra/run' }: { defaultMode?: Mode; redirectTo?: string }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      if (!isBusinessEmail(email)) {
        setError('Please use your business email address. Personal email providers (Gmail, Outlook, Yahoo, etc.) are not accepted.')
        return
      }
      if (!phone.trim()) {
        setError('A mobile number is required so we can send you your report link.')
        return
      }
      if (!consent) {
        setError('Please confirm your consent to receive communications.')
        return
      }
    }

    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError

        // Log consent record server-side (IP + timestamp captured there)
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            phone: phone.trim(),
            consentText: CONSENT_TEXT,
            supabaseUserId: data.user?.id,
          }),
        })

        setSuccess('Check your email to confirm your account, then sign in to run your ACRA.')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Tab toggle */}
      <div className="flex rounded-xl border border-[var(--color-border)] overflow-hidden mb-6">
        {(['signup', 'login'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(''); setSuccess('') }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              mode === m
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-transparent text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]'
            }`}
          >
            {m === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email */}
        <div>
          <label htmlFor="auth-email" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
            Business Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]" />
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@yourcompany.com"
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
          </div>
          {mode === 'signup' && (
            <p className="text-xs text-[var(--color-muted-2)] mt-1">Business domains only — no Gmail, Outlook, Yahoo, etc.</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="auth-password" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]" />
            <input
              id="auth-password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Phone — signup only */}
        {mode === 'signup' && (
          <div>
            <label htmlFor="auth-phone" className="block text-xs font-semibold text-[var(--color-muted-2)] mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-2)]" />
              <input
                id="auth-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+1 (555) 000-0000"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text)]"
              />
            </div>
          </div>
        )}

        {/* Consent — signup only */}
        {mode === 'signup' && (
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="auth-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-accent)] shrink-0"
            />
            <label htmlFor="auth-consent" className="text-xs text-[var(--color-muted-2)] leading-relaxed">
              {CONSENT_TEXT}{' '}
              <a href="/privacy" className="text-[var(--color-accent)] hover:underline">Privacy Policy</a>.
            </label>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2" role="status">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (mode === 'signup' && !consent)}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {mode === 'signup' ? 'Create Free Account' : 'Sign In'}
        </button>
      </form>

      <p className="text-xs text-center text-[var(--color-muted-2)] mt-4">
        By creating an account you agree to our{' '}
        <a href="/terms" className="text-[var(--color-accent)] hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-[var(--color-accent)] hover:underline">Privacy Policy</a>.
      </p>
    </div>
  )
}
