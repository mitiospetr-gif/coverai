import { create } from 'zustand'
import type { CoverState, TextPosition } from '@/types'

interface CoverActions {
  setArtist: (artist: string) => void
  setTrack: (track: string) => void
  setWidth: (width: number) => void
  setHeight: (height: number) => void
  setAspectRatio: (ratio: string) => void
  setStyle: (style: string) => void
  setColor: (color: string) => void
  setFontSize: (size: number) => void
  setTextPosition: (position: TextPosition) => void
  setTextColor: (color: string) => void
  setBackgroundImage: (image: string | null) => void
  setIsGenerating: (generating: boolean) => void
  setExportFormat: (format: 'png' | 'jpg') => void
  setExportDpi: (dpi: number) => void
  setExportQuality: (quality: number) => void
  setDimensions: (width: number, height: number) => void
  reset: () => void
}

const defaultState: CoverState = {
  artist: '',
  track: '',
  width: 1280,
  height: 720,
  aspectRatio: '16:9',
  style: 'gradient',
  color: 'indigo',
  fontSize: 48,
  textPosition: 'center',
  textColor: '#ffffff',
  backgroundImage: null,
  isGenerating: false,
  exportFormat: 'png',
  exportDpi: 72,
  exportQuality: 90,
}

export const useCoverStore = create<CoverState & CoverActions>((set) => ({
  ...defaultState,

  setArtist: (artist) => set({ artist }),
  setTrack: (track) => set({ track }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setStyle: (style) => set({ style }),
  setColor: (color) => set({ color }),
  setFontSize: (fontSize) => set({ fontSize }),
  setTextPosition: (textPosition) => set({ textPosition }),
  setTextColor: (textColor) => set({ textColor }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setExportDpi: (exportDpi) => set({ exportDpi }),
  setExportQuality: (exportQuality) => set({ exportQuality }),
  setDimensions: (width, height) => set({ width, height }),
  reset: () => set({ ...defaultState }),
}))
