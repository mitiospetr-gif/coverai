export type CoverStyle = 
  | 'minimal'
  | 'pop'
  | 'dark'
  | 'electronic'
  | 'indie'
  | 'rock'
  | 'futuristic'
  | 'ethnic'
  | 'mixed'

export type ExportFormat = 'png' | 'jpg'
export type TextPosition = 'top' | 'center' | 'bottom' | 'free'
export type AiProvider = 'mock' | 'puter' | 'replicate' | 'fal'

export interface CoverState {
  artist: string
  track: string
  prompt: string
  referenceImage: string | null
  size: number
  customSize: number | null
  style: CoverStyle
  fontSize: number
  textColor: string
  textPosition: TextPosition
  artistOffsetX: number
  artistOffsetY: number
  trackOffsetX: number
  trackOffsetY: number
  showArtist: boolean
  showTrack: boolean
  aiProvider: AiProvider
  apiKey: string
  isGenerating: boolean
  generatedImages: GeneratedImage[]
  selectedVariant: number
  exportFormat: ExportFormat
  exportDpi: number
  exportQuality: number
}

export interface GeneratedImage {
  id: string
  url: string
  seed: number
  style: CoverStyle
  createdAt: number
}

export interface StyleOption {
  id: CoverStyle
  name: string
  description: string
  preview: string
  promptModifier: string
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface SizePreset {
  value: number
  label: string
  platform: string
}
