import { useCoverStore } from '@/hooks/useCoverStore'
import { styleOptions } from '@/lib/styles'
import { Palette } from 'lucide-react'

export function StyleSelector() {
  const { style: selectedStyle, setStyle } = useCoverStore()

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Palette className="w-4 h-4" />
        <span>Стиль обложки</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {styleOptions.map((style) => (
          <button
            key={style.id}
            onClick={() => setStyle(style.id)}
            className={`style-card p-3 text-center ${selectedStyle === style.id ? 'active' : ''}`}
          >
            <div
              className="w-full h-14 rounded-lg mb-2"
              style={{ background: style.preview }}
            />
            <div className="text-xs font-medium text-gray-300 leading-tight">{style.name}</div>
            <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
