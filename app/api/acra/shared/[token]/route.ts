import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { token } = await params

  if (!token || !/^[0-9a-f-]{36}$/i.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }

  // Use service role to bypass RLS — token acts as the auth
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('acra_reports')
    .select(`*, acra_scans ( url, company_name, industry, monthly_revenue_range, framework, created_at )`)
    .eq('share_token', token)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
