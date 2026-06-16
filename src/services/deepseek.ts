
import OpenAI from 'openai';
import { getConfig } from './config';
import type { ChatMessage } from './types';

//DeepSeek Client (Chat Only)
function createDeepSeekClient(): OpenAI {
  const config = getConfig();
  return new OpenAI({
    apiKey: config.deepseekApiKey,
    baseURL: config.deepseekBaseUrl,
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Chat Completion (Non-Streaming)

export async function generateChatCompletion(
  messages: ChatMessage[],
  opts?: {
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
  }
): Promise<{
  content: string;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };
}> {
  const config = getConfig();
  const client = createDeepSeekClient();

  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.chat.completions.create(
        {
          model: config.deepseekModel,
          messages,
          temperature: opts?.temperature ?? 0.7,
          max_tokens: opts?.maxTokens ?? 1024,
          stream: false,
        },
        { signal: opts?.signal }
      );

      const choice = response.choices[0];
      return {
        content: choice?.message?.content || '',
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
      };
    } catch (error: any) {
      if (attempt < maxRetries && (error.status === 429 || error.status >= 500)) {
        await sleep((attempt + 1) * 1000);
        continue;
      }
      throw error;
    }
  }

  throw new Error('Chat completion failed after all retries');
}

//Chat Completion (Streaming)

export async function streamChatCompletion(
  messages: ChatMessage[],
  opts?: {
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
  }
): Promise<ReadableStream<Uint8Array>> {
  const config = getConfig();
  const client = createDeepSeekClient();

  const stream = await client.chat.completions.create(
    {
      model: config.deepseekModel,
      messages,
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 1024,
      stream: true,
      stream_options: { include_usage: true },
    },
    { signal: opts?.signal }
  );

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const data = JSON.stringify({ type: 'token', content }) + '\n';
            controller.enqueue(new TextEncoder().encode(data));
          }
          if (chunk.usage) {
            const data = JSON.stringify({
              type: 'done',
              usage: {
                promptTokens: chunk.usage.prompt_tokens,
                completionTokens: chunk.usage.completion_tokens,
                totalTokens: chunk.usage.total_tokens,
              },
            }) + '\n';
            controller.enqueue(new TextEncoder().encode(data));
          }
        }
        controller.close();
      } catch (error) {
        console.error('[deepseek] Stream error:', error);
        const data = JSON.stringify({
          type: 'error',
          content: error instanceof Error ? error.message : 'Stream error',
        }) + '\n';
        controller.enqueue(new TextEncoder().encode(data));
        controller.close();
      }
    },
  });
}
