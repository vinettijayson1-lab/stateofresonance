import axios from 'axios'

const JUDGEME_TOKEN = '-V1Ltj5NCRp5rGiOoAB6tIZNG3s'
const SHOP_DOMAIN   = 'state-of-resonance.myshopify.com'
const BASE         = 'https://judge.me/api/v1'

export default async function handler(req: any, res: any) {
  // CORS for SPA
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const { handle, product_id, page = 1, per_page = 10 } = req.query

    // If neither handle nor product_id provided, return aggregate/homepage reviews
    let url: string
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

    url = `${BASE}/reviews`

    const jmRes = await axios.get(url, {
      params,
      timeout: 6000,
      headers: { 'Accept': 'application/json' }
    })

    if (!jmRes.data) return res.status(502).json({ error: 'Empty response from Judge.me' })

    const reviews: any[] = jmRes.data.reviews || []

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
      total:         jmRes.data.reviews?.length ?? normalized.length,
      current_page:  jmRes.data.current_page  ?? 1,
      total_pages:   jmRes.data.total_pages   ?? 1,
      avg_rating:    jmRes.data.avg_rating     ?? null,
      total_reviews: jmRes.data.total_reviews  ?? normalized.length,
    })

  } catch (err: any) {
    console.error('Judge.me proxy error:', err?.message)
    res.status(502).json({ error: 'Could not fetch reviews', detail: err?.message })
  }
}
