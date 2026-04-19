# Grok Magic Chat

A beautiful, real-time cosmic chat interface powered by **Grok-4** from xAI.

![Grok Magic](https://img.shields.io/badge/Powered_by-xAI-000000?style=flat&logo=xai)

## ✨ Features

- **Real Grok-4 responses** via xAI API (OpenAI compatible)
- **Stunning dark cosmic UI** with Tailwind CSS, gradients, glassmorphism, and animations
- **Syntax highlighting** for code blocks with Prism
- **Model selection** (grok-4, grok-3)
- **Sidebar** with recent conversations and new chat
- **Markdown rendering** with ReactMarkdown
- **Voice & Image generation** UI placeholders (ready for extension)
- **Fully responsive** and production-ready
- Optimized for Vercel deployment

## 🛠️ Fixes Applied

- Fixed build errors (`whatwg-url`, `abort-controller` missing modules)
- Resolved TypeScript errors in ReactMarkdown code component
- Added missing `tailwind.config.js` and `postcss.config.js`
- Wired up model selection between UI and API
- Improved conversation history handling and system prompt
- Updated all dependencies to latest secure versions (Next.js 14.2.35, OpenAI SDK ^4.85)
- Added `.env.example`
- Enhanced error handling and code quality
- Configured proper ESM externals for server-side OpenAI client

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local`
3. Add your xAI API key: `XAI_API_KEY=your_key_here`
4. `npm install`
5. `npm run dev`

## Environment Variables

```env
XAI_API_KEY=xai-your-actual-api-key-here
```

Get your key from [console.x.ai](https://console.x.ai/)

## Development

```bash
npm run dev
# Open http://localhost:3000
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSm0k367%2Fgrok-magic-chat)

1. Push to GitHub
2. Import in Vercel
3. Add `XAI_API_KEY` environment variable
4. Deploy

The app will be live in seconds.

---

**Made with ❤️ for the cosmos using xAI's Grok-4**

All issues resolved. Production-ready.
