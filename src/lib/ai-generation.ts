import type { CoverState, GeneratedImage, CoverStyle } from '@/types'
import { getStyleById } from './styles'
import { generateId } from './utils'

// ===== POLLINATIONS.AI — бесплатный AI API без ключа =====
// Docs: https://pollinations.ai/
// URL: https://image.pollinations.ai/prompt/{prompt}?width={w}&height={h}&seed={seed}&nologo=true

export async function generateAIImages(
  state: CoverState,
  count: number = 4
): Promise<GeneratedImage[]> {
  const images: GeneratedImage[] = []
  const basePrompt = buildPrompt(state)

  for (let i = 0; i < count; i++) {
    const seed = Math.floor(Math.random() * 1000000)

    // Добавляем вариации к prompt для разнообразия
    const variantPrompt = `${basePrompt}, variation ${i + 1}, unique composition`

    try {
      const imageUrl = await generateWithPollinations(variantPrompt, state.size, seed)

      images.push({
        id: generateId(),
        url: imageUrl,
        seed,
        style: state.style,
        createdAt: Date.now(),
      })
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback: генерируем процедурную обложку
      const proceduralUrl = generateProceduralCover(state, seed)
      images.push({
        id: generateId(),
        url: proceduralUrl,
        seed,
        style: state.style,
        createdAt: Date.now(),
      })
    }
  }

  return images
}

async function generateWithPollinations(prompt: string, size: number, seed: number): Promise<string> {
  const encodedPrompt = encodeURIComponent(prompt)
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${size}&height=${size}&seed=${seed}&nologo=true&private=true&enhance=true`

  // Pollinations возвращает изображение напрямую по URL
  // Мы можем использовать URL как есть (браузер загрузит) или fetch + blob
  return url
}

// ===== ПРОЦЕДУРНЫЙ FALLBACK (если AI не доступен) =====

function generateProceduralCover(state: CoverState, seed: number): string {
  const canvas = document.createElement('canvas')
  const size = Math.min(state.size, 1200) // Ограничиваем для performance
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const rng = seededRandom(seed)
  const promptColors = extractColorsFromPrompt(state.prompt)

  // Рисуем фон по стилю
  drawStyleBackground(ctx, size, state.style, rng, promptColors)

  // Добавляем текст
  drawTextOverlay(ctx, state, size)

  return canvas.toDataURL('image/png')
}

function drawStyleBackground(
  ctx: CanvasRenderingContext2D,
  size: number,
  styleId: CoverStyle,
  rng: () => number,
  promptColors: number[]
) {
  switch (styleId) {
    case 'minimal': drawMinimal(ctx, size, rng, promptColors); break
    case 'pop': drawPop(ctx, size, rng, promptColors); break
    case 'dark': drawDark(ctx, size, rng, promptColors); break
    case 'electronic': drawElectronic(ctx, size, rng, promptColors); break
    case 'indie': drawIndie(ctx, size, rng, promptColors); break
    case 'rock': drawRock(ctx, size, rng, promptColors); break
    case 'futuristic': drawFuturistic(ctx, size, rng, promptColors); break
    case 'ethnic': drawEthnic(ctx, size, rng, promptColors); break
    case 'mixed': drawMixed(ctx, size, rng, promptColors); break
    default: drawMinimal(ctx, size, rng, promptColors)
  }
}

// ===== ФУНКЦИИ РИСОВАНИЯ СТИЛЕЙ =====

function drawMinimal(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  const hue = colors[0] ?? 220
  ctx.fillStyle = `hsl(${hue}, 8%, 95%)`
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 5; i++) {
    const h = colors[i % colors.length] ?? (hue + rng() * 40)
    ctx.fillStyle = `hsla(${h}, 25%, 35%, 0.08)`
    ctx.fillRect(rng() * size * 0.8, rng() * size * 0.8, rng() * size * 0.3 + 80, rng() * size * 0.3 + 80)
  }
}

function drawPop(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  const c1 = colors[0] ?? 330
  const c2 = colors[1] ?? 280
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${c1}, 85%, 55%)`)
  grad.addColorStop(1, `hsl(${c2}, 80%, 50%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 25; i++) {
    ctx.beginPath()
    ctx.arc(rng() * size, rng() * size, rng() * 50 + 15, 0, Math.PI * 2)
    const h = colors[i % colors.length] ?? (rng() * 360)
    ctx.fillStyle = `hsla(${h}, 75%, 65%, ${rng() * 0.25 + 0.15})`
    ctx.fill()
  }
}

function drawDark(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  const baseHue = colors[0] ?? 220
  ctx.fillStyle = '#050508'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 6; i++) {
    const grad = ctx.createRadialGradient(rng() * size, rng() * size, 0, rng() * size, rng() * size, size * 0.6)
    const h = colors[i % colors.length] ?? (baseHue + rng() * 40)
    grad.addColorStop(0, `hsla(${h}, 40%, 25%, 0.25)`)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }
}

function drawElectronic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  ctx.fillStyle = '#050510'
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'
  ctx.lineWidth = 1
  const gridSize = 60
  for (let x = 0; x < size; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke()
  }
  for (let y = 0; y < size; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke()
  }

  for (let i = 0; i < 8; i++) {
    const glow = ctx.createRadialGradient(rng() * size, rng() * size, 0, rng() * size, rng() * size, size * 0.3)
    const h = colors[i % colors.length] ?? (rng() * 60 + 280)
    glow.addColorStop(0, `hsla(${h}, 100%, 50%, 0.2)`)
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, size, size)
  }
}

function drawIndie(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  const baseHue = colors[0] ?? 30
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, `hsl(${baseHue}, 40%, 70%)`)
  grad.addColorStop(1, `hsl(${baseHue + 10}, 30%, 60%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
}

function drawRock(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  ctx.fillStyle = '#1a0a0a'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    ctx.moveTo(rng() * size, rng() * size)
    ctx.lineTo(rng() * size, rng() * size)
    const h = colors[i % colors.length] ?? 0
    ctx.strokeStyle = `hsla(${h}, 70%, 50%, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = rng() * 3 + 0.5
    ctx.stroke()
  }
}

function drawFuturistic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  ctx.fillStyle = '#0a0f1a'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.arc(rng() * size, rng() * size, rng() * 100 + 20, 0, Math.PI * 2)
    const h = colors[i % colors.length] ?? (rng() * 60 + 180)
    ctx.strokeStyle = `hsla(${h}, 80%, 60%, ${rng() * 0.3 + 0.1})`
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

function drawEthnic(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  ctx.fillStyle = '#1a1008'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 5; i++) {
    const cx = rng() * size
    const cy = rng() * size
    for (let r = 20; r < 150; r += 20) {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      const h = colors[i % colors.length] ?? (rng() * 40 + 25)
      ctx.strokeStyle = `hsla(${h}, 60%, 40%, ${rng() * 0.2 + 0.1})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }
  }
}

