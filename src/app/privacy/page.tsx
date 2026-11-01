import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MarkBot",
  description:
    "How MarkBot handles your data: no accounts, no chat storage, no trackers. Your own API key never leaves your browser except to fetch your replies.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "The short version",
    body: [
      "MarkBot has no accounts and no sign-up. We do not store your chats on our server, we do not sell data, and the app and website carry no ads and no analytics trackers. When you close or clear a chat, it is gone from our side — it was never saved in the first place.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "Nothing that identifies you. MarkBot does not ask for your name, email address, phone number, or location, and it does not create a profile of you.",
      "The messages you type are sent to our server only so a reply can be generated, and they are processed in real time. They are not written to a database and are not kept after your reply is delivered.",
    ],
  },
  {
    title: "How your messages are processed",
    body: [
      "To answer you, your message is forwarded over an encrypted (HTTPS) connection to an AI service provider that generates the reply — for example OpenRouter or a free OpenAI-compatible endpoint. Those providers process the message under their own privacy policies.",
      "Because your messages pass through a third-party AI provider, please do not type sensitive personal information into the chat — such as passwords, banking details, government ID numbers, or private information about other people.",
    ],
  },
  {
    title: "Your own API key (optional)",
    body: [
      "If you choose to add your own OpenRouter API key using the \u201CAdd Key\u201D panel, the key is saved only in your own browser's local storage. It is sent with your messages solely so your replies can be fetched, and it is never stored, logged, or shared by our server.",
      "You can remove it at any time with the Remove button in the same panel, or by clearing the site's data in your browser.",
    ],
  },
  {
    title: "Cookies and local storage",
    body: [
      "MarkBot does not use advertising or tracking cookies. The only local storage used is the optional API key described above and the settings the app itself needs to work.",
    ],
  },
  {
    title: "The Android app",
    body: [
      "The MarkBot Android app is a simple full-screen shell around this same website, so this policy applies to it in full. The app asks only for internet permission, contains no trackers, and collects nothing on your device.",
    ],
  },
  {
    title: "Data retention",
    body: [
      "None. Since chats and keys are not stored on our server, there is nothing for us to keep, delete, or hand over later. Your conversation exists only in your browser until you clear it.",
    ],
  },
  {
    title: "Children",
    body: [
      "MarkBot is a general-purpose tool and is not directed at children under 13. If you are under 13, please use it only with a parent or guardian's guidance.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If this policy changes, the updated version will be posted on this page with a new effective date. Continuing to use MarkBot after a change means you accept the updated policy.",
    ],
  },
  {
    title: "Contact",
    body: [
      "MarkBot is built and operated by Ahmad Raza of Ahmad Digital Studio, Bihar, India. For any question about this policy, reach out through the studio website: ahmadstudio.onrender.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main
      className="min-h-dvh px-4 py-10"
      style={{ background: "var(--color-chat-bg)", color: "var(--color-chat-text)" }}
    >
      <div className="mx-auto w-full max-w-2xl">
        <a href="/chat" className="text-sm font-medium" style={{ color: "var(--color-chat-accent)" }}>
          ← Back to MarkBot
        </a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-chat-dim)" }}>
          MarkBot — by Ahmad Raza, Ahmad Digital Studio · Effective 1 November 2026
        </p>

        {sections.map((s) => (
          <section key={s.title} className="mt-8">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-chat-muted)" }}>
                {p}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-12 text-xs" style={{ color: "var(--color-chat-dim)" }}>
          Built by Ahmad Raza · Ahmad Digital Studio ·{" "}
          <a href="https://ahmadstudio.onrender.com" className="underline" target="_blank" rel="noreferrer">
            ahmadstudio.onrender.com
          </a>
        </p>
      </div>
    </main>
  );
}
