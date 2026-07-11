import { Image, Github } from 'lucide-react'

export function Header() {
  return (
    <header className="glass-panel px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">CoverAI</h1>
            <p className="text-xs text-gray-500">Генератор обложек для музыки</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-600 font-mono">v2.0</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
