import { useCoverStore } from '@/hooks/useCoverStore'
import { Music, Type } from 'lucide-react'

export function InputPanel() {
  const { artist, track, setArtist, setTrack } = useCoverStore()

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Type className="w-4 h-4" />
        <span>Текст</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block flex items-center gap-1.5">
            <Music className="w-3 h-3" />
            Исполнитель
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
          <label className="text-xs text-gray-500 mb-1.5 block">Название трека</label>
          <input
            type="text"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            placeholder="Например: Blinding Lights"
            className="input-field w-full"
          />
        </div>
      </div>
    </div>
  )
}
