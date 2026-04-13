import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'
import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  // 1. Synchronize/Fetch Seeker
  if (method === 'GET') {
    const email = req.query.email as string
    const referredBy = req.query.referredBy as string | undefined
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid frequency key (email)' })
    }

    try {
      let rs = await libsql.execute({
        sql: `SELECT * FROM "Seeker" WHERE email = ? LIMIT 1`,
        args: [email.toLowerCase()]
      });

      // If seeker doesn't exist geographically in the DB, materialize them.
      if (rs.rows.length === 0) {
        // Generate a random 6-character esoteric referral code
        const refCode = 'SR-' + crypto.randomBytes(3).toString('hex').toUpperCase()
        
        let startingPoints = 50;
        let referrerSeeker: any = null;

        // Process Referral
        if (referredBy) {
          const referrerRs = await libsql.execute({
             sql: `SELECT * FROM "Seeker" WHERE referralCode = ? LIMIT 1`,
             args: [referredBy.toUpperCase()]
          });
          if (referrerRs.rows.length > 0) {
             referrerSeeker = referrerRs.rows[0];
             startingPoints = 100; // Bonus for being invited!
          }
        }

        const idStr = Math.random().toString(36).substring(2, 10);
        
        await libsql.execute({
          sql: `INSERT INTO "Seeker" (id, email, tier, resonanceScore, referralCode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          args: [
            idStr, 
            email.toLowerCase(), 
            '396_HZ', 
            startingPoints, 
            refCode
          ]
        });

        const newSeeker = (await libsql.execute({ sql: `SELECT * FROM "Seeker" WHERE id = ?`, args: [idStr] })).rows[0];

        // If a valid referral occurred, credit the referrer
        if (referrerSeeker) {
          await libsql.execute({
            sql: `INSERT INTO "Referral" (id, referrerId, refereeEmail, achievedAlignment, createdAt) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)`,
            args: [Math.random().toString(36).substring(2, 10), referrerSeeker.id, email.toLowerCase()]
          });

          await libsql.execute({
             sql: `UPDATE "Seeker" SET resonanceScore = resonanceScore + 50, invitesSuccess = invitesSuccess + 1 WHERE id = ?`,
             args: [referrerSeeker.id]
          });
        }
        
        return res.status(200).json(newSeeker)
      } else {
        // Update last login
        const existingSeeker = rs.rows[0];
        await libsql.execute({
          sql: `UPDATE "Seeker" SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?`,
          args: [existingSeeker.id]
        });
        
        // return updated state
        const updatedRs = await libsql.execute({
          sql: `SELECT * FROM "Seeker" WHERE id = ?`,
          args: [existingSeeker.id]
        });
        return res.status(200).json(updatedRs.rows[0])
      }

    } catch (err: any) {
      console.error('[Seeker API] Failed to fetch/create seeker:', err.message)
      return res.status(500).json({ error: 'Database desynchronized' })
    }
  }

  // 2. Transmute Seeker (Update points/tier)
  if (method === 'POST') {
    const { email, addPoints, forceTier } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid frequency key (email)' })
    }

    try {
      const rs = await libsql.execute({
        sql: `SELECT * FROM "Seeker" WHERE email = ? LIMIT 1`,
        args: [email.toLowerCase()]
      });

      if (rs.rows.length === 0) {
        return res.status(404).json({ error: 'Seeker not found. Must GET first to initialize.' })
      }

      let seeker = rs.rows[0] as any;

      // Calculate new score and tier
      let newScore = Number(seeker.resonanceScore) || 0;
      if (typeof addPoints === 'number') {
        newScore += addPoints
      }

      // Automatic Tier Promotion Logic
      let newTier = String(seeker.tier)
      if (forceTier) {
        newTier = forceTier
      } else {
        if (newScore >= 50) newTier = '417_HZ'
        if (newScore >= 100) newTier = '528_HZ'
        if (newScore >= 200) newTier = '639_HZ'
        if (newScore >= 300) newTier = '741_HZ'
        if (newScore >= 400) newTier = '852_HZ'
        if (newScore >= 500) newTier = '963_HZ'
        if (newScore >= 963) newTier = 'RESONANCE_ACHIEVED'
      }

      await libsql.execute({
        sql: `UPDATE "Seeker" SET resonanceScore = ?, tier = ? WHERE id = ?`,
        args: [newScore, newTier, seeker.id]
      });
      
      const updatedRs = await libsql.execute({
          sql: `SELECT * FROM "Seeker" WHERE id = ?`,
          args: [seeker.id]
      });

      return res.status(200).json(updatedRs.rows[0])
    } catch (err: any) {
      console.error('[Seeker API] Failed to update seeker:', err.message)
      return res.status(500).json({ error: 'Database desynchronized' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
