import { downloadBlob } from './utils'
import type { CoverState } from '@/types'

export function generateCoverCanvas(state: CoverState): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = state.width
  canvas.height = state.height
  const ctx = canvas.getContext('2d')!

  // Background
  drawBackground(ctx, state)

  // Overlay for readability
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Text
  drawText(ctx, state)

  // Decorative elements
  drawDecorations(ctx, state)

  return canvas
}

function drawBackground(ctx: CanvasRenderingContext2D, state: CoverState) {
  const { width, height, style, color } = state

  if (state.backgroundImage) {
    // Would draw image here
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, width, height)
    return
  }

  const colorMap: Record<string, string> = {
    indigo: '#6366f1', rose: '#f43f5e', emerald: '#10b981', amber: '#f59e0b',
    cyan: '#06b6d4', violet: '#8b5cf6', orange: '#f97316', teal: '#14b8a6',
    pink: '#ec4899', sky: '#0ea5e9', lime: '#84cc16', red: '#ef4444',
    slate: '#64748b', yellow: '#eab308', purple: '#9333ea', green: '#22c55e',
  }

  const baseColor = colorMap[color] || '#6366f1'

  switch (style) {
    case 'gradient': {
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, baseColor)
      grad.addColorStop(0.5, adjustColor(baseColor, 30))
      grad.addColorStop(1, adjustColor(baseColor, -20))
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
      break
    }
    case 'neon': {
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)
      // Neon glow
      const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6)
      glow.addColorStop(0, baseColor + '40')
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)
      break
    }
    case 'minimal': {
      ctx.fillStyle = '#0f0f0f'
      ctx.fillRect(0, 0, width, height)
      // Subtle accent line
      ctx.strokeStyle = baseColor + '60'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.9)
      ctx.lineTo(width * 0.9, height * 0.9)
      ctx.stroke()
      break
    }
    case 'glitch': {
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)
      // Glitch lines
      for (let i = 0; i < 20; i++) {
        const y = Math.random() * height
        const h = Math.random() * 4 + 1
        ctx.fillStyle = baseColor + Math.floor(Math.random() * 80 + 20).toString(16)
        ctx.fillRect(0, y, width, h)
      }
      break
    }
    case 'vintage': {
      const vintage = ctx.createLinearGradient(0, 0, width, height)
      vintage.addColorStop(0, '#3e2723')
      vintage.addColorStop(0.5, '#5d4037')
      vintage.addColorStop(1, '#795548')
      ctx.fillStyle = vintage
      ctx.fillRect(0, 0, width, height)
      // Grain overlay
      ctx.fillStyle = 'rgba(255, 200, 150, 0.05)'
      for (let i = 0; i < 1000; i++) {
        ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2)
      }
      break
    }
    case 'cyber': {
      const cyber = ctx.createLinearGradient(0, 0, width, height)
      cyber.addColorStop(0, '#0d1b2a')
      cyber.addColorStop(0.5, '#1b263b')
      cyber.addColorStop(1, '#415a77')
      ctx.fillStyle = cyber
      ctx.fillRect(0, 0, width, height)
      // Grid lines
      ctx.strokeStyle = baseColor + '30'
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      break
    }
    case 'nature': {
      const nature = ctx.createLinearGradient(0, 0, width, height)
      nature.addColorStop(0, '#1b4332')
      nature.addColorStop(0.5, '#2d6a4f')
      nature.addColorStop(1, '#40916c')
      ctx.fillStyle = nature
      ctx.fillRect(0, 0, width, height)
      break
    }
    case 'sunset': {
      const sunset = ctx.createLinearGradient(0, 0, width, height)
      sunset.addColorStop(0, '#ff6b6b')
      sunset.addColorStop(0.5, '#feca57')
      sunset.addColorStop(1, '#ff9ff3')
      ctx.fillStyle = sunset
      ctx.fillRect(0, 0, width, height)
      break
    }
    case 'ocean': {
      const ocean = ctx.createLinearGradient(0, 0, width, height)
      ocean.addColorStop(0, '#006ba6')
      ocean.addColorStop(0.5, '#0496ff')
      ocean.addColorStop(1, '#00b4d8')
      ctx.fillStyle = ocean
      ctx.fillRect(0, 0, width, height)
      // Wave lines
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        const y = height * 0.6 + i * 30
        for (let x = 0; x < width; x += 10) {
          ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * 10)
        }
        ctx.stroke()
      }
      break
    }
    default: {
      ctx.fillStyle = baseColor
      ctx.fillRect(0, 0, width, height)
    }
  }
}

