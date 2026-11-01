import { streamText, createUIMessageStreamResponse, toUIMessageStream, type ModelMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { MARKBOT_SYSTEM_PROMPT } from "@/lib/system-prompt";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

type IncomingMessage = {
  role?: string;
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
};

export async function POST(req: Request) {
  try {
    const { messages: msgs } = (await req.json()) as {
      messages?: IncomingMessage[];
    };

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        "data: {\"type\":\"error\",\"errorText\":\"API key is not set. Add OPENAI_API_KEY to .env.local\"}\n\ndata: [DONE]\n",
        { headers: { "Content-Type": "text/event-stream" } }
      );
    }

    const modelMessages: ModelMessage[] = (msgs ?? []).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content:
        m.parts?.find((p) => p.type === "text")?.text ?? m.content ?? "",
    }));

    const result = streamText({
      model: openai.chat("gpt-4o-mini"),
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
