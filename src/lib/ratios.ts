import type { AspectRatio } from '@/types'

export const aspectRatios: AspectRatio[] = [
  { id: '16:9', label: '16:9', ratio: 16 / 9, description: 'YouTube, видео' },
  { id: '9:16', label: '9:16', ratio: 9 / 16, description: 'Stories, Reels, TikTok' },
  { id: '21:9', label: '21:9', ratio: 21 / 9, description: 'Ультраширокий' },
  { id: '4:3', label: '4:3', ratio: 4 / 3, description: 'Классический' },
  { id: '3:4', label: '3:4', ratio: 3 / 4, description: 'Портрет' },
  { id: '1:1', label: '1:1', ratio: 1, description: 'Квадрат' },
  { id: '5:4', label: '5:4', ratio: 5 / 4, description: 'Фото' },
  { id: '4:5', label: '4:5', ratio: 4 / 5, description: 'Instagram' },
  { id: '2:3', label: '2:3', ratio: 2 / 3, description: 'Постер' },
]

export function getAspectRatioById(id: string): AspectRatio | undefined {
  return aspectRatios.find((r) => r.id === id)
}

export function calculateHeight(width: number, ratio: number): number {
  return Math.round(width / ratio)
}

export function calculateWidth(height: number, ratio: number): number {
  return Math.round(height * ratio)
}