function drawText(ctx: CanvasRenderingContext2D, state: CoverState) {
  const { width, height, artist, track, fontSize, textPosition, textColor } = state

  if (!artist && !track) return

  const pos = getCanvasPosition(width, height, textPosition)
  const baseFontSize = Math.max(16, Math.min(fontSize, width / 10))

  ctx.textAlign = pos.textAlign
  ctx.textBaseline = pos.textBaseline

  // Artist name
  if (artist) {
    ctx.font = `bold ${baseFontSize * 0.6}px Inter, sans-serif`
    ctx.fillStyle = textColor + 'cc'
    ctx.fillText(artist, pos.x, pos.y - baseFontSize * 0.5)
  }

  // Track name
  if (track) {
    ctx.font = `800 ${baseFontSize}px Inter, sans-serif`
    ctx.fillStyle = textColor
    ctx.fillText(track, pos.x, pos.y + baseFontSize * 0.3)
  }
}

function drawDecorations(ctx: CanvasRenderingContext2D, state: CoverState) {
  const { width, height, style } = state

  if (style === 'cyber') {
    // Corner brackets
    ctx.strokeStyle = '#00ffff40'
    ctx.lineWidth = 2
    const margin = 20
    const size = 30
    // Top-left
    ctx.beginPath()
    ctx.moveTo(margin + size, margin)
    ctx.lineTo(margin, margin)
    ctx.lineTo(margin, margin + size)
    ctx.stroke()
    // Top-right
    ctx.beginPath()
    ctx.moveTo(width - margin - size, margin)
    ctx.lineTo(width - margin, margin)
    ctx.lineTo(width - margin, margin + size)
    ctx.stroke()
    // Bottom-left
    ctx.beginPath()
    ctx.moveTo(margin + size, height - margin)
    ctx.lineTo(margin, height - margin)
    ctx.lineTo(margin, height - margin - size)
    ctx.stroke()
    // Bottom-right
    ctx.beginPath()
    ctx.moveTo(width - margin - size, height - margin)
    ctx.lineTo(width - margin, height - margin)
    ctx.lineTo(width - margin, height - margin - size)
    ctx.stroke()
  }
}

function getCanvasPosition(
  width: number,
  height: number,
  position: string
): { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline } {
  const positions: Record<string, { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline }> = {
    'top-left': { x: width * 0.05, y: height * 0.15, textAlign: 'left', textBaseline: 'top' },
    'top-center': { x: width * 0.5, y: height * 0.15, textAlign: 'center', textBaseline: 'top' },
    'top-right': { x: width * 0.95, y: height * 0.15, textAlign: 'right', textBaseline: 'top' },
    'center-left': { x: width * 0.05, y: height * 0.5, textAlign: 'left', textBaseline: 'middle' },
    'center': { x: width * 0.5, y: height * 0.5, textAlign: 'center', textBaseline: 'middle' },
    'center-right': { x: width * 0.95, y: height * 0.5, textAlign: 'right', textBaseline: 'middle' },
    'bottom-left': { x: width * 0.05, y: height * 0.85, textAlign: 'left', textBaseline: 'bottom' },
    'bottom-center': { x: width * 0.5, y: height * 0.85, textAlign: 'center', textBaseline: 'bottom' },
    'bottom-right': { x: width * 0.95, y: height * 0.85, textAlign: 'right', textBaseline: 'bottom' },
  }
  return positions[position] || positions['center']
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount))
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}

export function exportCover(state: CoverState): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = generateCoverCanvas(state)
      const mimeType = state.exportFormat === 'jpg' ? 'image/jpeg' : 'image/png'
      const quality = state.exportFormat === 'jpg' ? state.exportQuality / 100 : undefined

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to generate image'))
            return
          }
          const filename = `${state.artist || 'cover'}_${state.track || 'untitled'}_${state.width}x${state.height}.${state.exportFormat}`
          downloadBlob(blob, filename)
          resolve()
        },
        mimeType,
        quality
      )
    } catch (error) {
      reject(error)
    }
  })
}
