import { presets } from '@/lib/presets'
import { useCoverStore } from '@/hooks/useCoverStore'
import { aspectRatios, calculateHeight } from '@/lib/ratios'
import { LayoutGrid, Youtube, Music, Smartphone, Image, Cloud, Disc } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  play: <Youtube className="w-4 h-4" />,
  music: <Music className="w-4 h-4" />,
  apple: <Music className="w-4 h-4" />,
  cloud: <Cloud className="w-4 h-4" />,
  disc: <Disc className="w-4 h-4" />,
  smartphone: <Smartphone className="w-4 h-4" />,
  image: <Image className="w-4 h-4" />,
  twitter: <LayoutGrid className="w-4 h-4" />,
  facebook: <LayoutGrid className="w-4 h-4" />,
}

export function GalleryPanel() {
  const { setDimensions, setAspectRatio } = useCoverStore()

  const handlePresetClick = (preset: typeof presets[0]) => {
    setDimensions(preset.width, preset.height)
    // Find matching aspect ratio
    const ratio = preset.width / preset.height
    const closest = aspectRatios.reduce((prev, curr) =>
      Math.abs(curr.ratio - ratio) < Math.abs(prev.ratio - ratio) ? curr : prev
    )
    setAspectRatio(closest.id)
  }

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <LayoutGrid className="w-4 h-4" />
        <span>Пресеты</span>
      </div>

      <div className="space-y-1.5">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetClick(preset)}
            className="w-full text-left px-3 py-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-700/50 
                       text-sm transition-all duration-200 flex items-center gap-3 group
                       border border-transparent hover:border-gray-700/50"
          >
            <span className="text-gray-500 group-hover:text-indigo-400 transition-colors">
              {iconMap[preset.icon] || <LayoutGrid className="w-4 h-4" />}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-300 truncate">{preset.name}</div>
              <div className="text-[10px] text-gray-500 font-mono">
                {preset.width}×{preset.height}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
