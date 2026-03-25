'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';

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

  // Check if chatbot is configured and get initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: 'Hello',
          history: [],
          conversationId: null
        }),
      });

      const data = await response.json();
      setIsConfigured(response.ok);

      if (response.ok && data.message) {
        setMessages([{
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        }]);
        setConversationId(data.conversationId || null);
        
        // Set suggestions if provided
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } else {
        // Not configured or error
        setMessages([{
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message || 'Chatbot is not configured. Please contact us at info@ched.com.gh',
          timestamp: new Date(),
        }]);
        setIsConfigured(false);
      }
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Unable to connect to the assistant. Please try again later.',
        timestamp: new Date(),
      }]);
      setIsConfigured(false);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          conversationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setConversationId(data.conversationId || conversationId);
        
        // Set suggestions if provided
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us at info@ched.com.gh',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
      {/* Floating Button */}
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
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with us
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
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
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">CHED Assistant</h3>
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

            {/* Messages */}
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
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
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
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm">
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

            {/* Suggestions */}
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

            {/* Input */}
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
                    Powered by Microsoft Copilot Studio
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
