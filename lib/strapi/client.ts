const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.adamsilvaconsulting.com'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export class StrapiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'StrapiError'
  }
}

export async function fetchStrapi<T>(
  path: string,
  options: { revalidate?: number; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 3600, tags = [] } = options

  const url = `${STRAPI_URL}/api${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
  }

  let res: Response
  try {
    res = await fetch(url, {
      headers,
      next: {
        revalidate,
        ...(tags.length > 0 && { tags }),
      },
    })
  } catch (err) {
    // Strapi not available — return empty data for graceful degradation
    console.error('Strapi fetch error:', err)
    throw new StrapiError(`Failed to connect to Strapi at ${STRAPI_URL}`)
  }

  if (!res.ok) {
    throw new StrapiError(`Strapi returned ${res.status} for ${path}`, res.status)
  }

  const json = await res.json()
  return json.data as T
}

export async function fetchStrapiSafe<T>(
  path: string,
  fallback: T,
  options?: { revalidate?: number; tags?: string[] }
): Promise<T> {
  try {
    return await fetchStrapi<T>(path, options)
  } catch {
    return fallback
  }
}
