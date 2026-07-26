"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Message = {
  id?: string;
  role: "user" | "assistant" | "system";
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  const text =
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") ?? message.content ?? "";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
          AI
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-cyan-500/10 border border-cyan-500/20 text-zinc-200"
            : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-200"
        }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
          U
        </div>
      )}
    </div>
  );
}
