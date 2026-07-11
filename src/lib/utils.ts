import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getTextPosition(position: string): { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline } {
  const positions: Record<string, { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline }> = {
    'top-left': { x: 0.05, y: 0.15, textAlign: 'left', textBaseline: 'top' },
    'top-center': { x: 0.5, y: 0.15, textAlign: 'center', textBaseline: 'top' },
    'top-right': { x: 0.95, y: 0.15, textAlign: 'right', textBaseline: 'top' },
    'center-left': { x: 0.05, y: 0.5, textAlign: 'left', textBaseline: 'middle' },
    'center': { x: 0.5, y: 0.5, textAlign: 'center', textBaseline: 'middle' },
    'center-right': { x: 0.95, y: 0.5, textAlign: 'right', textBaseline: 'middle' },
    'bottom-left': { x: 0.05, y: 0.85, textAlign: 'left', textBaseline: 'bottom' },
    'bottom-center': { x: 0.5, y: 0.85, textAlign: 'center', textBaseline: 'bottom' },
    'bottom-right': { x: 0.95, y: 0.85, textAlign: 'right', textBaseline: 'bottom' },
  }
  return positions[position] || positions['center']
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
