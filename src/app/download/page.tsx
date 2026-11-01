import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download MarkBot — Android App",
  description:
    "Download the MarkBot Android app — a friendly AI chatbot built by Ahmad Raza of Ahmad Digital Studio. Free, no sign-up.",
};

export default function DownloadPage() {
  return (
    <main
      className="min-h-dvh flex items-center justify-center px-4 py-10"
      style={{ background: "var(--color-chat-bg)", color: "var(--color-chat-text)" }}
    >
      <div className="w-full max-w-md text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.svg"
          alt="MarkBot icon"
          width={96}
          height={96}
          className="mx-auto rounded-3xl"
          style={{ border: "1px solid var(--color-chat-border)" }}
        />
        <h1 className="mt-5 text-4xl font-bold tracking-tight">MarkBot</h1>
        <p className="mt-2 text-base" style={{ color: "var(--color-chat-muted)" }}>
          A friendly AI chatbot that answers anything — built by Ahmad Raza of
          Ahmad Digital Studio.
        </p>

        <a
          href="/MarkBot.apk"
          download
          className="mt-8 flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
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
          className="mt-3 flex items-center justify-center w-full rounded-2xl px-5 py-4 text-base font-semibold transition-colors"
          style={{ border: "2px solid var(--color-chat-text)", color: "var(--color-chat-text)" }}
        >
          Open MarkBot in Browser
        </a>

        <p className="mt-5 text-sm" style={{ color: "var(--color-chat-dim)" }}>
          Free · No sign-up · Android 7.0+ · 41 KB · Version 1.0.1
        </p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-chat-muted)" }}>
          The app needs an internet connection — MarkBot thinks on the server,
          not on your phone. If Android asks, allow installs from your browser
          to install the APK.
        </p>

        <p className="mt-10 text-xs" style={{ color: "var(--color-chat-dim)" }}>
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
