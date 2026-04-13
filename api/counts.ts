import { createClient } from '@libsql/client/web'

export default async function handler(req: any, res: any) {
  try {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
      authToken: process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzUzNDU4NDcsImlkIjoiMDE5ZDVhZGItNTgwMS03OGE4LWIwNDktNWRmNmEwOGU4YzZlIiwicmlkIjoiNDBiYmU0MTYtNzE5ZS00ZWRkLThjOGYtNDdlZGFiYjJkZmVlIn0.En4Q1irj4FPQBcP0ws_6qTi4HGXTpvnzPNWsHazFeJeDr7O583GzXAJGeCYh2wTaUirC6LK6QfqZ2-LQbRftAg"
    })

    const rs = await libsql.execute('SELECT category, count(id) as cnt FROM "Product" GROUP BY category')
    
    const countMap = rs.rows.reduce((acc: Record<string, number>, row: any) => {
      const cat = row.category || 'Uncategorized'
      acc[cat] = Number(row.cnt)
      return acc
    }, {})

    res.status(200).json(countMap)
  } catch (error: any) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to fetch counts', details: error.message || String(error), stack: error.stack })
  }
}
