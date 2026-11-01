import { streamText, createUIMessageStreamResponse, toUIMessageStream, type ModelMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { MARKBOT_SYSTEM_PROMPT } from "@/lib/system-prompt";

type IncomingMessage = {
  role?: string;
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
};

// The house key only ever calls a FREE model — that is a hard rule of this
// app, not a setting. A visitor may bring their own OpenRouter key: it is
// sent per request, used for that request only, and never stored or logged.
const FREE_MODEL = "openrouter/free";

export async function POST(req: Request) {
  try {
    const { messages: msgs, apiKey: rawKey } = (await req.json()) as {
      messages?: IncomingMessage[];
      apiKey?: unknown;
    };

    const trimmed = typeof rawKey === "string" ? rawKey.trim() : "";
    const userKey =
      trimmed.length >= 8 && trimmed.length <= 256 ? trimmed : undefined;
    const apiKey = userKey ?? process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        "data: {\"type\":\"error\",\"errorText\":\"Chat is not configured yet. Tap the Key button above and add your own API key to start chatting.\"}\n\ndata: [DONE]\n",
        { headers: { "Content-Type": "text/event-stream" } }
      );
    }

    const provider = createOpenAI({
      baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
      apiKey,
    });

    const modelMessages: ModelMessage[] = (msgs ?? []).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content:
        m.parts?.find((p) => p.type === "text")?.text ?? m.content ?? "",
    }));

    const result = streamText({
      model: provider.chat(FREE_MODEL),
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
