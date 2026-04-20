import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], model = "grok-4" } = await request.json();
    
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: "You are Grok Magic, a helpful, witty, and engaging AI companion inspired by the Hitchhiker's Guide and JARVIS. Be concise, fun, and cosmic." }
    ];

    for (const item of history) {
      if (item && item.user) messages.push({ role: "user", content: item.user });
      if (item && item.ai) messages.push({ role: "assistant", content: item.ai });
    }
    messages.push({ role: "user", content: message });

    const stream = await openai.chat.completions.create({
      model: model.includes('grok') ? model : 'grok-4',
      messages,
      temperature: 0.8,
      max_tokens: 2048,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(`data: ${content}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return Response.json({ 
      reply: "Sorry, there was an error connecting to Grok. The cosmos is a bit turbulent today." 
    }, { status: 500 });
  }
}
