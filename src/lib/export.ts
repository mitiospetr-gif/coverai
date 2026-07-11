import type { CoverState } from '@/types'
import { downloadBlob } from './utils'

export async function exportCover(state: CoverState): Promise<void> {
  const canvas = document.createElement('canvas')
  const size = state.size
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const selectedImage = state.generatedImages[state.selectedVariant]
  if (selectedImage) {
    await drawImageToCanvas(ctx, selectedImage.url, size)
  } else {
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, size, size)
  }

  drawTextOverlay(ctx, state, size)

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
  if (!artist.trim() && !track.trim()) return

  let baseX = size / 2
  let baseY = size / 2

  switch (textPosition) {
    case 'top': baseY = size * 0.22; break
    case 'center': baseY = size * 0.5; break
    case 'bottom': baseY = size * 0.78; break
    case 'free':
      baseX = size / 2 + state.artistOffsetX * (size / 1000)
      baseY = size * 0.5 + state.artistOffsetY * (size / 1000)
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
    const artistSize = scaledFontSize * 0.45
    ctx.font = `italic 500 ${artistSize}px Inter, "Helvetica Neue", Arial, sans-serif`
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

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9\u0400-\u04FF\-]/g, '_').substring(0, 30)
}
