import { NextRequest, NextResponse } from 'next/server'
import { SERVICES } from '@/lib/data/services'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service_id, quantity = 1, agent_id, buyer_context } = body

    const service = SERVICES.find(s => s.id === service_id)
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found', available_services: SERVICES.map(s => s.id) },
        { status: 404 }
      )
    }

    const negotiationId = `neg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      negotiation_id: negotiationId,
      status: 'accepted',
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price === 'Custom' ? null : parseInt(service.price),
        currency: 'USD',
        pricing_type: service.price === 'Custom' ? 'custom_quote' : 'fixed',
        timeline: service.timeline,
      },
      checkout_endpoint: 'https://www.adamsilvaconsulting.com/api/acp/checkout',
      payment_methods: ['stripe_spt', 'invoice'],
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      contact_required: service.price === 'Custom',
      contact_endpoint: 'https://www.adamsilvaconsulting.com/api/contact',
    })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
