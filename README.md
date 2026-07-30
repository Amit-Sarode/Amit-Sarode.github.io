# Amit Sarode — Portfolio

Personal portfolio and AI automation agency website built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion / Motion, animejs
- **3D:** Three.js / @react-three/fiber
- **Routing:** React Router v7
- **SEO:** react-helmet-async
- **Testing:** Vitest

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run deploy` | Build + deploy to GitHub Pages |

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `VITE_GNEWS_API_KEY` — GNews API key for tech news feed
- `VITE_EMAILJS_SERVICE_ID` — EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` — EmailJS public key
- `VITE_OPENROUTER_PROXY_URL` — Cloudflare Worker URL for AI chat proxy

## Project Structure

```
src/
  App.tsx             Root component with routes
  main.tsx            Entry point
  config.ts           App configuration (phone, email, URLs)
  index.css           Tailwind + theme variables + global styles
  components/
    ui/               Reusable UI components
    layout/           Layout components (Navbar, Footer)
    pages/            Page-level components
    hero/             Hero section components and data
    skills/           3D skill cloud components
    animation/        Canvas-based background effects
  contexts/           React contexts (Theme, Cursor)
  data/               Static data (blog posts, skills)
```

## Cloudflare Worker

The `worker/` directory contains a Cloudflare Worker that proxies OpenRouter API requests for the AI chat assistant. Deploy with:

```bash
cd worker && wrangler deploy
```
