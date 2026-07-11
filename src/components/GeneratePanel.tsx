import { useCoverStore } from '@/hooks/useCoverStore'
import { useToast } from '@/hooks/useToast'
import { generateMockImages, buildPrompt } from '@/lib/ai-generation'
import { Sparkles, RotateCcw, Loader2 } from 'lucide-react'
import { useState } from 'react'

export function GeneratePanel() {
  const state = useCoverStore()
  const { addToast } = useToast()
  const [variantCount, setVariantCount] = useState(4)

  const handleGenerate = async () => {
    if (!state.artist.trim() || !state.track.trim()) {
      addToast('Заполните Artist Name и Track Title', 'error')
      return
    }

    state.setIsGenerating(true)
    state.setGeneratedImages([])
    state.setSelectedVariant(0)

    try {
      if (state.aiProvider === 'mock') {
        const images = await generateMockImages(state, variantCount)
        state.setGeneratedImages(images)
        addToast(`Сгенерировано ${images.length} вариантов!`, 'success')
      } else {
        addToast('Реальный AI API требует настройки ключа', 'info')
        const images = await generateMockImages(state, variantCount)
        state.setGeneratedImages(images)
      }
    } catch (error) {
      addToast('Ошибка генерации', 'error')
    } finally {
      state.setIsGenerating(false)
    }
  }

  const promptPreview = buildPrompt(state)

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Sparkles className="w-4 h-4" />
        <span>AI Генерация</span>
      </div>

      <div>
        <label className="text-xs text-gray-500 mb-2 block">Количество вариантов</label>
        <div className="flex gap-2">
          {[3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setVariantCount(n)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all border ${
                variantCount === n
                  ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/30">
        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">AI Prompt</div>
        <div className="text-xs text-gray-400 font-mono leading-relaxed line-clamp-3">
          {promptPreview}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={state.isGenerating}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {state.isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Генерация {state.generatedImages.length > 0 ? `${state.generatedImages.length}/${variantCount}` : '...'}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate
          </>
        )}
      </button>

      {state.generatedImages.length > 0 && (
        <button
          onClick={handleGenerate}
          disabled={state.isGenerating}
          className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Regenerate
        </button>
      )}
    </div>
  )
}
