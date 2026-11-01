import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MarkBot — AI Chatbot by Ahmad Digital Studio",
  description:
    "MarkBot is a friendly AI chatbot with streaming replies, clean markdown and code — free on the web and as an Android app. Built by Ahmad Raza of Ahmad Digital Studio.",
};

const features = [
  {
    title: "Streaming answers",
    body: "Replies arrive token by token, with clean Markdown and syntax-highlighted code blocks.",
  },
  {
    title: "Free, no sign-up",
    body: "Open it and start asking. No account, no key needed — the built-in chat runs on a free route.",
  },
  {
    title: "Bring your own key",
    body: "Prefer your own OpenRouter key? Add it in the chat — it stays in your browser, never on our server.",
  },
  {
    title: "Private by design",
    body: "Chats are not stored, there are no ads and no trackers — on the web or in the Android app.",
  },
];

export default function LandingPage() {
  return (
    <main
      className="min-h-dvh px-4 py-12"
      style={{ background: "var(--color-chat-bg)", color: "var(--color-chat-text)" }}
    >
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.svg"
          alt="MarkBot icon"
          width={96}
          height={96}
          className="mx-auto rounded-3xl"
          style={{ border: "1px solid var(--color-chat-border)" }}
        />
        <h1 className="mt-5 text-5xl font-bold tracking-tight">MarkBot</h1>
        <p
          className="mx-auto mt-3 max-w-md text-base leading-relaxed"
          style={{ color: "var(--color-chat-muted)" }}
        >
          A friendly AI chatbot that answers anything — built by Ahmad Raza of
          Ahmad Digital Studio.
        </p>

        <div className="mx-auto mt-9 flex max-w-md flex-col gap-3">
          <a
            href="/MarkBot.apk"
            download
            className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-chat-accent)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="M7 11l5 5 5-5" />
              <path d="M4 21h16" />
            </svg>
            Download Android App
          </a>
          <a
            href="/chat"
            className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 text-base font-semibold transition-colors"
            style={{ border: "2px solid var(--color-chat-text)", color: "var(--color-chat-text)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat on Web
          </a>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--color-chat-dim)" }}>
          Free · No sign-up · Android 7.0+ · 41 KB ·{" "}
          <a href="/download" className="underline">
            App details &amp; install help
          </a>
        </p>

        <div className="mt-14 grid gap-3 text-left sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5"
              style={{ background: "var(--color-chat-surface)", border: "1px solid var(--color-chat-border)" }}
            >
              <h2 className="text-base font-semibold">{f.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-chat-muted)" }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xs" style={{ color: "var(--color-chat-dim)" }}>
          Built by Ahmad Raza · Ahmad Digital Studio ·{" "}
          <a href="https://ahmadstudio.onrender.com" className="underline" target="_blank" rel="noreferrer">
            ahmadstudio.onrender.com
          </a>{" "}
          ·{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}
