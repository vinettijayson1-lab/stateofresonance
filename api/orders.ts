import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const rs = await libsql.execute('SELECT * FROM "Order" ORDER BY createdAt DESC LIMIT 50');
      // Normalize JSON strings implicitly where Prisma used to
      const orders = rs.rows.map(r => {
          let items = r.items;
          try { items = typeof r.items === 'string' ? JSON.parse(r.items) : r.items } catch (e) {}
          return {
              id: r.id,
              transmissionId: r.transmissionId,
              totalRevenue: r.totalRevenue,
              totalProfit: r.totalProfit,
              currency: r.currency,
              createdAt: r.createdAt,
              items
          };
      });
      return res.status(200).json(orders)
    }

    if (req.method === 'POST') {
      const { transmissionId, totalRevenue, items, currency } = req.body
      
      // Calculate Profit based on internal COGS
      const itemIds: string[] = items.map((i: any) => i.id);
      let costMap: any = {};

      if (itemIds.length > 0) {
          const placeholders = itemIds.map(() => '?').join(',');
          const rs = await libsql.execute({
             sql: `SELECT id, cost FROM "Product" WHERE id IN (${placeholders})`,
             args: itemIds
          });
          costMap = rs.rows.reduce((acc: any, p: any) => {
             acc[p.id] = p.cost;
             return acc;
          }, {});
      }

      let totalProfit = 0
      items.forEach((item: any) => {
        const cost = costMap[item.id] || 0
        const revenue = item.priceValue * item.quantity
        totalProfit += (revenue - (cost * item.quantity))
      })

      // Assuming table "Order" structure is matching the Prisma creation
      // We will generate an ID natively inside the DB if it is a CUID/UUID implicitly,
      // or handle it via a fast ID gen. Using standard generation via Turso allows standard insertions.
      const idStr = Math.random().toString(36).substring(2, 10);
      
      await libsql.execute({
        sql: `INSERT INTO "Order" (id, transmissionId, totalRevenue, totalProfit, currency, items, createdAt) 
              VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        args: [
           idStr,
           transmissionId || null,
           totalRevenue,
           totalProfit,
           currency || 'CAD',
           JSON.stringify(items)
        ]
      });

      return res.status(201).json({ id: idStr, totalRevenue, totalProfit });
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)

  } catch (error: any) {
    console.error('Alchemical Ledger Error:', error.message)
    res.status(500).json({ error: 'Failed to synchronize ledger', details: error.message })
  }
}
