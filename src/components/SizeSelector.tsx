import { useCoverStore } from '@/hooks/useCoverStore'
import { sizePresets, MIN_SIZE, MAX_SIZE, validateSize } from '@/lib/sizes'
import { Maximize, Lock } from 'lucide-react'

export function SizeSelector() {
  const { size, customSize, setSize, setCustomSize } = useCoverStore()

  const currentSize = customSize ?? size

  const handlePresetClick = (presetValue: number) => {
    setSize(presetValue)
    setCustomSize(null)
  }

  const handleCustomChange = (value: string) => {
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      setCustomSize(null)
      return
    }
    setCustomSize(validateSize(num))
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Maximize className="w-4 h-4" />
        <span>Размер обложки</span>
      </div>

      <div className="text-xs text-gray-500 bg-gray-800/30 rounded-lg p-2.5 flex items-center gap-2">
        <Lock className="w-3 h-3" />
        <span>Квадратный формат: {MIN_SIZE}×{MIN_SIZE} — {MAX_SIZE}×{MAX_SIZE} px</span>
      </div>

      {/* Custom input */}
      <div>
        <label className="text-xs text-gray-500 mb-1.5 block">Свой размер (px)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={customSize ?? ''}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder={String(size)}
            className="input-field w-full font-mono"
          />
          <span className="text-sm text-gray-500 font-mono">×</span>
          <input
            type="number"
            disabled
            value={customSize ?? size}
            className="input-field w-full font-mono opacity-50"
          />
        </div>
      </div>

      {/* Presets */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block">Пресеты</label>
        <div className="grid grid-cols-2 gap-2">
          {sizePresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`p-2.5 rounded-xl text-xs transition-all duration-200 border text-left ${
                size === preset.value && !customSize
                  ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/40'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              <div className="font-mono font-medium">{preset.label}</div>
              <div className="text-[10px] opacity-60 mt-0.5">{preset.platform}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-600 font-mono">
        Текущий: {currentSize}×{currentSize} px
      </div>
    </div>
  )
}
