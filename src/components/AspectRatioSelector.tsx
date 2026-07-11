import { useCoverStore } from '@/hooks/useCoverStore'
import { aspectRatios } from '@/lib/ratios'
import { Ratio, Lock } from 'lucide-react'

export function AspectRatioSelector() {
  const { aspectRatio, setAspectRatio, width } = useCoverStore()

  const handleRatioChange = (ratioId: string) => {
    setAspectRatio(ratioId)
    const ratio = aspectRatios.find((r) => r.id === ratioId)
    if (ratio) {
      const newHeight = Math.round(width / ratio.ratio)
      useCoverStore.getState().setHeight(newHeight)
    }
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Ratio className="w-4 h-4" />
        <span>Соотношение сторон</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.id}
            onClick={() => handleRatioChange(ratio.id)}
            className={`p-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
              aspectRatio === ratio.id
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/40 shadow-lg shadow-indigo-600/10'
                : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50 hover:bg-gray-800'
            }`}
          >
            <div className="font-mono text-sm mb-0.5">{ratio.label}</div>
            <div className="text-[10px] opacity-60">{ratio.description}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-800/30 rounded-lg p-2.5">
        <Lock className="w-3 h-3" />
        <span>Пропорции заблокированы</span>
      </div>
    </div>
  )
}
