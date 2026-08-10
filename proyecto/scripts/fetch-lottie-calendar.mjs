import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'src', 'assets', 'lottie', 'calendar-schedule.json')
const sourceUrl =
  'https://lottie.host/e68af6bb-a2a3-42f2-b2da-f8df421db4ab/rSeN1pJ3mF.json'

const ORANGE = [1, 0.4196078431372549, 0, 1]
const CARBON = [0.06666666666666667, 0.06666666666666667, 0.06666666666666667, 1]

function recolor(node) {
  if (!node || typeof node !== 'object') return
  if (node.ty === 'st' && node.c?.k) node.c.k = CARBON
  if (node.ty === 'fl' && node.c?.k) node.c.k = ORANGE
  if (Array.isArray(node)) node.forEach(recolor)
  else Object.values(node).forEach(recolor)
}

const response = await fetch(sourceUrl)
if (!response.ok) throw new Error(`Failed to fetch calendar Lottie: ${response.status}`)
const json = await response.json()
recolor(json)
json.nm = 'calendar-schedule'

writeFileSync(outPath, `${JSON.stringify(json)}\n`)
console.log(`Fetched and recolored calendar Lottie -> ${outPath}`)
