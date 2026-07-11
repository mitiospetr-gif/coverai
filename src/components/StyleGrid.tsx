import { useCoverStore } from '@/hooks/useCoverStore'
import { styles, colors } from '@/lib/styles'
import { Palette } from 'lucide-react'

export function StyleGrid() {
  const { style: selectedStyle, color: selectedColor, setStyle, setColor } = useCoverStore()

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Palette className="w-4 h-4" />
        <span>Стиль и цвет</span>
      </div>

      {/* Styles */}
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setStyle(style.id)}
            className={`style-card p-3 text-center ${selectedStyle === style.id ? 'active' : ''}`}
          >
            <div
              className="w-full h-12 rounded-lg mb-2"
              style={{ background: style.preview }}
            />
            <div className="text-xs font-medium text-gray-300">{style.name}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{style.description}</div>
          </button>
        ))}
      </div>

      {/* Colors */}
      <div>
        <div className="text-xs text-gray-500 mb-2">Акцентный цвет</div>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setColor(color.id)}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                selectedColor === color.id
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ background: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
