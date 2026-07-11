import { useCoverStore } from '@/hooks/useCoverStore'
import { aspectRatios, calculateHeight, calculateWidth } from '@/lib/ratios'
import { Maximize, Lock } from 'lucide-react'
import { useState } from 'react'

export function DimensionInputs() {
  const { width, height, aspectRatio, setWidth, setHeight } = useCoverStore()
  const [isLocked, setIsLocked] = useState(true)

  const currentRatio = aspectRatios.find((r) => r.id === aspectRatio)

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (isLocked && currentRatio) {
      setHeight(calculateHeight(newWidth, currentRatio.ratio))
    }
  }

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (isLocked && currentRatio) {
      setWidth(calculateWidth(newHeight, currentRatio.ratio))
    }
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Maximize className="w-4 h-4" />
        <span>Размеры</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Ширина (px)</label>
          <input
            type="number"
            min={100}
            max={8000}
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="input-field w-full font-mono"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Высота (px)</label>
          <input
            type="number"
            min={100}
            max={8000}
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="input-field w-full font-mono"
          />
        </div>
      </div>

      <button
        onClick={() => setIsLocked(!isLocked)}
        className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all duration-200 ${
          isLocked
            ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
            : 'bg-gray-800/50 text-gray-500 border border-gray-700/30'
        }`}
      >
        <Lock className={`w-3 h-3 ${isLocked ? '' : 'opacity-50'}`} />
        {isLocked ? 'Пропорции заблокированы' : 'Пропорции разблокированы'}
      </button>
    </div>
  )
}
