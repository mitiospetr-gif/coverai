import type { Preset } from '@/types'

export const presets: Preset[] = [
  { id: 'youtube', name: 'YouTube', width: 1280, height: 720, platform: 'YouTube', icon: 'play' },
  { id: 'youtube-shorts', name: 'YouTube Shorts', width: 1080, height: 1920, platform: 'YouTube', icon: 'smartphone' },
  { id: 'spotify', name: 'Spotify', width: 640, height: 640, platform: 'Spotify', icon: 'music' },
  { id: 'apple-music', name: 'Apple Music', width: 1200, height: 1200, platform: 'Apple', icon: 'apple' },
  { id: 'soundcloud', name: 'SoundCloud', width: 1240, height: 260, platform: 'SoundCloud', icon: 'cloud' },
  { id: 'bandcamp', name: 'Bandcamp', width: 1400, height: 1400, platform: 'Bandcamp', icon: 'disc' },
  { id: 'tiktok', name: 'TikTok', width: 1080, height: 1920, platform: 'TikTok', icon: 'smartphone' },
  { id: 'instagram', name: 'Instagram', width: 1080, height: 1080, platform: 'Instagram', icon: 'image' },
  { id: 'twitter', name: 'Twitter/X', width: 1500, height: 500, platform: 'Twitter', icon: 'twitter' },
  { id: 'facebook', name: 'Facebook', width: 1200, height: 630, platform: 'Facebook', icon: 'facebook' },
]

export function getPresetById(id: string): Preset | undefined {
  return presets.find((p) => p.id === id)
}
