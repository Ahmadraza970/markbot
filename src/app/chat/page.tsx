"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/ChatMessage";

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== "ready") return;
    sendMessage({ text: input });
    setInput("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50 z-10">
        <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Chat
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-zinc-300 mb-2">
                Start a conversation
              </h2>
              <p className="text-zinc-500">
                Ask me anything or tell me what you need help with.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={msg.id ?? i} message={msg} />
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                AI
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl px-4 py-3">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm text-center">
          {error.message ?? "An error occurred"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending
              </span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
