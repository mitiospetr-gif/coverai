import type { Style, ColorOption } from '@/types'

export const styles: Style[] = [
  {
    id: 'gradient',
    name: 'Градиент',
    preview: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
    description: 'Плавный переход цветов',
  },
  {
    id: 'neon',
    name: 'Неон',
    preview: 'radial-gradient(circle at 50% 50%, #1a1a2e, #16213e)',
    description: 'Тёмный фон с неоновым свечением',
  },
  {
    id: 'minimal',
    name: 'Минимализм',
    preview: 'linear-gradient(180deg, #0f0f0f, #1a1a1a)',
    description: 'Чистые линии и простота',
  },
  {
    id: 'glitch',
    name: 'Глитч',
    preview: 'repeating-linear-gradient(90deg, #0f0f0f, #0f0f0f 2px, #1a1a1a 2px, #1a1a1a 4px)',
    description: 'Цифровые артефакты и сбои',
  },
  {
    id: 'vintage',
    name: 'Винтаж',
    preview: 'linear-gradient(135deg, #3e2723, #5d4037, #795548)',
    description: 'Ретро стиль и теплые тона',
  },
  {
    id: 'cyber',
    name: 'Киберпанк',
    preview: 'linear-gradient(135deg, #0d1b2a, #1b263b, #415a77)',
    description: 'Футуристичный технологичный стиль',
  },
  {
    id: 'nature',
    name: 'Природа',
    preview: 'linear-gradient(135deg, #1b4332, #2d6a4f, #40916c)',
    description: 'Зелёные природные оттенки',
  },
  {
    id: 'sunset',
    name: 'Закат',
    preview: 'linear-gradient(135deg, #ff6b6b, #feca57, #ff9ff3)',
    description: 'Тёплые закатные цвета',
  },
  {
    id: 'ocean',
    name: 'Океан',
    preview: 'linear-gradient(135deg, #006ba6, #0496ff, #00b4d8)',
    description: 'Глубокие синие оттенки',
  },
]

export const colors: ColorOption[] = [
  { id: 'indigo', name: 'Индиго', hex: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #a855f7)' },
  { id: 'rose', name: 'Розовый', hex: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)' },
  { id: 'emerald', name: 'Изумруд', hex: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
  { id: 'amber', name: 'Янтарный', hex: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { id: 'cyan', name: 'Бирюзовый', hex: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
  { id: 'violet', name: 'Фиолетовый', hex: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { id: 'orange', name: 'Оранжевый', hex: '#f97316', gradient: 'linear-gradient(135deg, #f97316, #fb923c)' },
  { id: 'teal', name: 'Бирюза', hex: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
  { id: 'pink', name: 'Пурпурный', hex: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
  { id: 'sky', name: 'Небесный', hex: '#0ea5e9', gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
  { id: 'lime', name: 'Лайм', hex: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16, #a3e635)' },
  { id: 'red', name: 'Красный', hex: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  { id: 'slate', name: 'Серый', hex: '#64748b', gradient: 'linear-gradient(135deg, #64748b, #94a3b8)' },
  { id: 'yellow', name: 'Жёлтый', hex: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #facc15)' },
  { id: 'purple', name: 'Пурпур', hex: '#9333ea', gradient: 'linear-gradient(135deg, #9333ea, #c084fc)' },
  { id: 'green', name: 'Зелёный', hex: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
]

export function getStyleById(id: string): Style | undefined {
  return styles.find((s) => s.id === id)
}

export function getColorById(id: string): ColorOption | undefined {
  return colors.find((c) => c.id === id)
}
