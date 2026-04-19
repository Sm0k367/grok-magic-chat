import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1',
});

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    const messages = [
      { role: "system", content: "You are Grok Magic, a helpful, witty, and engaging AI companion." }
    ];

    for (const item of history) {
      if (item.user) messages.push({ role: "user", content: item.user });
      if (item.ai) messages.push({ role: "assistant", content: item.ai });
    }
    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: "grok-4",
      messages: messages,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    const newHistory = [...history, { user: message, ai: reply }];

    return Response.json({ reply, history: newHistory });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      reply: "Sorry, there was an error connecting to Grok. Please try again." 
    }, { status: 500 });
  }
}
