import { NextRequest, NextResponse } from 'next/server';
import { isAIConfigured } from '@/services/config';
import { checkRateLimit } from '@/services/rateLimiter';

const OFFLINE_MESSAGE =
  "I'm currently offline. Please contact us at info@ched.com.gh or call +233 302 666 946 for assistance.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], conversationId, stream = false } = body as {
      message: string;
      history: { role: 'user' | 'assistant'; content: string }[];
      conversationId?: string | null;
      stream?: boolean;
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Rate limiting (20 requests per minute per IP)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const { allowed } = checkRateLimit(ip, 20, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.', message: 'Rate limit exceeded. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json(
        {
          error: 'AI assistant is not configured.',
          message: OFFLINE_MESSAGE,
        },
        { status: 503 }
      );
    }

    if (stream) {
      const { processChatMessageStream } = await import('@/services/chat');
      const resultStream = await processChatMessageStream({
        message,
        conversationId,
        history: history.map((h) => ({ role: h.role, content: h.content })),
      });

      return new Response(resultStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Non-streaming path (ping, backward compatibility)
    const { processChatMessage } = await import('@/services/chat');
    const result = await processChatMessage({
      message,
      conversationId,
      history: history.map((h) => ({ role: h.role, content: h.content })),
    });

    return NextResponse.json({
      message: result.message,
      conversationId: result.conversationId,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process your message',
        message: OFFLINE_MESSAGE,
      },
      { status: 500 }
    );
  }
}
