import { streamText, createUIMessageStreamResponse, toUIMessageStream } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { messages: msgs } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        "data: {\"type\":\"error\",\"errorText\":\"API key is not set. Add OPENAI_API_KEY to .env.local\"}\n\ndata: [DONE]\n",
        { headers: { "Content-Type": "text/event-stream" } }
      );
    }

    const modelMessages = (msgs ?? []).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content:
        m.parts?.find((p: any) => p.type === "text")?.text ?? m.content ?? "",
    }));

    const result = streamText({
      model: openai.chat("gpt-4o-mini"),
      instructions:
        "You are a helpful AI assistant. Respond clearly and concisely.",
      messages: modelMessages,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (err: unknown) =>
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
      }),
    });
  } catch (err: any) {
    return new Response(
      `data: {"type":"error","errorText":"${err?.message?.replace(/"/g, "'") || "Something went wrong. Please try again."}"}\n\ndata: [DONE]\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }
}
