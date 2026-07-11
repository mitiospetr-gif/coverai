export interface CoverState {
  artist: string
  track: string
  width: number
  height: number
  aspectRatio: string
  style: string
  color: string
  fontSize: number
  textPosition: TextPosition
  textColor: string
  backgroundImage: string | null
  isGenerating: boolean
  exportFormat: 'png' | 'jpg'
  exportDpi: number
  exportQuality: number
}

export type TextPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface AspectRatio {
  id: string
  label: string
  ratio: number
  description: string
}

export interface Preset {
  id: string
  name: string
  width: number
  height: number
  platform: string
  icon: string
}

export interface Style {
  id: string
  name: string
  preview: string
  description: string
}

export interface ColorOption {
  id: string
  name: string
  hex: string
  gradient: string
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}
