import { streamText, createUIMessageStreamResponse, toUIMessageStream, type ModelMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { MARKBOT_SYSTEM_PROMPT } from "@/lib/system-prompt";

type IncomingMessage = {
  role?: string;
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
};

// Key precedence: a visitor's own key wins, then the owner's key — both
// talk to OpenRouter and only ever call a FREE model (a hard rule of this
// app, not a setting). With no key at all, the built-in chat falls back to
// a free route that needs no key (Pollinations' OpenAI-compatible
// endpoint), so the demo answers out of the box. Keys are sent per
// request, used for that request only, and never stored or logged.
const FREE_MODEL = "openrouter/free";
const NO_KEY_BASE_URL = "https://text.pollinations.ai/openai";
const NO_KEY_MODEL = "openai";

export async function POST(req: Request) {
  try {
    const { messages: msgs, apiKey: rawKey } = (await req.json()) as {
      messages?: IncomingMessage[];
      apiKey?: unknown;
    };

    const trimmed = typeof rawKey === "string" ? rawKey.trim() : "";
    const userKey =
      trimmed.length >= 8 && trimmed.length <= 256 ? trimmed : undefined;
    const keyed = userKey ?? process.env.OPENAI_API_KEY;

    const provider = keyed
      ? createOpenAI({
          baseURL:
            process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
          apiKey: keyed,
        })
      : createOpenAI({ baseURL: NO_KEY_BASE_URL, apiKey: "pollinations-free" });

    const modelMessages: ModelMessage[] = (msgs ?? []).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content:
        m.parts?.find((p) => p.type === "text")?.text ?? m.content ?? "",
    }));

    const result = streamText({
      model: provider.chat(keyed ? FREE_MODEL : NO_KEY_MODEL),
      instructions: MARKBOT_SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (err: unknown) =>
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }),
    });
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message.replace(/"/g, "'") : "";
    return new Response(
      `data: {"type":"error","errorText":"${detail || "Something went wrong. Please try again."}"}\n\ndata: [DONE]\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }
}
