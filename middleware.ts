import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Handle ?format=json requests — return JSON representation of the page schema
  if (searchParams.get('format') === 'json') {
    const url = request.nextUrl.clone()
    url.pathname = `/api/schema${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and API
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
