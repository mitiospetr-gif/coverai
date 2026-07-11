import { useCoverStore } from '@/hooks/useCoverStore'
import { Cpu, Key } from 'lucide-react'

export function AiSettings() {
  const { aiProvider, apiKey, setAiProvider, setApiKey } = useCoverStore()

  const providers = [
    { id: 'mock' as const, name: 'Demo (Mock)', desc: 'Бесплатно, без API ключа' },
    { id: 'puter' as const, name: 'Puter.js', desc: 'Бесплатный фронтенд API' },
    { id: 'replicate' as const, name: 'Replicate', desc: 'Требует API ключ' },
    { id: 'fal' as const, name: 'fal.ai', desc: 'Требует API ключ' },
  ]

  return (
    <div className="glass-panel p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <Cpu className="w-4 h-4" />
        <span>AI Провайдер</span>
      </div>

      <div className="space-y-2">
        {providers.map((p) => (
          <button
            key={p.id}
            onClick={() => setAiProvider(p.id)}
            className={`w-full text-left p-3 rounded-xl transition-all border ${
              aiProvider === p.id
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30'
                : 'bg-gray-800/50 text-gray-400 border-gray-700/30 hover:border-gray-600/50'
            }`}
          >
            <div className="font-medium text-sm">{p.name}</div>
            <div className="text-xs opacity-60 mt-0.5">{p.desc}</div>
          </button>
        ))}
      </div>

      {aiProvider !== 'mock' && (
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block flex items-center gap-1.5">
            <Key className="w-3 h-3" />
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Введите API ключ..."
            className="input-field w-full font-mono text-xs"
          />
        </div>
      )}
    </div>
  )
}
