/**
 * app/api/intake/pdf/route.tsx
 *
 * Generates a branded proposal PDF using @react-pdf/renderer.
 * Called by: lib/intake/tools.ts generateProposalPDF tool (via internal fetch)
 * Also called directly from: /get-started page "Download PDF" CTA
 *
 * Uses Node.js runtime (not edge) — renderToBuffer requires Node.js Buffer.
 * INTAKE-06: PDF delivered to prospect email via send-proposal-email edge function.
 */

import React from 'react'
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Brand colors — matches globals.css design tokens
const NAVY = '#1B2E4B'
const BLUE = '#4D8EC0'
const BLUE_LIGHT = '#85C1DF'
const SURFACE = '#F8FAFF'
const MUTED = '#64748B'
const TEXT = '#0F172A'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: SURFACE,
    padding: 48,
  },
  header: {
    backgroundColor: NAVY,
    margin: -48,
    marginBottom: 32,
    padding: 32,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontFamily: 'Courier',
    marginBottom: 6,
  },
  proposalName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginBottom: 4,
  },
  prospectName: {
    fontSize: 13,
    color: TEXT,
    marginBottom: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderLeft: `3px solid ${BLUE}`,
  },
  statLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Courier',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
  },
  divider: {
    borderBottom: `1px solid #E2E8F0`,
    marginBottom: 20,
  },
  integrationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottom: `1px solid #F1F5F9`,
  },
  integrationName: {
    fontSize: 11,
    color: TEXT,
  },
  integrationTier: {
    fontSize: 10,
    color: BLUE,
    fontFamily: 'Helvetica-Bold',
  },
  integrationCost: {
    fontSize: 10,
    color: MUTED,
    textAlign: 'right',
  },
  overageLabel: {
    fontSize: 10,
    color: '#F59E0B',
    fontFamily: 'Helvetica-Bold',
  },
  reasoning: {
    fontSize: 10,
    color: MUTED,
    lineHeight: 1.6,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 6,
    borderLeft: `3px solid ${BLUE_LIGHT}`,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1px solid #E2E8F0`,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: MUTED,
  },
  cta: {
    backgroundColor: BLUE,
    borderRadius: 6,
    padding: '10 20',
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
})

interface PDFRequest {
  proposalId?: string
  prospectName: string
  prospectEmail?: string
  packageSlug: string
  setupTotal: number
  monthlyTotal: number
  integrations?: Array<{ name: string; tier: number; setupCost: number; monthlyCost: number; included: boolean }>
  tierReasoning?: string
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function ProposalPDF({ data }: { data: PDFRequest }) {
  const packageName = `${capitalize(data.packageSlug.replace(/-/g, ' '))} Package`
  const included = (data.integrations ?? []).filter(i => i.included)
  const overages = (data.integrations ?? []).filter(i => !i.included)
  const createdAt = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Document title={`ASC Proposal — ${data.prospectName}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Adam Silva Consulting</Text>
          <Text style={styles.headerSubtitle}>Global Infrastructure for Agentic Commerce</Text>
        </View>

        {/* Prospect + package */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Proposal for</Text>
          <Text style={styles.prospectName}>{data.prospectName}</Text>
          <Text style={styles.proposalName}>{packageName}</Text>
        </View>

        {/* Pricing stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Setup Investment</Text>
            <Text style={styles.statValue}>${data.setupTotal.toLocaleString()}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Monthly Retainer</Text>
            <Text style={styles.statValue}>${data.monthlyTotal.toLocaleString()}/mo</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Integrations</Text>
            <Text style={styles.statValue}>{String(included.length)}</Text>
          </View>
        </View>

        {/* Tier reasoning */}
        {data.tierReasoning ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Why this package</Text>
            <Text style={styles.reasoning}>{data.tierReasoning}</Text>
          </View>
        ) : null}

        {/* Included integrations */}
        {included.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Included Integrations</Text>
            {included.map(i => (
              <View key={i.name} style={styles.integrationRow}>
                <Text style={styles.integrationName}>{i.name}</Text>
                <Text style={styles.integrationTier}>Tier {i.tier}</Text>
                <Text style={styles.integrationCost}>${i.setupCost.toLocaleString()} / ${i.monthlyCost.toLocaleString()}/mo</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Overage integrations */}
        {overages.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: '#F59E0B' }]}>Add-On Integrations (outside package)</Text>
            {overages.map(i => (
              <View key={i.name} style={styles.integrationRow}>
                <Text style={styles.integrationName}>{i.name}</Text>
                <View>
                  <Text style={styles.overageLabel}>Tier {i.tier} (Overage)</Text>
                  <Text style={styles.integrationCost}>+${i.setupCost.toLocaleString()} / +${i.monthlyCost.toLocaleString()}/mo</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Book Strategy Call: calendly.com/adamsilva/strategy</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Adam Silva Consulting · adamsilvaconsulting.com</Text>
          <Text style={styles.footerText}>Generated: {createdAt}</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function POST(req: Request) {
  const body = await req.json() as PDFRequest

  if (!body.prospectName || !body.packageSlug || body.setupTotal == null || body.monthlyTotal == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const buffer = await renderToBuffer(<ProposalPDF data={body} />)

  // Return as base64 data URI (simpler for v1 — no Vercel Blob needed)
  const base64 = buffer.toString('base64')
  const pdfUrl = `data:application/pdf;base64,${base64}`

  return NextResponse.json({ pdfUrl })
}
