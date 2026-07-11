import { useCoverStore } from '@/hooks/useCoverStore'
import { Music, Type, FileText, ImagePlus } from 'lucide-react'
import { useRef } from 'react'

export function TextInputs() {
  const {
    artist, track, prompt, referenceImage,
    setArtist, setTrack, setPrompt, setReferenceImage,
  } = useCoverStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setReferenceImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Type className="w-4 h-4" />
        <span>Информация о треке</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block flex items-center gap-1.5">
            <Music className="w-3 h-3" />
            Artist Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Например: The Weeknd"
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">
            Track Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            placeholder="Например: Blinding Lights"
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block flex items-center gap-1.5">
            <FileText className="w-3 h-3" />
            Prompt / Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите желаемую обложку: настроение, цвета, объекты, атмосфера..."
            rows={3}
            className="input-field w-full resize-none"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block flex items-center gap-1.5">
            <ImagePlus className="w-3 h-3" />
            Reference Image (опционально)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-700/50 hover:border-indigo-500/50
                       text-gray-500 hover:text-indigo-400 transition-all duration-200 text-sm
                       flex items-center justify-center gap-2"
          >
            {referenceImage ? (
              <>
                <img src={referenceImage} alt="Ref" className="w-6 h-6 rounded object-cover" />
                <span>Изображение загружено</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-4 h-4" />
                <span>Загрузить референс</span>
              </>
            )}
          </button>
          {referenceImage && (
            <button
              onClick={() => setReferenceImage(null)}
              className="text-xs text-rose-400 hover:text-rose-300 mt-1.5 transition-colors"
            >
              Удалить референс
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
