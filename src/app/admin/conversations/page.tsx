'use client';

import { Fragment, useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import type { Conversation, Message } from '@/types/database';
import { MessageSquare, Trash2, ChevronDown, ChevronRight, User, Bot } from 'lucide-react';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/conversations')
      .then((r) => r.json())
      .then((d) => setConversations(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setMessages([]);
      return;
    }
    setExpandedId(id);
    setMessagesLoading(true);
    const res = await fetch(`/api/admin/conversations/${id}`);
    const data = await res.json();
    setMessages(data.data || []);
    setMessagesLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/conversations/${deleteId}`, { method: 'DELETE' });
    setConversations(conversations.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
    if (expandedId === deleteId) {
      setExpandedId(null);
      setMessages([]);
    }
  };

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground">Conversations</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Chat history between users and the AI assistant
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Loading...</p>
      ) : conversations.length === 0 ? (
        <div className="bg-card border border-border rounded-md p-12 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No conversations yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8" />
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Messages</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Tokens</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Last Active</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conv) => (
                <Fragment key={conv.id}>
                  <tr className="border-b border-border/50 hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleExpand(conv.id)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded"
                      >
                        {expandedId === conv.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground line-clamp-1">{conv.title}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-muted-foreground">{conv.message_count}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs text-muted-foreground">{conv.total_tokens.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.updated_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDeleteId(conv.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === conv.id && (
                    <tr key={`${conv.id}-messages`}>
                      <td colSpan={6} className="px-4 py-3 bg-muted/20">
                        {messagesLoading ? (
                          <p className="text-sm text-muted-foreground text-center py-4">Loading messages...</p>
                        ) : messages.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">No messages</p>
                        ) : (
                          <div className="space-y-3 max-h-80 overflow-y-auto">
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex gap-2 text-sm ${
                                  msg.role === 'user' ? '' : 'bg-primary/5 rounded-lg p-3'
                                }`}
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  {msg.role === 'user' ? (
                                    <User size={14} className="text-muted-foreground" />
                                  ) : (
                                    <Bot size={14} className="text-primary" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs text-muted-foreground mb-0.5">
                                    {msg.role === 'user' ? 'User' : 'Assistant'}
                                    {msg.confidence != null && (
                                      <span className="ml-2">
                                        confidence: {(msg.confidence * 100).toFixed(0)}%
                                      </span>
                                    )}
                                    {msg.latency_ms != null && (
                                      <span className="ml-2">{msg.latency_ms}ms</span>
                                    )}
                                    {msg.tokens > 0 && (
                                      <span className="ml-2">{msg.tokens} tokens</span>
                                    )}
                                  </p>
                                  <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-md border border-border p-6 max-w-sm w-full"
          >
            <h3 className="font-medium text-foreground mb-2">Delete conversation?</h3>
            <p className="text-sm text-muted-foreground mb-4">All messages will be permanently deleted.</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-primary-foreground bg-destructive rounded-md hover:bg-destructive/90 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
