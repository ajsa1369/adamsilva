'use client'

import { useState, useRef } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service...' },
  { value: 'acra', label: 'ACRA — Agentic Commerce Readiness Assessment' },
  { value: 'aeo-audit', label: 'AEO Audit' },
  { value: 'geo-implementation', label: 'GEO Implementation' },
  { value: 'authority-building', label: 'Authority Building' },
  { value: 'protocol-implementation', label: 'Protocol Implementation' },
  { value: 'other', label: 'Other' },
]

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setFormData(initialFormData)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={48} style={{ color: '#10b981' }} />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
          Message Received
        </h3>
        <p className="text-[var(--color-muted)] mb-6">
          Thank you for reaching out. Adam will review your inquiry and respond within 24
          business hours. Your free 15-minute consultation is included.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-[var(--color-text)] mb-1.5"
        >
          Full Name <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            color: 'var(--color-text)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-[var(--color-text)] mb-1.5"
        >
          Email Address <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            color: 'var(--color-text)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-[var(--color-text)] mb-1.5"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name (optional)"
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            color: 'var(--color-text)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-semibold text-[var(--color-text)] mb-1.5"
        >
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            color: formData.service ? 'var(--color-text)' : 'var(--color-muted-2)',
            fontSize: '0.9375rem',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-[var(--color-text)] mb-1.5"
        >
          Message <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project — what protocol you need, your current tech stack, and your timeline..."
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            color: 'var(--color-text)',
            fontSize: '0.9375rem',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.15s ease',
            fontFamily: 'inherit',
            lineHeight: '1.6',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      {/* Error state */}
      {status === 'error' && (
        <div
          className="flex items-start gap-2.5 p-4 rounded-lg text-sm"
          style={{
            background: 'color-mix(in srgb, #ef4444 10%, transparent)',
            border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
            color: '#ef4444',
          }}
          role="alert"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full justify-center"
        style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-xs text-[var(--color-muted-2)] text-center">
        We respond to all inquiries within 24 business hours.
      </p>
    </form>
  )
}
