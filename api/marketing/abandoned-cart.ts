import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const rs = await libsql.execute('SELECT * FROM "AbandonedCart" ORDER BY lastActivity DESC LIMIT 30');
      // Normalize JSON strings implicitly where Prisma used to
      const carts = rs.rows.map(r => {
          let items = r.items;
          try { items = typeof r.items === 'string' ? JSON.parse(r.items) : r.items } catch (e) {}
          return {
              id: r.id,
              cartId: r.cartId,
              items,
              totalValue: r.totalValue,
              seekerEmail: r.seekerEmail,
              status: r.status,
              lastActivity: r.lastActivity,
              createdAt: r.createdAt
          };
      });
      return res.status(200).json(carts)
    }

    if (req.method === 'POST') {
      const { cartId, items, totalValue, seekerEmail } = req.body
      
      if (!cartId) {
        return res.status(400).json({ error: 'Missing cartId in field transmission' })
      }

      const rs = await libsql.execute({
        sql: `SELECT id FROM "AbandonedCart" WHERE cartId = ? LIMIT 1`,
        args: [cartId]
      });

      if (rs.rows.length > 0) {
        await libsql.execute({
          sql: `UPDATE "AbandonedCart" SET items = ?, totalValue = ?, seekerEmail = ?, lastActivity = CURRENT_TIMESTAMP, status = 'pending' WHERE cartId = ?`,
          args: [JSON.stringify(items), totalValue, seekerEmail || null, cartId]
        });
      } else {
        const idStr = Math.random().toString(36).substring(2, 10);
        await libsql.execute({
          sql: `INSERT INTO "AbandonedCart" (id, cartId, items, totalValue, seekerEmail, status, lastActivity, createdAt) VALUES (?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          args: [idStr, cartId, JSON.stringify(items), totalValue, seekerEmail || null]
        });
      }

      const updatedRs = await libsql.execute({
         sql: `SELECT * FROM "AbandonedCart" WHERE cartId = ?`,
         args: [cartId]
      });

      return res.status(201).json(updatedRs.rows[0])
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)

  } catch (error: any) {
    console.error('Abandoned Cart Sync Error:', error.message)
    res.status(500).json({ error: 'Failed to synchronize abandonment protocol', details: error.message })
  }
}