function drawMixed(ctx: CanvasRenderingContext2D, size: number, rng: () => number, colors: number[]) {
  const style = ['minimal', 'pop', 'dark', 'electronic', 'indie', 'rock', 'futuristic', 'ethnic'][Math.floor(rng() * 8)] as CoverStyle
  switch (style) {
    case 'minimal': drawMinimal(ctx, size, rng, colors); break
    case 'pop': drawPop(ctx, size, rng, colors); break
    case 'dark': drawDark(ctx, size, rng, colors); break
    case 'electronic': drawElectronic(ctx, size, rng, colors); break
    case 'indie': drawIndie(ctx, size, rng, colors); break
    case 'rock': drawRock(ctx, size, rng, colors); break
    case 'futuristic': drawFuturistic(ctx, size, rng, colors); break
    case 'ethnic': drawEthnic(ctx, size, rng, colors); break
  }
}

// ===== ТЕКСТ НА ОБЛОЖКЕ =====

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

  // Глубокая тень для читаемости
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowBlur = 35
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 5

  // Artist: курсив, uppercase, с отступом
  if (showArtist && artist) {
    const artistSize = scaledFontSize * 0.45
    ctx.font = `italic 500 ${artistSize}px Inter, "Helvetica Neue", Arial, sans-serif`
    ctx.fillStyle = textColor + 'cc'
    ctx.fillText(artist.toUpperCase(), baseX, baseY - scaledFontSize * 0.55)
  }

  // Track: жирный, крупный
  if (showTrack && track) {
    ctx.font = `900 ${scaledFontSize}px Inter, "Helvetica Neue", Arial, sans-serif`
    ctx.fillStyle = textColor
    ctx.fillText(track, baseX, baseY + scaledFontSize * 0.15)
  }

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
}

// ===== УТИЛИТЫ =====

function extractColorsFromPrompt(prompt: string): number[] {
  const colors: number[] = []
  const colorKeywords: Record<string, number> = {
    'red': 0, 'красн': 0, 'ruby': 0, 'blood': 0, 'crimson': 0,
    'orange': 30, 'оранж': 30, 'amber': 30, 'peach': 30,
    'yellow': 60, 'желт': 60, 'gold': 60, 'sun': 60, 'lemon': 60,
    'green': 120, 'зелен': 120, 'emerald': 120, 'forest': 120, 'lime': 120,
    'cyan': 180, 'бирюз': 180, 'teal': 180, 'aqua': 180,
    'blue': 220, 'син': 220, 'navy': 220, 'ocean': 220, 'sky': 220, 'azure': 220,
    'purple': 280, 'фиолет': 280, 'violet': 280, 'lavender': 280, 'magenta': 280,
    'pink': 320, 'розов': 320, 'magenta': 320, 'coral': 320,
    'black': 0, 'черн': 0, 'dark': 0, 'shadow': 0, 'night': 0,
    'white': 0, 'бел': 0, 'light': 0, 'snow': 0, 'cloud': 0,
    'brown': 30, 'коричн': 30, 'chocolate': 30, 'wood': 30, 'coffee': 30,
    'gray': 0, 'сер': 0, 'silver': 0, 'metal': 0, 'steel': 0,
  }
  const lower = prompt.toLowerCase()
  for (const [keyword, hue] of Object.entries(colorKeywords)) {
    if (lower.includes(keyword)) colors.push(hue)
  }
  return colors.length > 0 ? colors : [220, 280, 120]
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function buildPrompt(state: CoverState): string {
  const style = getStyleById(state.style)
  const parts: string[] = [
    'album cover art',
    state.prompt,
    style?.promptModifier || '',
    state.artist ? `by ${state.artist}` : '',
    state.track ? `titled "${state.track}"` : '',
    'square format',
    'high quality',
    'professional music artwork',
  ]
  return parts.filter(Boolean).join(', ')
}
