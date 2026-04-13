import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@libsql/client/web'
import fs from 'fs'
import path from 'path'

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "libsql://state-of-resonance-vinettijayson1-lab.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path: routePath } = req.query
  const fullPath = routePath as string || ''
  
  let title = 'State of Resonance | Esoteric Luxury Sanctuary'
  let description = 'State of Resonance is Canada\'s premier esoteric luxury sanctuary, dedicated to the calibration of human frequency through alchemical artifacts.'
  let image = 'https://cdn.shopify.com/s/files/1/0787/0808/0663/files/resonance_twitter_card.png?v=1771234567'
  let url = `https://stateofresonance.ca${fullPath}`

  try {
    // 1. Identify Content (Product or Collection)
    if (fullPath.includes('/product/')) {
      const handle = fullPath.split('/product/')[1]?.split('?')[0]
      if (handle) {
        const rs = await libsql.execute({
          sql: `SELECT title, description, image FROM "Product" WHERE handle = ? LIMIT 1`,
          args: [handle]
        });
        if (rs.rows.length > 0) {
          const product = rs.rows[0];
          title = `${product.title} | State of Resonance`
          description = (String(product.description) || '').replace(/<[^>]*>/g, '').substring(0, 160) || `${product.title} — Esoteric luxury artifact.`
          image = String(product.image);
        }
      }
    } else if (fullPath.includes('/collections/')) {
      const handle = fullPath.split('/collections/')[1]?.split('?')[0]
      if (handle) {
        // We do not have a dedicated Collection table anymore, but we can derive from generic naming 
        // to prevent 500 error crashes on the edge when accessing hardcoded categories.
        const cleanName = handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${cleanName} Collection | State of Resonance`
        description = `Explore the ${cleanName} reservoir of alchemical artifacts at State of Resonance. Calibrate your field with our curated selection.`
      }
    } else if (fullPath.includes('/transmissions/')) {
      const slug = fullPath.split('/transmissions/')[1]?.split('?')[0]
      if (slug) {
        // Catch gracefully since transmission table is mostly offline or mocked
        const cleanName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${cleanName} | The Void Transmissions`
        description = `Transmission from the State of Resonance laboratory.`
      }
    }

    // 2. Read index.html template
    // In Vercel, the file is available at the project root
    const indexPath = path.join(process.cwd(), 'index.html')
    let html = fs.readFileSync(indexPath, 'utf8')

    // 3. Inject Meta Tags
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
    
    html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
    html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)
    html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)

    html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`)

    // 4. Return Modified HTML
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)

  } catch (error) {
    console.error('SEO Proxy Error:', error)
    // Fallback to static index.html if something fails
    try {
        const indexPath = path.join(process.cwd(), 'index.html')
        const html = fs.readFileSync(indexPath, 'utf8')
        res.setHeader('Content-Type', 'text/html')
        res.status(200).send(html)
    } catch (e) {
        res.status(500).send('Internal Resonance Error')
    }
  }
}
