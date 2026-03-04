import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase/service'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const customer = body?.customer
    if (!customer?.name || !customer?.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create a contact submission for the free ACRA request
    const { error } = await supabaseService
      .from('contact_submissions')
      .insert({
        name: customer.name,
        email: customer.email,
        company: customer.company || null,
        service: 'acra',
        message: 'Free ACRA request via checkout',
      })

    if (error) {
      console.error('[checkout/free] Failed to create submission:', error.message)
      return NextResponse.json(
        { error: 'Failed to submit request' },
        { status: 500 }
      )
    }

    // Also create a free order record
    await supabaseService
      .from('orders')
      .insert({
        stripe_customer_id: 'free',
        customer_name: customer.name,
        customer_email: customer.email,
        customer_company: customer.company || null,
        items: [{ id: 'acra', type: 'service', name: 'Agentic Commerce Readiness Assessment (ACRA)' }],
        setup_total: 0,
        monthly_total: 0,
        status: 'paid',
        payment_type: 'free',
      })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[checkout/free] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
