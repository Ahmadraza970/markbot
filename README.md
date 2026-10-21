<div align="center">

# AI Chat

**A streaming AI chat interface that installs like a native app.**

Next.js · React 19 · TypeScript · Tailwind v4 · AI SDK v7 · OpenRouter

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![AI SDK](https://img.shields.io/badge/AI_SDK-7-111111)
![Status](https://img.shields.io/badge/repo-private-red)

</div>

---

## Overview

AI Chat is a focused, single-purpose chat client. It streams responses token by token, renders them as rich Markdown with syntax-highlighted code, and can be installed to a phone's home screen as a standalone PWA — no app store, no wrapper.

It speaks the OpenAI-compatible protocol, so it runs against **OpenRouter** out of the box and can be pointed at any compatible endpoint by changing one environment variable.

## Features

| | |
|---|---|
| **Real-time streaming** | Responses arrive token by token over Server-Sent Events — no waiting for the full answer |
| **Rich Markdown** | Tables, lists, links and blockquotes via `react-markdown` + `remark-gfm` |
| **Syntax highlighting** | Fenced code blocks are highlighted with `highlight.js` |
| **Installable PWA** | Native install prompt on Chrome/Edge, with guided *Add to Home Screen* instructions on iOS Safari |
| **Mobile-first layout** | Dynamic viewport height (`--vh`) and safe-area insets keep the composer clear of notches and browser chrome |
| **Provider-agnostic** | Any OpenAI-compatible base URL — OpenRouter, OpenAI, a local server |
| **Graceful failures** | Missing API key and upstream errors surface as readable chat messages, never a blank screen |
| **Zero client persistence** | Conversations live in memory only; nothing is written to storage or a database |

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript 5 (strict) |
| AI | Vercel AI SDK v7 (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) |
| Markdown | `react-markdown`, `remark-gfm`, `rehype-highlight` |
| Fonts | Space Grotesk (UI), Orbitron (display) |

## Getting started

**Requirements:** Node.js 20+ and an API key for an OpenAI-compatible provider.

```bash
git clone https://github.com/Ahmadraza970/md-bot.git
cd md-bot
npm install
```

Create `.env.local` in the project root:

```bash
OPENAI_API_KEY=your_key_here
# OPENAI_BASE_URL=https://openrouter.ai/api/v1   # optional
```

Then start the development server:

```bash
npm run dev
```

Open **http://localhost:3000** — the chat lives at `/chat`, and `/` redirects there.

> The dev script runs `next dev --webpack` deliberately. Keep the flag.

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `OPENAI_API_KEY` | **Yes** | — | Bearer token for the provider. Without it the UI reports a clear configuration error instead of failing silently. |
| `OPENAI_BASE_URL` | No | `https://openrouter.ai/api/v1` | Base URL of any OpenAI-compatible API. |

`.env*` files are gitignored. Never commit a key.

## Project structure

```
src/
├── app/
│   ├── api/chat/route.ts    # POST /api/chat — streams the model response
│   ├── chat/page.tsx        # Chat UI: composer, message list, clear/error states
│   ├── layout.tsx           # Metadata, PWA wiring, fonts
│   ├── page.tsx             # Re-exports /chat so the root route is the chat
│   └── globals.css          # Design tokens (@theme) and base styles
└── components/
    ├── ChatMessage.tsx      # Markdown + code-highlighted message bubble
    └── InstallButton.tsx    # beforeinstallprompt handling + iOS fallback

public/
├── manifest.json            # PWA manifest (standalone, portrait)
└── icon.svg                 # Maskable app icon
```

## How a message flows

1. `chat/page.tsx` collects input and calls `sendMessage` from `useChat`.
2. The AI SDK POSTs the message history to `/api/chat`.
3. `route.ts` normalises messages, then calls `streamText` with **`gpt-4o-mini`**.
4. The stream is adapted with `toUIMessageStream` and returned as SSE.
5. `ChatMessage` renders each delta — Markdown for the assistant, plain text for the user.

To change the model or the system instructions, edit `src/app/api/chat/route.ts`:

```ts
model: openai.chat("gpt-4o-mini"),
instructions: "You are a helpful AI assistant. Respond clearly and concisely.",
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with Webpack (port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Deployment

`netlify.toml` is included and configures the build command, the `.next` publish directory, and baseline security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) plus cache policy for the manifest.

Set `OPENAI_API_KEY` in your host's environment settings before the first deploy — build succeeds without it, but chat requests will return the configuration error.

Any Node host works: the only runtime requirement is a long-lived Node server capable of streaming responses. Static hosting alone will not work because `/api/chat` is a server route.

## Notes

- **Client-side state only.** Reloading the page clears the conversation by design; there is no database, auth layer, or history store.
- **Rate limiting is not included.** If the endpoint is public, add a limiter at the edge or proxy before exposing it.
- **The install button appears only when the browser offers installation.** On unsupported browsers the component renders nothing rather than showing a dead control.

---

<div align="center">
<sub>Built with Next.js, the Vercel AI SDK and Tailwind CSS.</sub>
</div>
