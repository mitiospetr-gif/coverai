import { useCoverStore } from '@/hooks/useCoverStore'
import { exportCover } from '@/lib/export'
import { useToast } from '@/hooks/useToast'
import { Download, Settings2, FileImage } from 'lucide-react'

export function ExportPanel() {
  const state = useCoverStore()
  const { addToast } = useToast()

  const handleExport = async () => {
    if (state.generatedImages.length === 0) {
      addToast('Сначала сгенерируйте обложку', 'error')
      return
    }

    try {
      await exportCover(state)
      addToast('Обложка сохранена!', 'success')
    } catch {
      addToast('Ошибка при экспорте', 'error')
    }
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Settings2 className="w-4 h-4" />
        <span>Экспорт</span>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Формат</label>
        <div className="flex gap-2">
          {(['png', 'jpg'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => state.setExportFormat(fmt)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                state.exportFormat === fmt
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              {fmt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">DPI</label>
        <div className="flex gap-2">
          {[72, 150, 300].map((dpi) => (
            <button
              key={dpi}
              onClick={() => state.setExportDpi(dpi)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border ${
                state.exportDpi === dpi
                  ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
                  : 'bg-gray-800/50 text-gray-500 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              {dpi}
            </button>
          ))}
        </div>
      </div>

      {state.exportFormat === 'jpg' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-gray-500">Качество JPG</label>
            <span className="text-xs font-mono text-indigo-400">{state.exportQuality}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={100}
            value={state.exportQuality}
            onChange={(e) => state.setExportQuality(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
      )}

      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <FileImage className="w-3 h-3" />
          <span>RGB, {state.exportDpi} DPI</span>
        </div>
        <div>Размер: ~{((state.size * state.size * 4) / 1024 / 1024).toFixed(1)} MB (PNG)</div>
      </div>

      <button
        onClick={handleExport}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  )
}
