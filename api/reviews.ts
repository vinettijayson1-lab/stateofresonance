import axios from 'axios'

const JUDGEME_TOKEN = '-V1Ltj5NCRp5rGiOoAB6tIZNG3s'
const SHOP_DOMAIN   = 'state-of-resonance.myshopify.com'
const BASE         = 'https://judge.me/api/v1'

const EMPTY_RESPONSE = {
  reviews: [],
  total: 0,
  current_page: 1,
  total_pages: 1,
  avg_rating: null,
  total_reviews: 0,
}

async function fetchWithRetry(url: string, params: Record<string, any>, attempts = 2): Promise<any> {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await axios.get(url, {
        params,
        timeout: 5000,
        headers: { 'Accept': 'application/json' }
      })
      return response.data
    } catch (err: any) {
      if (i === attempts - 1) throw err
      // Brief pause before retry
      await new Promise(r => setTimeout(r, 400))
    }
  }
}

export default async function handler(req: any, res: any) {
  // CORS for SPA
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=300')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const { handle, product_id, page = 1, per_page = 10 } = req.query

    const params: Record<string, any> = {
      api_token: JUDGEME_TOKEN,
      shop_domain: SHOP_DOMAIN,
      per_page: Math.min(parseInt(per_page as string) || 10, 50),
      page: parseInt(page as string) || 1,
    }

    if (handle) {
      params.handle = handle
    } else if (product_id) {
      params.product_id = product_id
    }

    const url = `${BASE}/reviews`

    let data: any
    try {
      data = await fetchWithRetry(url, params)
    } catch (fetchErr: any) {
      // Judge.me unavailable — return graceful empty response (no 502!)
      console.error('Judge.me fetch failed (graceful fallback):', fetchErr?.message)
      return res.status(200).json(EMPTY_RESPONSE)
    }

    if (!data) {
      return res.status(200).json(EMPTY_RESPONSE)
    }

    const reviews: any[] = data.reviews || []

    // Normalize to a clean shape — only expose what the frontend needs
    const normalized = reviews
      .filter((r: any) => r.hidden !== true)
      .map((r: any) => ({
        id:         r.id,
        rating:     r.rating,
        title:      r.title || '',
        body:       r.body  || '',
        created_at: r.created_at,
        reviewer:   {
          name:         r.reviewer?.name       || 'Anonymous',
          verified:     r.reviewer?.verified_buyer ?? false,
          location:     r.reviewer?.location   || null,
        },
        pictures: (r.pictures || []).map((p: any) => p.urls?.big || p.urls?.original || null).filter(Boolean)
      }))

    return res.status(200).json({
      reviews:       normalized,
      total:         data.reviews?.length ?? normalized.length,
      current_page:  data.current_page  ?? 1,
      total_pages:   data.total_pages   ?? 1,
      avg_rating:    data.avg_rating     ?? null,
      total_reviews: data.total_reviews  ?? normalized.length,
    })

  } catch (err: any) {
    console.error('Reviews handler error:', err?.message)
    // Always return 200 with empty data — never let reviews break the page
    return res.status(200).json(EMPTY_RESPONSE)
  }
}
