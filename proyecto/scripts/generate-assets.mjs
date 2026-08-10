import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const svg = readFileSync(join(__dirname, 'og-template.svg'))

await sharp(svg).resize(1200, 630).png().toFile(join(publicDir, 'og.png'))

await sharp(readFileSync(join(publicDir, 'favicon.svg')))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'))

await sharp(readFileSync(join(publicDir, 'favicon.svg')))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon.ico'))

const profileSvg = readFileSync(join(__dirname, 'profile-placeholder.svg'))
await sharp(profileSvg).jpeg({ quality: 88 }).toFile(join(publicDir, 'profile.jpg'))

console.log('Generated og.png, apple-touch-icon.png, favicon.ico, profile.jpg')
