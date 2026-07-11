import type { CoverState, GeneratedImage, CoverStyle } from '@/types'
import { getStyleById } from './styles'
import { generateId } from './utils'

// ===== MOCK AI (демо-режим) =====
export async function generateMockImages(
  state: CoverState,
  count: number = 4
): Promise<GeneratedImage[]> {
  const images: GeneratedImage[] = []

  for (let i = 0; i < count; i++) {
    const seed = Math.floor(Math.random() * 1000000)
    const canvas = document.createElement('canvas')
    const size = state.size
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Generate procedural art based on style
    drawProceduralArt(ctx, size, state.style, seed, state)

    // Add text overlay
    drawTextOverlay(ctx, state, size)

    const dataUrl = canvas.toDataURL('image/png')

    images.push({
      id: generateId(),
      url: dataUrl,
      seed,
      style: state.style,
      createdAt: Date.now(),
    })

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  }

  return images
}

function drawProceduralArt(
  ctx: CanvasRenderingContext2D,
  size: number,
  styleId: CoverStyle,
  seed: number,
  state: CoverState
) {
  const rng = seededRandom(seed)
  const promptColors = extractColorsFromPrompt(state.prompt)

  switch (styleId) {
    case 'minimal':
      drawMinimal(ctx, size, rng, promptColors)
      break
    case 'pop':
      drawPop(ctx, size, rng, promptColors)
      break
    case 'dark':
      drawDark(ctx, size, rng, promptColors)
      break
    case 'electronic':
      drawElectronic(ctx, size, rng, promptColors)
      break
    case 'indie':
      drawIndie(ctx, size, rng, promptColors)
      break
    case 'rock':
      drawRock(ctx, size, rng, promptColors)
      break
    case 'futuristic':
      drawFuturistic(ctx, size, rng, promptColors)
      break
    case 'ethnic':
      drawEthnic(ctx, size, rng, promptColors)
      break
    case 'mixed':
      drawMixed(ctx, size, rng, promptColors)
      break
    default:
      drawMinimal(ctx, size, rng, promptColors)
  }
}

function drawMinimal(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  const baseHue = promptColors[0] ?? (rng() * 60 + 200)
  ctx.fillStyle = `hsl(${baseHue}, 8%, ${rng() * 8 + 92}%)`
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 5; i++) {
    const hue = promptColors[i % promptColors.length] ?? (baseHue + rng() * 40)
    ctx.fillStyle = `hsla(${hue}, 25%, ${rng() * 15 + 35}%, 0.08)`
    const x = rng() * size * 0.8
    const y = rng() * size * 0.8
    const w = rng() * size * 0.3 + 80
    const h = rng() * size * 0.3 + 80
    ctx.fillRect(x, y, w, h)
  }
}

function drawPop(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  const c1 = promptColors[0] ?? (rng() * 60 + 300)
  const c2 = promptColors[1] ?? (c1 + 30)
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${c1}, 85%, 55%)`)
  grad.addColorStop(0.5, `hsl(${(c1 + c2) / 2}, 90%, 60%)`)
  grad.addColorStop(1, `hsl(${c2}, 80%, 50%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 25; i++) {
    ctx.beginPath()
    ctx.arc(rng() * size, rng() * size, rng() * 50 + 15, 0, Math.PI * 2)
    const hue = promptColors[i % promptColors.length] ?? (rng() * 360)
    ctx.fillStyle = `hsla(${hue}, 75%, 65%, ${rng() * 0.25 + 0.15})`
    ctx.fill()
  }
}

