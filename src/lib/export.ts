import type { CoverState } from '@/types'
import { downloadBlob } from './utils'

export async function exportCover(state: CoverState): Promise<void> {
  const canvas = document.createElement('canvas')
  const size = state.size
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Get selected image or generate placeholder
  const selectedImage = state.generatedImages[state.selectedVariant]
  if (selectedImage) {
    await drawImageToCanvas(ctx, selectedImage.url, size)
  } else {
    // Fallback: draw colored background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, size, size)
  }

  // Add text overlay
  drawTextOverlay(ctx, state, size)

  // Export
  const mimeType = state.exportFormat === 'jpg' ? 'image/jpeg' : 'image/png'
  const quality = state.exportFormat === 'jpg' ? state.exportQuality / 100 : undefined

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image'))
          return
        }
        const filename = `${sanitizeFilename(state.artist || 'cover')}_${sanitizeFilename(state.track || 'untitled')}_${size}x${size}_${state.exportDpi}dpi.${state.exportFormat}`
        downloadBlob(blob, filename)
        resolve()
      },
      mimeType,
      quality
    )
  })
}

function drawImageToCanvas(ctx: CanvasRenderingContext2D, url: string, size: number): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      resolve()
    }
    img.onerror = () => {
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, size, size)
      resolve()
    }
    img.src = url
  })
}

function drawTextOverlay(ctx: CanvasRenderingContext2D, state: CoverState, size: number) {
  const { artist, track, fontSize, textColor, textPosition, showArtist, showTrack } = state

  if (!showArtist && !showTrack) return

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

  // Text shadow for readability
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 20
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 4

  if (showArtist && artist) {
    ctx.font = `600 ${scaledFontSize * 0.5}px Inter, sans-serif`
    ctx.fillStyle = textColor + 'dd'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(artist, baseX, baseY - scaledFontSize * 0.4)
  }

  if (showTrack && track) {
    ctx.font = `900 ${scaledFontSize}px Inter, sans-serif`
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(track, baseX, baseY + scaledFontSize * 0.3)
  }

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9\u0400-\u04FF\-]/g, '_').substring(0, 30)
}
