import { useCoverStore } from '@/hooks/useCoverStore'
import { getTextPosition } from '@/lib/utils'
import { Move, Type, Minus, Plus } from 'lucide-react'

const positions = [
  'top-left', 'top-center', 'top-right',
  'center-left', 'center', 'center-right',
  'bottom-left', 'bottom-center', 'bottom-right',
] as const

export function TextEditorToolbar() {
  const {
    fontSize,
    textPosition,
    textColor,
    setFontSize,
    setTextPosition,
    setTextColor,
  } = useCoverStore()

  const textColors = ['#ffffff', '#000000', '#f43f5e', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6']

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Move className="w-4 h-4" />
        <span>Позиция текста</span>
      </div>

      {/* Position Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {positions.map((pos) => {
          const posData = getTextPosition(pos)
          const isActive = textPosition === pos
          return (
            <button
              key={pos}
              onClick={() => setTextPosition(pos)}
              className={`p-2 rounded-lg transition-all duration-200 border ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500/50'
                  : 'bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              <div className="w-full h-8 border border-current rounded flex items-center justify-center p-1 relative"
                style={{
                  justifyContent: posData.textAlign === 'left' ? 'flex-start' : posData.textAlign === 'right' ? 'flex-end' : 'center',
                  alignItems: posData.textBaseline === 'top' ? 'flex-start' : posData.textBaseline === 'bottom' ? 'flex-end' : 'center',
                }}
              >
                <div className={`w-3 h-1 rounded ${isActive ? 'bg-indigo-400' : 'bg-gray-500'}`} />
              </div>
            </button>
          )
        })}
      </div>

      {/* Font Size */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Type className="w-3 h-3" />
            <span>Размер шрифта</span>
          </div>
          <span className="text-xs font-mono text-indigo-400">{fontSize}px</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize(Math.max(16, fontSize - 4))}
            className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <input
            type="range"
            min={16}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 accent-indigo-500"
          />
          <button
            onClick={() => setFontSize(Math.min(120, fontSize + 4))}
            className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Text Color */}
      <div>
        <div className="text-xs text-gray-500 mb-2">Цвет текста</div>
        <div className="flex flex-wrap gap-2">
          {textColors.map((color) => (
            <button
              key={color}
              onClick={() => setTextColor(color)}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                textColor === color
                  ? 'border-indigo-500 scale-110'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
