"use client";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/ChatMessage";
import { InstallButton } from "@/components/InstallButton";

export default function ChatPage() {
  const { messages, setMessages, sendMessage, status, error, clearError } = useChat();
  const [input, setInput] = useState("");
  const [userKey, setUserKey] = useState("");
  const [keyDraft, setKeyDraft] = useState("");
  const [keyPanelOpen, setKeyPanelOpen] = useState(false);

  useEffect(() => {
    // Load the visitor's own key (browser-only storage) in a frame callback
    // so the first render matches the server output.
    const raf = requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("markbot.apiKey") ?? "";
        if (saved) {
          setUserKey(saved);
          setKeyDraft(saved);
        }
      } catch {
        // storage unavailable (private mode etc.) — the app still works
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const saveKey = () => {
    const k = keyDraft.trim();
    try {
      if (k) window.localStorage.setItem("markbot.apiKey", k);
      else window.localStorage.removeItem("markbot.apiKey");
    } catch {
      // ignore storage failures; the key still applies to this session
    }
    setUserKey(k);
    setKeyPanelOpen(false);
  };

  const removeKey = () => {
    try {
      window.localStorage.removeItem("markbot.apiKey");
    } catch {
      // nothing to remove
    }
    setUserKey("");
    setKeyDraft("");
    setKeyPanelOpen(false);
  };

  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (error) clearError();
    if (status === "error") clearError();
    if (status !== "ready" && status !== "error") return;
    sendMessage({ text: input }, userKey ? { body: { apiKey: userKey } } : undefined);
    setInput("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col" style={{height: "calc(var(--vh, 1vh) * 100)", background: "var(--color-chat-bg)"}}>
      <header className="flex items-center justify-between px-4 py-3 pt-[max(0.75rem_env(safe-area-inset-top))] pb-3" style={{borderBottom: "1px solid var(--color-chat-border)", minHeight: "48px"}}>
        <span className="text-base font-semibold" style={{color: "var(--color-chat-text)"}}>
          MarkBot
        </span>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Clear all messages?")) {
                  setMessages([]);
                }
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
              style={{color: "var(--color-chat-dim)", border: "1px solid var(--color-chat-border)"}}
            >
              Clear Chat
            </button>
          )}
          <button
            onClick={() => setKeyPanelOpen((v) => !v)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
            style={{color: "var(--color-chat-dim)", border: "1px solid var(--color-chat-border)"}}
          >
            {userKey ? "🔑 Key On" : "🔑 Add Key"}
          </button>
          <InstallButton />
        </div>
      </header>

      {keyPanelOpen && (
        <div className="px-4 py-3" style={{borderBottom: "1px solid var(--color-chat-border)", background: "var(--color-chat-surface)"}}>
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            <label className="text-xs font-medium" style={{color: "var(--color-chat-text)"}}>
              Your OpenRouter API key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                placeholder="sk-or-..."
                autoComplete="off"
                className="flex-1 bg-transparent text-sm outline-none rounded-lg px-3 py-2"
                style={{color: "var(--color-chat-text)", border: "1px solid var(--color-chat-border)"}}
              />
              <button
                onClick={saveKey}
                className="px-3 py-2 text-xs font-medium rounded-lg text-white transition-opacity hover:opacity-90"
                style={{background: "var(--color-chat-accent)"}}
              >
                Save
              </button>
              {userKey && (
                <button
                  onClick={removeKey}
                  className="px-3 py-2 text-xs font-medium rounded-lg transition-colors"
                  style={{color: "var(--color-chat-danger)", border: "1px solid var(--color-chat-border)"}}
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs" style={{color: "var(--color-chat-dim)"}}>
              Saved only in this browser — never stored or logged on the server. It is sent with each message only to fetch your reply. Leave empty to use the built-in free chat.
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center" style={{paddingTop: "20vh"}}>
              <h2 className="text-2xl font-semibold mb-2" style={{color: "var(--color-chat-text)"}}>
                Ask anything
              </h2>
              <p className="text-sm" style={{color: "var(--color-chat-dim)"}}>
                MarkBot by Ahmad Raza · Type a message to start a conversation.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={msg.id ?? i} message={msg} />
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{background: "var(--color-chat-accent)"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" opacity="0.4" />
                </svg>
              </div>
              <div className="px-4 py-3 rounded-2xl" style={{background: "var(--color-chat-elevated)"}}>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0ms]" style={{background: "var(--color-chat-dim)"}} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:150ms]" style={{background: "var(--color-chat-dim)"}} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:300ms]" style={{background: "var(--color-chat-dim)"}} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 text-sm text-center flex flex-col items-center gap-2" style={{background: "rgba(239,68,68,0.1)", borderTop: "1px solid rgba(239,68,68,0.2)", color: "var(--color-chat-danger)"}}>
          <span className="text-xs opacity-80">
            {typeof error === "string" ? error : error?.message ?? "Something went wrong"}
          </span>
          <button
            onClick={() => clearError()}
            className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{background: "rgba(239,68,68,0.2)", color: "var(--color-chat-danger)"}}
          >
            Dismiss & Retry
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-4 pt-3" style={{paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))", background: "var(--color-chat-bg)"}}>
        <div className="max-w-3xl mx-auto flex gap-1.5 items-end rounded-2xl px-3 py-3" style={{background: "var(--color-chat-elevated)", border: "1px solid var(--color-chat-border)"}}>
          {messages.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Clear all messages?")) {
                  setMessages([]);
                }
              }}
              className="p-1.5 rounded-lg transition-colors hover:opacity-80 flex-shrink-0"
              style={{color: "var(--color-chat-dim)"}}
              title="Clear chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message MarkBot..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{color: "var(--color-chat-text)"}}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg transition-all disabled:opacity-20 flex-shrink-0"
            style={{background: input.trim() && !isLoading ? "var(--color-chat-accent)" : "transparent"}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !isLoading ? "white" : "var(--color-chat-dim)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
