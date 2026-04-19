export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import { Client } from 'xai-sdk';
import { user, system, assistant } from 'xai-sdk/chat';

const client = new Client();

const SYSTEM_PROMPT = "You are Grok Magic, a helpful, witty, and engaging AI companion.";

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();
    
    const messages = [system(SYSTEM_PROMPT)];
    
    for (const item of history) {
      messages.push(user(item.user || ""));
      if (item.ai) messages.push(assistant(item.ai));
    }
    messages.push(user(message));
    
    const response = await client.chat.create({
      model: "grok-4",
      messages: messages
    }).sample();
    
    const reply = response.text || response.message?.content || "Sorry, I couldn't generate a response.";
    
    const newHistory = [...history, { user: message, ai: reply }];
    
    return Response.json({ reply, history: newHistory });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      reply: "Sorry, there was an error connecting to Grok. Please try again." 
    }, { status: 500 });
  }
}
