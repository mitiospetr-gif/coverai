import { useEffect, useRef, useCallback } from 'react'
import { useCoverStore } from '@/hooks/useCoverStore'
import { generateCoverCanvas } from '@/lib/generation'
import { RefreshCw, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

export function CanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const state = useCoverStore()
  const [zoom, setZoom] = useState(1)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const generated = generateCoverCanvas(state)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = state.width
    canvas.height = state.height
    ctx.drawImage(generated, 0, 0)
  }, [state])

  useEffect(() => {
    draw()
  }, [draw])

  const maxPreviewWidth = 480
  const scale = Math.min(maxPreviewWidth / state.width, maxPreviewWidth / state.height, 1) * zoom

  return (
    <div className="glass-panel p-5 h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          <RefreshCw className="w-4 h-4" />
          <span>Превью</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500">
            {state.width}×{state.height}
          </span>
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 transition-colors"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 transition-colors"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-gray-950/50 rounded-xl border border-gray-800/50 overflow-hidden"
      >
        <div
          style={{
            width: state.width * scale,
            height: state.height * scale,
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ imageRendering: 'auto' }}
          />
        </div>
      </div>
    </div>
  )
}
