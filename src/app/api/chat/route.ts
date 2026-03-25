import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], conversationId } = body as { 
      message: string; 
      history: ChatMessage[];
      conversationId?: string;
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if Copilot Studio API is configured
    const copilotStudioEndpoint = process.env.COPILOT_STUDIO_ENDPOINT;
    const copilotStudioToken = process.env.COPILOT_STUDIO_TOKEN;

    if (!copilotStudioEndpoint || !copilotStudioToken) {
      return NextResponse.json(
        { 
          error: 'Chatbot is not configured. Please add COPILOT_STUDIO_ENDPOINT and COPILOT_STUDIO_TOKEN to your environment variables.',
          message: 'I\'m currently offline. Please contact us at info@ched.com.gh or call +233 302 666 946 for assistance.'
        },
        { status: 503 }
      );
    }

    // Use Copilot Studio API
    try {
      // Standard Copilot Studio/Direct Line API format
      const response = await fetch(copilotStudioEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${copilotStudioToken}`,
        },
        body: JSON.stringify({
          type: 'message',
          text: message,
          from: {
            id: conversationId || 'user',
            name: 'User'
          },
          conversation: conversationId ? { id: conversationId } : undefined,
          // Include conversation history for context
          history: history.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Copilot Studio API error:', response.status, errorText);
        throw new Error(`Copilot Studio API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats from Copilot Studio
      let responseMessage = '';
      let newConversationId = conversationId;

      // Standard Copilot Studio response format
      if (data.text) {
        responseMessage = data.text;
      } else if (data.message) {
        responseMessage = data.message;
      } else if (data.response) {
        responseMessage = data.response;
      } else if (data.activities && data.activities.length > 0) {
        // Direct Line format - get the last message from bot
        const botMessages = data.activities
          .filter((a: { from: { role: string }; text?: string }) => 
            a.from?.role === 'bot' || a.from?.role === 'assistant'
          )
          .map((a: { text?: string }) => a.text)
          .filter(Boolean);
        responseMessage = botMessages.join('\n');
        newConversationId = data.conversationId || conversationId;
      } else if (typeof data === 'string') {
        responseMessage = data;
      }

      if (!responseMessage) {
        responseMessage = 'I received your message but couldn\'t generate a response. Please try again.';
      }

      return NextResponse.json({ 
        message: responseMessage,
        conversationId: newConversationId
      });

    } catch (fetchError) {
      console.error('Copilot Studio fetch error:', fetchError);
      throw fetchError;
    }

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process your message',
        message: 'I\'m having trouble connecting right now. Please try again or contact us at info@ched.com.gh'
      },
      { status: 500 }
    );
  }
}
