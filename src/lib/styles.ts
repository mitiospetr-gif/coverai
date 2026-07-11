import type { StyleOption } from '@/types'

export const styleOptions: StyleOption[] = [
  {
    id: 'minimal',
    name: 'Minimal / Clean',
    description: 'Чистые линии, минимум элементов',
    preview: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
    promptModifier: 'minimalist album cover, clean design, negative space, elegant typography, monochrome or subtle colors',
  },
  {
    id: 'pop',
    name: 'Pop / Commercial',
    description: 'Яркие цвета, привлекающий внимание',
    preview: 'linear-gradient(135deg, #ff6b9d, #c44569)',
    promptModifier: 'pop album cover, vibrant colors, commercial appeal, glossy finish, bold and eye-catching',
  },
  {
    id: 'dark',
    name: 'Dark / Cinematic',
    description: 'Тёмная атмосфера, кинематографичность',
    preview: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    promptModifier: 'dark cinematic album cover, moody lighting, dramatic shadows, film grain, atmospheric and mysterious',
  },
  {
    id: 'electronic',
    name: 'Electronic / Cyberpunk',
    description: 'Неон, технологии, футуризм',
    preview: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    promptModifier: 'electronic cyberpunk album cover, neon lights, futuristic cityscape, digital art, synthwave aesthetic',
  },
  {
    id: 'indie',
    name: 'Indie / Lo-fi',
    description: 'Винтаж, уют, аналоговый звук',
    preview: 'linear-gradient(135deg, #d4a574, #c9b99a)',
    promptModifier: 'indie lo-fi album cover, vintage aesthetic, warm tones, analog feel, cozy and nostalgic',
  },
  {
    id: 'rock',
    name: 'Rock / Alternative',
    description: 'Гранж, энергия, бунт',
    preview: 'linear-gradient(135deg, #8b0000, #1a1a1a)',
    promptModifier: 'rock alternative album cover, gritty texture, bold energy, distressed look, rebellious spirit',
  },
  {
    id: 'futuristic',
    name: 'AI / Futuristic',
    description: 'Футуристичный, технологичный',
    preview: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
    promptModifier: 'futuristic AI album cover, holographic elements, sleek design, high-tech aesthetic, visionary',
  },
  {
    id: 'ethnic',
    name: 'Ethnic / Mystical',
    description: 'Этнические мотивы, мистика',
    preview: 'linear-gradient(135deg, #2c1810, #5d4037)',
    promptModifier: 'ethnic mystical album cover, tribal patterns, spiritual elements, earthy tones, ancient and mysterious',
  },
  {
    id: 'mixed',
    name: 'Mixed',
    description: 'Смешанный стиль AI',
    preview: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
    promptModifier: 'eclectic mixed style album cover, fusion of genres, unique and unexpected combinations, artistic',
  },
]

export function getStyleById(id: string): StyleOption | undefined {
  return styleOptions.find((s) => s.id === id)
}
