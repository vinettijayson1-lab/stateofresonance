import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, 'public')

console.log('Converting hero_banner.png → WebP...')

await sharp(join(publicDir, 'hero_banner.png'))
  .webp({ quality: 82, effort: 6 })
  .toFile(join(publicDir, 'hero_banner.webp'))

const input = (await import('fs')).statSync(join(publicDir, 'hero_banner.png')).size
const output = (await import('fs')).statSync(join(publicDir, 'hero_banner.webp')).size
console.log(`✅ Done: ${(input/1024).toFixed(0)}KB PNG → ${(output/1024).toFixed(0)}KB WebP (${((1-output/input)*100).toFixed(0)}% smaller)`)
