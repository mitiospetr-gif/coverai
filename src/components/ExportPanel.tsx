import { useCoverStore } from '@/hooks/useCoverStore'
import { exportCover } from '@/lib/generation'
import { useToast } from '@/hooks/useToast'
import { Download, FileImage, Settings2 } from 'lucide-react'
import { useState } from 'react'

export function ExportPanel() {
  const state = useCoverStore()
  const { addToast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportCover(state)
      addToast('Обложка успешно сохранена!', 'success')
    } catch (error) {
      addToast('Ошибка при экспорте', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Settings2 className="w-4 h-4" />
        <span>Экспорт</span>
      </div>

      {/* Format */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block">Формат</label>
        <div className="flex gap-2">
          {(['png', 'jpg'] as const).map((format) => (
            <button
              key={format}
              onClick={() => state.setExportFormat(format)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                state.exportFormat === format
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/30 hover:bg-gray-700/50'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* DPI */}
      <div>
        <label className="text-xs text-gray-500 mb-2 block">DPI</label>
        <div className="flex gap-2">
          {[72, 150, 300].map((dpi) => (
            <button
              key={dpi}
              onClick={() => state.setExportDpi(dpi)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                state.exportDpi === dpi
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                  : 'bg-gray-800/50 text-gray-500 border border-gray-700/30 hover:bg-gray-700/50'
              }`}
            >
              {dpi}
            </button>
          ))}
        </div>
      </div>

      {/* Quality (JPG only) */}
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

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
        {isExporting ? 'Экспорт...' : 'Скачать обложку'}
      </button>

      {/* Info */}
      <div className="text-[10px] text-gray-600 text-center">
        Размер файла: ~{(state.width * state.height * 4 / 1024 / 1024).toFixed(1)} MB (PNG)
      </div>
    </div>
  )
}
