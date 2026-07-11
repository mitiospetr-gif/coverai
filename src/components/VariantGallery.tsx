import { useCoverStore } from '@/hooks/useCoverStore'
import { Check } from 'lucide-react'

export function VariantGallery() {
  const { generatedImages, selectedVariant, setSelectedVariant } = useCoverStore()

  if (generatedImages.length === 0) return null

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Варианты ({generatedImages.length})
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {generatedImages.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setSelectedVariant(index)}
            className={`variant-card aspect-square ${selectedVariant === index ? 'active' : ''}`}
          >
            <img
              src={img.url}
              alt={`Variant ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {selectedVariant === index && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <span className="text-xs text-white font-medium">#{index + 1}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
