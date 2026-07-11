# CoverAI v2.0

Генератор обложек для музыки с поддержкой 9 соотношений сторон, 10 пресетов, 9 стилей и 16 цветов.

## 🚀 Быстрый старт (локально)

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## 🌐 Деплой на Vercel

### Способ 1: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Задеплойте
vercel

# Для production
vercel --prod
```

### Способ 2: Через GitHub (рекомендуется)

1. Создайте репозиторий на GitHub
2. Загрузите файлы проекта
3. Зайдите на [vercel.com](https://vercel.com)
4. Нажмите **"Add New Project"**
5. Импортируйте репозиторий с GitHub
6. Vercel автоматически определит Vite + React
7. Нажмите **Deploy**

Готово! Ваш сайт будет доступен по адресу `https://your-project.vercel.app`

## 📦 Структура

```
coverai/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── vercel.json          # ← Конфиг для Vercel SPA
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    ├── lib/
    ├── hooks/
    └── components/
```

## ⚡ Функции

- **9 соотношений**: 16:9, 9:16, 21:9, 4:3, 3:4, 1:1, 5:4, 4:5, 2:3
- **10 пресетов**: YouTube, Spotify, TikTok, Instagram и др.
- **9 стилей**: Градиент, Неон, Минимализм, Глитч, Винтаж, Киберпанк, Природа, Закат, Океан
- **16 цветов**: Полная палитра акцентов
- **Экспорт**: PNG/JPG с DPI 72/150/300
