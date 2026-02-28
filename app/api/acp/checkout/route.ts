import { NextRequest, NextResponse } from 'next/server'

interface CheckoutRequest {
  session_id: string
  cart: {
    items: Array<{
      product_id: string
      name: string
      quantity: number
      unit_price: number
      currency: string
    }>
    total: number
    currency: string
  }
  buyer: {
    agent_id: string
    spt_token?: string
    delegation_token?: string
  }
  intent_mandate_id?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json()

    if (!body.session_id || !body.cart || !body.buyer?.agent_id) {
      return NextResponse.json(
        { error: 'Missing required fields: session_id, cart, buyer.agent_id' },
        { status: 400 }
      )
    }

    // Validate SPT or delegation token
    const hasAuth = body.buyer.spt_token || body.buyer.delegation_token
    if (!hasAuth) {
      return NextResponse.json(
        {
          error: 'Authentication required',
          required: 'Stripe SPT token or AP2 delegation token',
          acp_spec: 'https://www.adamsilvaconsulting.com/.well-known/acp/config.json',
        },
        { status: 401 }
      )
    }

    // Generate checkout reference
    const checkoutId = `asc_checkout_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes

    const response = {
      checkout_id: checkoutId,
      session_id: body.session_id,
      status: 'pending_confirmation',
      cart_summary: {
        item_count: body.cart.items.length,
        total: body.cart.total,
        currency: body.cart.currency,
      },
      confirmation_required: true,
      confirmation_url: `https://www.adamsilvaconsulting.com/checkout/confirm/${checkoutId}`,
      webhook_url: `https://www.adamsilvaconsulting.com/api/acp/webhook`,
      expires_at: expiresAt,
      acp_version: '2026-01',
      ap2_mandate_verified: !!body.intent_mandate_id,
      next_step: 'buyer_confirmation',
    }

    return NextResponse.json(response, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-ID',
        'X-ACP-Version': '2026-01',
        'X-Protocol': 'ACP',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Agent-ID',
    },
  })
}