function drawDark(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  const baseHue = promptColors[0] ?? 220
  ctx.fillStyle = '#050508'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 6; i++) {
    const grad = ctx.createRadialGradient(
      rng() * size, rng() * size, 0,
      rng() * size, rng() * size, size * 0.6
    )
    const hue = promptColors[i % promptColors.length] ?? (baseHue + rng() * 40)
    grad.addColorStop(0, `hsla(${hue}, 40%, 25%, 0.25)`)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }

  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${rng() * 0.025})`
    ctx.fillRect(rng() * size, rng() * size, 1, 1)
  }
}

function drawElectronic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  ctx.fillStyle = '#050510'
  ctx.fillRect(0, 0, size, size)

  // Grid
  ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'
  ctx.lineWidth = 1
  const gridSize = 60
  for (let x = 0; x < size; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }
  for (let y = 0; y < size; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y)
    ctx.stroke()
  }

  // Neon glow with prompt colors
  for (let i = 0; i < 8; i++) {
    const glow = ctx.createRadialGradient(
      rng() * size, rng() * size, 0,
      rng() * size, rng() * size, size * 0.3
    )
    const hue = promptColors[i % promptColors.length] ?? (rng() * 60 + 280)
    glow.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.2)`)
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, size, size)
  }
}

function drawIndie(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  const baseHue = promptColors[0] ?? (rng() * 30 + 25)
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${baseHue}, 40%, 70%)`)
  grad.addColorStop(1, `hsl(${baseHue + 10}, 30%, 60%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Vignette
  const vignette = ctx.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size * 0.8)
  vignette.addColorStop(0, 'transparent')
  vignette.addColorStop(1, 'rgba(60, 40, 20, 0.4)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)
}

function drawRock(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  ctx.fillStyle = '#1a0a0a'
  ctx.fillRect(0, 0, size, size)

  // Scratches with prompt colors
  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    ctx.moveTo(rng() * size, rng() * size)
    ctx.lineTo(rng() * size, rng() * size)
    const hue = promptColors[i % promptColors.length] ?? 0
    ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = rng() * 3 + 0.5
    ctx.stroke()
  }

  // Texture
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255, ${rng() * 100}, ${rng() * 50}, ${rng() * 0.05})`
    ctx.fillRect(rng() * size, rng() * size, 2, 2)
  }
}

function drawFuturistic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  ctx.fillStyle = '#0a0f1a'
  ctx.fillRect(0, 0, size, size)

  // Geometric patterns with prompt colors
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    const x = rng() * size
    const y = rng() * size
    const r = rng() * 100 + 20
    ctx.arc(x, y, r, 0, Math.PI * 2)
    const hue = promptColors[i % promptColors.length] ?? (rng() * 60 + 180)
    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Lines
  for (let i = 0; i < 15; i++) {
    ctx.beginPath()
    ctx.moveTo(rng() * size, 0)
    ctx.lineTo(rng() * size, size)
    const hue = promptColors[i % promptColors.length] ?? (rng() * 60 + 180)
    ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${rng() * 0.15 + 0.05})`
    ctx.lineWidth = rng() * 2 + 0.5
    ctx.stroke()
  }
}

function drawEthnic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  ctx.fillStyle = '#1a1008'
  ctx.fillRect(0, 0, size, size)

  // Ornamental circles with prompt colors
  for (let i = 0; i < 5; i++) {
    const cx = rng() * size
    const cy = rng() * size
    for (let r = 20; r < 150; r += 20) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const hue = promptColors[i % promptColors.length] ?? (rng() * 40 + 25)
      ctx.strokeStyle = `hsla(${hue}, 60%, 40%, ${rng() * 0.2 + 0.1})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }
  }

  // Gold accents
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(200, 170, 80, ${rng() * 0.3 + 0.1})`
    ctx.fillRect(rng() * size, rng() * size, rng() * 4 + 1, rng() * 4 + 1)
  }
}

function drawMixed(ctx: CanvasRenderingContext2D, size: number, rng: () => number, promptColors: number[] = []) {
  // Random combination
  const style = ['minimal', 'pop', 'dark', 'electronic', 'indie', 'rock', 'futuristic', 'ethnic'][Math.floor(rng() * 8)] as CoverStyle
  switch (style) {
    case 'minimal': drawMinimal(ctx, size, rng); break
    case 'pop': drawPop(ctx, size, rng); break
    case 'dark': drawDark(ctx, size, rng); break
    case 'electronic': drawElectronic(ctx, size, rng); break
    case 'indie': drawIndie(ctx, size, rng); break
    case 'rock': drawRock(ctx, size, rng); break
    case 'futuristic': drawFuturistic(ctx, size, rng); break
    case 'ethnic': drawEthnic(ctx, size, rng); break
  }
}

