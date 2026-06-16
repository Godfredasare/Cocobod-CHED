
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db';
import type { ChatMessage } from './types';

export async function getOrCreateConversation(
  conversationId?: string | null
): Promise<string> {
  if (conversationId) {
    const [rows] = await pool.query(
      'SELECT id FROM conversations WHERE id = ?',
      [conversationId]
    );
    const results = rows as { id: string }[];
    if (results.length > 0) return results[0].id;
  }

  // Create new
  const id = conversationId || uuidv4();
  await pool.query('INSERT INTO conversations (id) VALUES (?)', [id]);
  return id;
}

export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  tokens = 0,
  latencyMs?: number
): Promise<string> {
  const id = uuidv4();

  await pool.query(
    'INSERT INTO messages (id, conversation_id, role, content, tokens, latency_ms) VALUES (?, ?, ?, ?, ?, ?)',
    [id, conversationId, role, content, tokens, latencyMs ?? null]
  );

  await pool.query(
    'UPDATE conversations SET message_count = message_count + 1, total_tokens = total_tokens + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [tokens, conversationId]
  );

  // Auto-title after first exchange
  const [countRows] = await pool.query(
    'SELECT message_count FROM conversations WHERE id = ?',
    [conversationId]
  );
  const counts = countRows as { message_count: number }[];
  if (counts.length > 0 && counts[0].message_count === 2) {
    const title = content.substring(0, 80).replace(/\n/g, ' ');
    await pool.query(
      'UPDATE conversations SET title = ? WHERE id = ?',
      [title, conversationId]
    );
  }

  return id;
}

export async function getConversationHistory(
  conversationId: string,
  limit = 20
): Promise<ChatMessage[]> {
  const [rows] = await pool.query(
    'SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC LIMIT ?',
    [conversationId, limit]
  );
  const results = rows as { role: 'user' | 'assistant' | 'system'; content: string }[];
  return results.map((r) => ({ role: r.role, content: r.content }));
}

export async function updateConversationTitle(
  conversationId: string,
  title: string
): Promise<void> {
  await pool.query('UPDATE conversations SET title = ? WHERE id = ?', [title, conversationId]);
}
