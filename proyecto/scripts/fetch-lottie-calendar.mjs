import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'src', 'assets', 'lottie', 'calendar-schedule.json')
const sourceUrl =
  'https://lottie.host/e68af6bb-a2a3-42f2-b2da-f8df421db4ab/rSeN1pJ3mF.json'

const ORANGE = [1, 0.4196078431372549, 0, 1]
const CARBON = [0.06666666666666667, 0.06666666666666667, 0.06666666666666667, 1]
const TECH = [0.4196078431372549, 0.4470588235294118, 0.5019607843137255, 1]

function recolorVectors(node) {
  if (!node || typeof node !== 'object') return
  if (node.ty === 'st' && node.c?.k) node.c.k = CARBON
  if (node.ty === 'fl' && node.c?.k) {
    const [r, g, b] = node.c.k
    const isGreen = g > r + 0.15 && g > b + 0.1
    const isBlue = b > r + 0.1 && b > g + 0.05
    const isPurple = r > 0.35 && b > 0.35 && g < Math.min(r, b) - 0.05
  if (isGreen || isBlue || isPurple) {
      node.c.k = ORANGE
    } else if (r + g + b > 1.8) {
      node.c.k = TECH
    } else {
      node.c.k = CARBON
    }
  }
  if (Array.isArray(node)) node.forEach(recolorVectors)
  else Object.values(node).forEach(recolorVectors)
}

async function recolorEmbeddedPng(dataUrl) {
  if (!dataUrl?.startsWith('data:image/png;base64,')) return dataUrl

  const input = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64')
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const pixels = new Uint8Array(data)

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    const a = pixels[i + 3]
    if (a < 12) continue

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const isBlue = b > r + 28 && b > g + 18
    const isGreen = g > r + 35 && g > b + 18
    const isPurple = r > 90 && b > 90 && g < Math.min(r, b) - 20
    const isAccent = isBlue || isGreen || isPurple

    if (isAccent) {
      pixels[i] = 255
      pixels[i + 1] = 107
      pixels[i + 2] = 0
      continue
    }

    if (max - min < 24) {
      if (max < 70) {
        pixels[i] = 17
        pixels[i + 1] = 17
        pixels[i + 2] = 17
      } else if (max < 210) {
        pixels[i] = 107
        pixels[i + 1] = 114
        pixels[i + 2] = 128
      }
    }
  }

  const output = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()

  return `data:image/png;base64,${output.toString('base64')}`
}

async function recolorAssets(assets = []) {
  for (const asset of assets) {
    if (typeof asset.p === 'string' && asset.p.startsWith('data:image/')) {
      asset.p = await recolorEmbeddedPng(asset.p)
    }
  }
}

const response = await fetch(sourceUrl)
if (!response.ok) throw new Error(`Failed to fetch calendar Lottie: ${response.status}`)
const json = await response.json()

recolorVectors(json)
await recolorAssets(json.assets)
json.nm = 'calendar-schedule'

writeFileSync(outPath, `${JSON.stringify(json)}\n`)
console.log(`Fetched and recolored calendar Lottie -> ${outPath}`)
