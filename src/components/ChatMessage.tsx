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
  const isAssistant = message.role === "assistant";

  const text =
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("") ?? message.content ?? "";

  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "justify-end"}`}>
      {isAssistant && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "var(--color-chat-accent)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12L6 12M18 12L22 12M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" opacity="0.4" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3`}
        style={{
          background: isAssistant ? "var(--color-chat-elevated)" : "var(--color-chat-accent)",
          color: isAssistant ? "var(--color-chat-text)" : "white",
        }}
      >
        {isAssistant ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
      </div>
      {!isAssistant && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium"
          style={{ background: "var(--color-chat-elevated)", color: "var(--color-chat-text)" }}
        >
          U
        </div>
      )}
    </div>
  );
}
