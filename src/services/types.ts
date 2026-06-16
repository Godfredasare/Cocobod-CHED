

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string | null;
  history: { role: 'user' | 'assistant'; content: string }[];
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  sources?: { id: string; text: string }[];
  suggestions?: { id: string; text: string }[];
}

export interface StreamChunk {
  type: 'token' | 'done' | 'error';
  content?: string;
  conversationId?: string;
  sources?: { id: string; text: string }[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

// --- Chat Pipeline ---

export interface ChatPipelineParams {
  message: string;
  conversationId?: string | null;
  history: ChatMessage[];
  signal?: AbortSignal;
}

export interface ChatPipelineResult {
  message: string;
  conversationId: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs: number;
}

// --- Settings ---

export interface AppSettings {
  systemPrompt: string;
  maxHistoryMessages: number;
  internetFallbackEnabled: boolean;
  temperature: number;
  maxTokens: number;
}

// --- Streaming ---

export interface StreamEvent {
  type: 'token' | 'done' | 'error';
  content?: string;
  conversationId?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs?: number;
  error?: string;
}

// --- Internet Search ---

export interface InternetSearchResult {
  title: string;
  url: string;
  content: string;
}
