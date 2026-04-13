import { createClient } from '@libsql/client/web'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: any, res: any) {
  const { slug, category, limit } = req.query

  try {
    if (slug) {
      const rs = await libsql.execute({
        sql: `SELECT * FROM "Transmission" WHERE slug = ? LIMIT 1`,
        args: [String(slug)]
      });
      if (rs.rows.length === 0) return res.status(404).json({ error: 'Transmission Lost' })
      const transmission: any = rs.rows[0];

      // Reconstruct featured products if necessary
      const productsRs = await libsql.execute({
        sql: `SELECT B.* FROM "_ProductToTransmission" A JOIN "Product" B ON A.A = B.id WHERE A.B = ?`,
        args: [transmission.id]
      });
      transmission.featuredProducts = productsRs.rows;

      return res.status(200).json(transmission)
    }

    let sql = `SELECT * FROM "Transmission"`;
    let args: any[] = [];
    if (category) {
       sql += ` WHERE category = ?`;
       args.push(String(category).toUpperCase());
    }
    sql += ` ORDER BY publishedAt DESC LIMIT ?`;
    args.push(limit ? parseInt(String(limit)) : 50);

    const transmissions = await libsql.execute({ sql, args });

    return res.status(200).json(transmissions.rows)
  } catch (error) {
    console.error('[API] Transmission Error:', error)
    return res.status(500).json({ error: 'Failed to synchronize with the Void' })
  }
}
