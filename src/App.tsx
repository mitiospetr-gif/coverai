import { Header } from '@/components/Header'
import { TextInputs } from '@/components/TextInputs'
import { SizeSelector } from '@/components/SizeSelector'
import { StyleSelector } from '@/components/StyleSelector'
import { TextEditor } from '@/components/TextEditor'
import { GeneratePanel } from '@/components/GeneratePanel'
import { VariantGallery } from '@/components/VariantGallery'
import { PreviewCanvas } from '@/components/PreviewCanvas'
import { ExportPanel } from '@/components/ExportPanel'
import { AiSettings } from '@/components/AiSettings'
import { Toast } from '@/components/Toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <TextInputs />
            <SizeSelector />
            <StyleSelector />
            <AiSettings />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <PreviewCanvas />
            <VariantGallery />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <TextEditor />
            <GeneratePanel />
            <ExportPanel />
          </div>
        </div>
      </div>

      <Toast />
    </div>
  )
}

export default App
