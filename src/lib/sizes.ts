import type { SizePreset } from '@/types'

export const sizePresets: SizePreset[] = [
  { value: 1400, label: '1400×1400', platform: 'Spotify / Apple Music' },
  { value: 1600, label: '1600×1600', platform: 'Bandcamp' },
  { value: 2000, label: '2000×2000', platform: 'SoundCloud' },
  { value: 2400, label: '2400×2400', platform: 'HD Quality' },
  { value: 3000, label: '3000×3000', platform: 'Print Ready' },
  { value: 4000, label: '4000×4000', platform: 'Ultra HD' },
  { value: 5000, label: '5000×5000', platform: 'Master Quality' },
  { value: 6000, label: '6000×6000', platform: 'Maximum' },
]

export const MIN_SIZE = 1400
export const MAX_SIZE = 6000
export const DEFAULT_SIZE = 3000

export function validateSize(size: number): number {
  return Math.max(MIN_SIZE, Math.min(MAX_SIZE, size))
}
