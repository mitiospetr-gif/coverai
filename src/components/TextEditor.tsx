import { useCoverStore } from '@/hooks/useCoverStore'
import { Type, Move, Eye, EyeOff, Minus, Plus } from 'lucide-react'

const textColors = [
  '#ffffff', '#000000', '#f43f5e', '#10b981', '#f59e0b',
  '#06b6d4', '#8b5cf6', '#f97316', '#ec4899', '#0ea5e9',
]

export function TextEditor() {
  const {
    fontSize, textColor, textPosition,
    showArtist, showTrack,
    setFontSize, setTextColor, setTextPosition,
    setShowArtist, setShowTrack,
  } = useCoverStore()

  const positions = [
    { id: 'top' as const, label: 'Верх' },
    { id: 'center' as const, label: 'Центр' },
    { id: 'bottom' as const, label: 'Низ' },
    { id: 'free' as const, label: 'Свободно' },
  ]

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Type className="w-4 h-4" />
        <span>Редактор текста</span>
      </div>

      {/* Visibility toggles */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowArtist(!showArtist)}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
            showArtist
              ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
              : 'bg-gray-800/50 text-gray-500 border-gray-700/30'
          }`}
        >
          {showArtist ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
          Исполнитель
        </button>
        <button
          onClick={() => setShowTrack(!showTrack)}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
            showTrack
              ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
              : 'bg-gray-800/50 text-gray-500 border-gray-700/30'
          }`}
        >
          {showTrack ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
          Трек
        </button>
      </div>

      {/* Position */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block flex items-center gap-1.5">
          <Move className="w-3 h-3" />
          Расположение
        </label>
        <div className="flex gap-2">
          {positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => setTextPosition(pos.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
                textPosition === pos.id
                  ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-500">Размер шрифта</label>
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
            max={200}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 accent-indigo-500"
          />
          <button
            onClick={() => setFontSize(Math.min(200, fontSize + 4))}
            className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block">Цвет текста</label>
        <div className="flex flex-wrap gap-2">
          {textColors.map((color) => (
            <button
              key={color}
              onClick={() => setTextColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
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
