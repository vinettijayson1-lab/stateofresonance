import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const rs = await libsql.execute('SELECT * FROM "InfluencerFulfillment" ORDER BY createdAt DESC');
      return res.status(200).json(rs.rows)
    } catch (error: any) {
      console.error('Fetch Error:', error.message)
      return res.status(500).json({ error: 'Failed to fetch influencer ledger.' })
    }
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body
    if (!id || !status) return res.status(400).json({ error: 'Missing ID or status' })
    try {
      await libsql.execute({
        sql: `UPDATE "InfluencerFulfillment" SET status = ? WHERE id = ?`,
        args: [status, id]
      });
      const updatedRs = await libsql.execute({ sql: `SELECT * FROM "InfluencerFulfillment" WHERE id = ?`, args: [id] });
      return res.status(200).json(updatedRs.rows[0])
    } catch (error: any) {
      console.error('Update Error:', error.message)
      return res.status(500).json({ error: 'Failed to update request status.' })
    }
  }

  if (req.method === 'POST') {
    const { fullName, handle, itemSelected, size, address, city, province, country, postalCode, email } = req.body

    if (!fullName || !address || !handle || !email) {
      return res.status(400).json({ error: 'Missing required field coordinates (Name, Address, Handle, Email).' })
    }
  try {
    const idStr = Math.random().toString(36).substring(2, 10);
    await libsql.execute({
      sql: `INSERT INTO "InfluencerFulfillment" 
            (id, fullName, handle, email, itemSelected, size, address, city, province, country, postalCode, status, createdAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)`,
      args: [
        idStr,
        fullName,
        handle,
        email,
        itemSelected || 'Unknown',
        size || 'N/A',
        address,
        city || 'Unknown',
        province || 'Unknown',
        country || 'Canada',
        postalCode || 'Unknown'
      ]
    })
    
    return res.status(200).json({ 
      success: true, 
      message: 'Transmission Synchronized. Laboratory Awaiting Calibration.',
      details: 'Check your Alchemical Ledger for the final resonance click.'
    })

  } catch (error: any) {
    console.error('Submission Error:', error.message)
    return res.status(500).json({ 
      error: 'Calibration failed.', 
      details: error.message 
    })
  }
}
}
