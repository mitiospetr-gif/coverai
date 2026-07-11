import type { CoverState, GeneratedImage, CoverStyle } from '@/types'
import { getStyleById } from './styles'
import { generateId } from './utils'

// ===== MOCK AI (демо-режим) =====
export async function generateMockImages(
  state: CoverState,
  count: number = 4
): Promise<GeneratedImage[]> {
  const style = getStyleById(state.style)
  const images: GeneratedImage[] = []

  for (let i = 0; i < count; i++) {
    const seed = Math.floor(Math.random() * 1000000)
    const canvas = document.createElement('canvas')
    const size = state.size
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Generate procedural art based on style
    drawProceduralArt(ctx, size, state.style, seed, style?.preview || '')

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
  preview: string
) {
  const rng = seededRandom(seed)

  // Background
  switch (styleId) {
    case 'minimal':
      drawMinimal(ctx, size, rng)
      break
    case 'pop':
      drawPop(ctx, size, rng)
      break
    case 'dark':
      drawDark(ctx, size, rng)
      break
    case 'electronic':
      drawElectronic(ctx, size, rng)
      break
    case 'indie':
      drawIndie(ctx, size, rng)
      break
    case 'rock':
      drawRock(ctx, size, rng)
      break
    case 'futuristic':
      drawFuturistic(ctx, size, rng)
      break
    case 'ethnic':
      drawEthnic(ctx, size, rng)
      break
    case 'mixed':
      drawMixed(ctx, size, rng)
      break
    default:
      drawMinimal(ctx, size, rng)
  }
}

function drawMinimal(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  ctx.fillStyle = `hsl(${rng() * 60 + 200}, 10%, ${rng() * 10 + 90}%)`
  ctx.fillRect(0, 0, size, size)

  // Subtle geometric shapes
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = `hsla(${rng() * 60 + 200}, 20%, ${rng() * 20 + 40}%, 0.1)`
    const x = rng() * size
    const y = rng() * size
    const w = rng() * size * 0.4 + 50
    const h = rng() * size * 0.4 + 50
    ctx.fillRect(x, y, w, h)
  }
}

function drawPop(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${rng() * 60 + 300}, 80%, 60%)`)
  grad.addColorStop(1, `hsl(${rng() * 60 + 330}, 90%, 50%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Bubbles
  for (let i = 0; i < 20; i++) {
    ctx.beginPath()
    ctx.arc(rng() * size, rng() * size, rng() * 40 + 10, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${rng() * 360}, 70%, 70%, ${rng() * 0.3 + 0.1})`
    ctx.fill()
  }
}

function drawDark(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  ctx.fillStyle = '#0a0a0f'
  ctx.fillRect(0, 0, size, size)

  // Light rays
  for (let i = 0; i < 5; i++) {
    const grad = ctx.createRadialGradient(
      rng() * size, rng() * size, 0,
      rng() * size, rng() * size, size * 0.5
    )
    grad.addColorStop(0, `hsla(${rng() * 40 + 200}, 30%, 30%, 0.3)`)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }

  // Film grain
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${rng() * 0.03})`
    ctx.fillRect(rng() * size, rng() * size, 1, 1)
  }
}

function drawElectronic(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
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

  // Neon glow
  for (let i = 0; i < 8; i++) {
    const glow = ctx.createRadialGradient(
      rng() * size, rng() * size, 0,
      rng() * size, rng() * size, size * 0.3
    )
    glow.addColorStop(0, `hsla(${rng() * 60 + 280}, 100%, 50%, 0.2)`)
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, size, size)
  }
}

function drawIndie(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${rng() * 30 + 25}, 40%, 70%)`)
  grad.addColorStop(1, `hsl(${rng() * 30 + 35}, 30%, 60%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Vignette
  const vignette = ctx.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size * 0.8)
  vignette.addColorStop(0, 'transparent')
  vignette.addColorStop(1, 'rgba(60, 40, 20, 0.4)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)
}

function drawRock(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  ctx.fillStyle = '#1a0a0a'
  ctx.fillRect(0, 0, size, size)

  // Scratches
  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    ctx.moveTo(rng() * size, rng() * size)
    ctx.lineTo(rng() * size, rng() * size)
    ctx.strokeStyle = `rgba(200, 50, 50, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = rng() * 3 + 0.5
    ctx.stroke()
  }

  // Texture
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255, ${rng() * 100}, ${rng() * 50}, ${rng() * 0.05})`
    ctx.fillRect(rng() * size, rng() * size, 2, 2)
  }
}

function drawFuturistic(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  ctx.fillStyle = '#0a0f1a'
  ctx.fillRect(0, 0, size, size)

  // Geometric patterns
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    const x = rng() * size
    const y = rng() * size
    const r = rng() * 100 + 20
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.strokeStyle = `hsla(${rng() * 60 + 180}, 80%, 60%, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Lines
  for (let i = 0; i < 15; i++) {
    ctx.beginPath()
    ctx.moveTo(rng() * size, 0)
    ctx.lineTo(rng() * size, size)
    ctx.strokeStyle = `hsla(${rng() * 60 + 180}, 70%, 50%, ${rng() * 0.15 + 0.05})`
    ctx.lineWidth = rng() * 2 + 0.5
    ctx.stroke()
  }
}

function drawEthnic(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
  ctx.fillStyle = '#1a1008'
  ctx.fillRect(0, 0, size, size)

  // Ornamental circles
  for (let i = 0; i < 5; i++) {
    const cx = rng() * size
    const cy = rng() * size
    for (let r = 20; r < 150; r += 20) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${rng() * 40 + 25}, 60%, 40%, ${rng() * 0.2 + 0.1})`
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

function drawMixed(ctx: CanvasRenderingContext2D, size: number, rng: () => number) {
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

  // Calculate positions
  let baseX = size / 2
  let baseY = size / 2

  switch (textPosition) {
    case 'top':
      baseY = size * 0.2
      break
    case 'center':
      baseY = size * 0.5
      break
    case 'bottom':
      baseY = size * 0.8
      break
    case 'free':
      baseX = size / 2 + state.artistOffsetX
      baseY = size * 0.5 + state.artistOffsetY
      break
  }

  const scaledFontSize = Math.max(20, Math.min(fontSize, size / 8))

  // Artist
  if (showArtist && artist) {
    ctx.font = `600 ${scaledFontSize * 0.5}px Inter, sans-serif`
    ctx.fillStyle = textColor + 'cc'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(artist, baseX, baseY - scaledFontSize * 0.4)
  }

  // Track
  if (showTrack && track) {
    ctx.font = `900 ${scaledFontSize}px Inter, sans-serif`
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(track, baseX, baseY + scaledFontSize * 0.3)
  }
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
