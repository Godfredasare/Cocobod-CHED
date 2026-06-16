'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamingMsgIdRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Cancel in-flight stream on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const GREETING = 'Hello. I am the Cocoa Krachie, here to help with information about the Cocoa Health and Extension Division of Ghana Cocoa Board. How may I assist you today?';

  // Initialize chat with greeting and check config
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    // Show greeting immediately
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: GREETING,
      timestamp: new Date(),
    }]);

    // Check if AI is configured with a lightweight ping
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'ping',
          history: [],
          conversationId: null
        }),
      });
      const data = await response.json();
      setIsConfigured(response.ok);
      if (response.ok && data.conversationId) {
        setConversationId(data.conversationId);
      }
    } catch {
      setIsConfigured(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    // Cancel any in-flight stream
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSuggestions([]);

    const assistantMsgId = (Date.now() + 1).toString();
    streamingMsgIdRef.current = null;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          conversationId,
          stream: true,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let firstToken = true;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const event = JSON.parse(line.slice(6));

              if (event.type === 'token' && event.content) {
                if (firstToken) {
                  firstToken = false;
                  setIsLoading(false);
                  streamingMsgIdRef.current = assistantMsgId;
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantMsgId,
                      role: 'assistant',
                      content: event.content,
                      timestamp: new Date(),
                    },
                  ]);
                } else {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: m.content + event.content }
                        : m
                    )
                  );
                }
              } else if (event.type === 'done') {
                if (event.conversationId) {
                  setConversationId(event.conversationId);
                }
                // Handle off-topic: done event with content but no tokens
                if (firstToken && event.content) {
                  setIsLoading(false);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantMsgId,
                      role: 'assistant',
                      content: event.content,
                      timestamp: new Date(),
                    },
                  ]);
                }
              } else if (event.type === 'error') {
                if (firstToken) {
                  setIsLoading(false);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantMsgId,
                      role: 'assistant',
                      content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us at info@ched.com.gh',
                      timestamp: new Date(),
                    },
                  ]);
                } else {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId
                        ? { ...m, content: m.content + '\n\n[Response interrupted. Please try again.]' }
                        : m
                    )
                  );
                }
              }
            } catch {
              // Skip malformed SSE data
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us at info@ched.com.gh',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:bg-primary/90 transition-colors group"
            aria-label="Open chat assistant"
          >
            <img src="/images/chatbot-logo.jpeg" alt="Chat" className="w-full h-full object-cover rounded-full" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
            
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with us
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 'calc(100vh - 120px)',
              maxHeight: isMinimized ? 'auto' : '600px',
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-border"
          >
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/images/chatbot-logo.jpeg" alt="Cocoa Krachie" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cocoa Krachie</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isConfigured === false ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
                    <span className="text-xs text-white/80">
                      {isConfigured === false ? 'Offline' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30"
                  style={{ maxHeight: 'calc(100vh - 280px)' }}
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <img src="/images/chatbot-logo.jpeg" alt="Cocoa Krachie" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-primary text-white rounded-tr-sm'
                              : 'bg-white border border-border text-foreground rounded-tl-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img src="/images/chatbot-logo.jpeg" alt="Cocoa Krachie" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
                        <p className="text-xs text-muted-foreground mb-1.5">Cocoa Krachie is thinking...</p>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isMinimized && suggestions.length > 0 && !isLoading && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2 bg-white border-t border-border"
                >
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => sendMessage(suggestion.text)}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {suggestion.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border p-4 bg-white"
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading || isConfigured === false}
                      className="flex-1 px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isLoading || isConfigured === false}
                      className="px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    Powered by KwesiKayAI (follow me on X)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
