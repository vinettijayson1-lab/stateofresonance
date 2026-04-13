import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { id, handle } = req.body
  if (!id || !handle) {
    return res.status(400).json({ error: 'Missing influencer ID or handle' })
  }

  try {
    // Check if the influencer already has a code
    const rs = await libsql.execute({
      sql: `SELECT * FROM "InfluencerFulfillment" WHERE id = ? LIMIT 1`,
      args: [id]
    });

    if (rs.rows.length === 0) {
      return res.status(404).json({ error: 'Influencer record not found.' })
    }

    const influencer = rs.rows[0];

    if (influencer.discountCode) {
      return res.status(400).json({ error: 'Discount code already exists for this influencer.', code: influencer.discountCode })
    }

    const cleanHandle = handle.replace('@', '').toUpperCase()
    // Simulate successful promo code string mapping for affiliate router
    const promoCode = `SOR-GIFT-${cleanHandle}`

    // 3. Save to DB
    await libsql.execute({
      sql: `UPDATE "InfluencerFulfillment" SET discountCode = ?, status = 'approved' WHERE id = ?`,
      args: [promoCode, id]
    });

    const updatedRs = await libsql.execute({
      sql: `SELECT * FROM "InfluencerFulfillment" WHERE id = ? LIMIT 1`,
      args: [id]
    });

    return res.status(200).json({ 
      success: true, 
      discountCode: promoCode, 
      influencer: updatedRs.rows[0] 
    })

  } catch (error: any) {
    console.error('Shopify Code Generation Error:', error.response?.data || error.message)
    return res.status(500).json({ 
      error: 'Failed to provision discount code via Shopify.', 
      details: error.response?.data || error.message 
    })
  }
}
