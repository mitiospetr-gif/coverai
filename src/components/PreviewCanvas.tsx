import { useEffect, useRef, useCallback } from 'react'
import { useCoverStore } from '@/hooks/useCoverStore'

export function PreviewCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useCoverStore()

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const displaySize = 600
    canvas.width = displaySize
    canvas.height = displaySize
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, displaySize, displaySize)

    const selectedImage = state.generatedImages[state.selectedVariant]
    if (selectedImage) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.drawImage(img, 0, 0, displaySize, displaySize)
        drawText(ctx, state, displaySize)
      }
      img.onerror = () => {
        drawPlaceholder(ctx, displaySize)
        drawText(ctx, state, displaySize)
      }
      img.src = selectedImage.url
    } else {
      drawPlaceholder(ctx, displaySize)
      drawText(ctx, state, displaySize)
    }
  }, [state])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div className="glass-panel p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Предпросмотр
        </span>
        <span className="text-xs font-mono text-gray-500">
          {state.size}×{state.size} @ {state.exportDpi}DPI
        </span>
      </div>

      <div className="flex justify-center">
        <div className="relative" style={{ width: '100%', maxWidth: 600 }}>
          <canvas
            ref={canvasRef}
            className="w-full rounded-xl border border-gray-800/50"
            style={{ aspectRatio: '1/1' }}
          />
          {state.isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-300">Генерация...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function drawPlaceholder(ctx: CanvasRenderingContext2D, size: number) {
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, '#1a1a2e')
  grad.addColorStop(1, '#16213e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  ctx.lineWidth = 1
  const step = size / 20
  for (let i = 0; i <= 20; i++) {
    ctx.beginPath()
    ctx.moveTo(i * step, 0)
    ctx.lineTo(i * step, size)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i * step)
    ctx.lineTo(size, i * step)
    ctx.stroke()
  }
}

function drawText(ctx: CanvasRenderingContext2D, state: ReturnType<typeof useCoverStore.getState>, size: number) {
  const { artist, track, fontSize, textColor, textPosition, showArtist, showTrack } = state

  if (!showArtist && !showTrack) return
  if (!artist.trim() && !track.trim()) return

  let baseX = size / 2
  let baseY = size / 2

  switch (textPosition) {
    case 'top': baseY = size * 0.18; break
    case 'center': baseY = size * 0.5; break
    case 'bottom': baseY = size * 0.82; break
    case 'free':
      baseX = size / 2 + state.artistOffsetX * (size / 1000)
      baseY = size * 0.5 + state.artistOffsetY * (size / 1000)
      break
  }

  const scaledFontSize = Math.max(12, Math.min(fontSize, size / 6)) * (size / 1000)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.shadowColor = 'rgba(0,0,0,0.6)'
  ctx.shadowBlur = 30
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 8

  if (showArtist && artist) {
    ctx.font = `600 ${scaledFontSize * 0.45}px Inter, sans-serif`
    ctx.fillStyle = textColor + 'dd'
    ctx.fillText(artist, baseX, baseY - scaledFontSize * 0.35)
  }

  if (showTrack && track) {
    ctx.font = `900 ${scaledFontSize}px Inter, sans-serif`
    ctx.fillStyle = textColor
    ctx.fillText(track, baseX, baseY + scaledFontSize * 0.25)
  }

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
}
