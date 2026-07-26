import { streamText, createUIMessageStreamResponse, toUIMessageStream } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages: msgs } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "API key is not set. Add it in .env.local" },
      { status: 500 }
    );
  }

  const modelMessages = (msgs ?? []).map((m: any) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.parts?.find((p: any) => p.type === "text")?.text ?? m.content ?? "",
  }));

  const result = streamText({
    model: openai.chat("gpt-4o-mini"),
    instructions: "You are a helpful AI assistant. Respond clearly and concisely.",
    messages: modelMessages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
