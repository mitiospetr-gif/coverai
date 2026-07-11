import { create } from 'zustand'
import type { CoverState, CoverStyle, TextPosition, ExportFormat, AiProvider } from '@/types'

interface CoverActions {
  setArtist: (artist: string) => void
  setTrack: (track: string) => void
  setPrompt: (prompt: string) => void
  setReferenceImage: (image: string | null) => void
  setSize: (size: number) => void
  setCustomSize: (size: number | null) => void
  setStyle: (style: CoverStyle) => void
  setFontSize: (size: number) => void
  setTextColor: (color: string) => void
  setTextPosition: (position: TextPosition) => void
  setArtistOffset: (x: number, y: number) => void
  setTrackOffset: (x: number, y: number) => void
  setShowArtist: (show: boolean) => void
  setShowTrack: (show: boolean) => void
  setAiProvider: (provider: AiProvider) => void
  setApiKey: (key: string) => void
  setIsGenerating: (generating: boolean) => void
  setGeneratedImages: (images: CoverState['generatedImages']) => void
  addGeneratedImage: (image: CoverState['generatedImages'][0]) => void
  setSelectedVariant: (index: number) => void
  setExportFormat: (format: ExportFormat) => void
  setExportDpi: (dpi: number) => void
  setExportQuality: (quality: number) => void
  reset: () => void
}

const defaultState: CoverState = {
  artist: '',
  track: '',
  prompt: '',
  referenceImage: null,
  size: 3000,
  customSize: null,
  style: 'minimal',
  fontSize: 80,
  textColor: '#ffffff',
  textPosition: 'center',
  artistOffsetX: 0,
  artistOffsetY: 0,
  trackOffsetX: 0,
  trackOffsetY: 0,
  showArtist: true,
  showTrack: true,
  aiProvider: 'mock',
  apiKey: '',
  isGenerating: false,
  generatedImages: [],
  selectedVariant: 0,
  exportFormat: 'png',
  exportDpi: 300,
  exportQuality: 95,
}

export const useCoverStore = create<CoverState & CoverActions>((set) => ({
  ...defaultState,

  setArtist: (artist) => set({ artist }),
  setTrack: (track) => set({ track }),
  setPrompt: (prompt) => set({ prompt }),
  setReferenceImage: (referenceImage) => set({ referenceImage }),
  setSize: (size) => set({ size }),
  setCustomSize: (customSize) => set({ customSize }),
  setStyle: (style) => set({ style }),
  setFontSize: (fontSize) => set({ fontSize }),
  setTextColor: (textColor) => set({ textColor }),
  setTextPosition: (textPosition) => set({ textPosition }),
  setArtistOffset: (x, y) => set({ artistOffsetX: x, artistOffsetY: y }),
  setTrackOffset: (x, y) => set({ trackOffsetX: x, trackOffsetY: y }),
  setShowArtist: (showArtist) => set({ showArtist }),
  setShowTrack: (showTrack) => set({ showTrack }),
  setAiProvider: (aiProvider) => set({ aiProvider }),
  setApiKey: (apiKey) => set({ apiKey }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGeneratedImages: (generatedImages) => set({ generatedImages }),
  addGeneratedImage: (image) => set((state) => ({
    generatedImages: [...state.generatedImages, image],
  })),
  setSelectedVariant: (selectedVariant) => set({ selectedVariant }),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setExportDpi: (exportDpi) => set({ exportDpi }),
  setExportQuality: (exportQuality) => set({ exportQuality }),
  reset: () => set({ ...defaultState }),
}))
