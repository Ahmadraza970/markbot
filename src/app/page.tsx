import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AI Chat
          </span>
        </Link>
        <Link
          href="/chat"
          className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all"
        >
          Get Started
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-3xl text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            Powered by ahmad.studio
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-zinc-200">Your AI</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
              Chat Assistant
            </span>
          </h1>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Ask questions, get answers, brainstorm ideas, write code, and more.
            A powerful AI companion at your fingertips.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl text-lg font-semibold text-white hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-cyan-500/20"
          >
            Start Chatting
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            { title: "Smart Responses", desc: "Natural conversations powered by GPT-4o" },
            { title: "Code & Markdown", desc: "Syntax-highlighted code and rich formatting" },
            { title: "Always Free", desc: "No sign-up required, start chatting instantly" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center"
            >
              <h3 className="text-sm font-semibold text-zinc-200 mb-1">{feature.title}</h3>
              <p className="text-xs text-zinc-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 text-center py-6 text-sm text-zinc-600 border-t border-zinc-800/50">
        &copy; {new Date().getFullYear()} AI Chat. All rights reserved.
      </footer>
    </main>
  );
}
