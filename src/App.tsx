import { Header } from '@/components/Header'
import { InputPanel } from '@/components/InputPanel'
import { AspectRatioSelector } from '@/components/AspectRatioSelector'
import { DimensionInputs } from '@/components/DimensionInputs'
import { StyleGrid } from '@/components/StyleGrid'
import { TextEditorToolbar } from '@/components/TextEditorToolbar'
import { CanvasPreview } from '@/components/CanvasPreview'
import { GalleryPanel } from '@/components/GalleryPanel'
import { ExportPanel } from '@/components/ExportPanel'
import { Toast } from '@/components/Toast'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <InputPanel />
            <AspectRatioSelector />
            <DimensionInputs />
            <StyleGrid />
          </div>

          <div className="lg:col-span-6">
            <CanvasPreview />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <TextEditorToolbar />
            <GalleryPanel />
            <ExportPanel />
          </div>
        </div>
      </div>

      <Toast />
    </div>
  )
}

export default App