function drawTextOverlay(ctx: CanvasRenderingContext2D, state: CoverState, size: number) {
  const { artist, track, fontSize, textColor, textPosition, showArtist, showTrack } = state

  if (!showArtist && !showTrack) return
  if (!artist.trim() && !track.trim()) return

  let baseX = size / 2
  let baseY = size / 2

  switch (textPosition) {
    case 'top': baseY = size * 0.22; break
    case 'center': baseY = size * 0.5; break
    case 'bottom': baseY = size * 0.78; break
    case 'free':
      baseX = size / 2 + state.artistOffsetX
      baseY = size * 0.5 + state.artistOffsetY
      break
  }

  const scaledFontSize = Math.max(20, Math.min(fontSize, size / 6))

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Deep shadow for readability
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowBlur = 35
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 5

  // Artist: elegant italic, uppercase, spaced
  if (showArtist && artist) {
    ctx.font = `italic 500 ${scaledFontSize * 0.45}px Inter, "Helvetica Neue", Arial, sans-serif`
    ctx.fillStyle = textColor + 'cc'
    ctx.fillText(artist.toUpperCase(), baseX, baseY - scaledFontSize * 0.55)
  }

  // Track: bold, tight tracking
  if (showTrack && track) {
    ctx.font = `900 ${scaledFontSize}px Inter, "Helvetica Neue", Arial, sans-serif`
    ctx.fillStyle = textColor
    ctx.fillText(track, baseX, baseY + scaledFontSize * 0.15)
  }

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
}

function extractColorsFromPrompt(prompt: string): number[] {
  const colors: number[] = []
  const colorKeywords: Record<string, number> = {
    'red': 0, 'красн': 0, 'ruby': 0, 'blood': 0,
    'orange': 30, 'оранж': 30, 'amber': 30,
    'yellow': 60, 'желт': 60, 'gold': 60, 'sun': 60,
    'green': 120, 'зелен': 120, 'emerald': 120, 'forest': 120,
    'cyan': 180, 'бирюз': 180, 'teal': 180,
    'blue': 220, 'син': 220, 'navy': 220, 'ocean': 220, 'sky': 220,
    'purple': 280, 'фиолет': 280, 'violet': 280, 'lavender': 280,
    'pink': 320, 'розов': 320, 'magenta': 320,
    'black': 0, 'черн': 0, 'dark': 0, 'shadow': 0,
    'white': 0, 'бел': 0, 'light': 0, 'snow': 0,
    'brown': 30, 'коричн': 30, 'chocolate': 30, 'wood': 30,
    'gray': 0, 'сер': 0, 'silver': 0, 'metal': 0,
  }
  const lower = prompt.toLowerCase()
  for (const [keyword, hue] of Object.entries(colorKeywords)) {
    if (lower.includes(keyword)) colors.push(hue)
  }
  return colors.length > 0 ? colors : [220, 280, 120] // default indigo-purple-green
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ===== REAL AI API (заглушки для интеграции) =====

export async function generateWithPuter(prompt: string, _referenceImage: string | null): Promise<string> {
  // Puter.js — фронтенд API, не требует бэкенда
  // @ts-expect-error — Puter загружается через CDN
  if (typeof puter !== 'undefined' && puter.ai?.image) {
    // @ts-expect-error
    const result = await puter.ai.image(prompt)
    return result
  }
  throw new Error('Puter.js не загружен. Добавьте <script src="https://puter.com/puter.js/v2"></script> в index.html')
}

export function buildPrompt(state: CoverState): string {
  const style = getStyleById(state.style)
  const parts: string[] = [
    'album cover art',
    state.prompt,
    style?.promptModifier || '',
    `featuring "${state.artist}" and "${state.track}"`,
    'square format',
    'high quality',
    'professional music artwork',
  ]
  return parts.filter(Boolean).join(', ')
}
