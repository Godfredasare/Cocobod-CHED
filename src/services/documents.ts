
import pool from '@/lib/db';
import { isConfigured as isTavilyConfigured, searchInternet } from './tavily';

interface StoredDocument {
  id: number;
  title: string;
  file_type: string;
  content: string;
}

// In-memory cache (clears every 60s)
let docCache: StoredDocument[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 60_000;

async function loadAllDocuments(): Promise<StoredDocument[]> {
  if (docCache && Date.now() - cacheTime < CACHE_TTL) {
    return docCache;
  }

  const [rows] = await pool.query(
    "SELECT id, title, file_type, content FROM documents WHERE status = 'ready' AND content IS NOT NULL AND content != ''"
  );
  const docs = rows as { id: number; title: string; file_type: string; content: string }[];

  docCache = docs;
  cacheTime = Date.now();
  return docs;
}

export function buildDocumentContext(docs: StoredDocument[], maxChars = 100_000): string {
  if (docs.length === 0) return '';

  let context = '';
  let used = 0;

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const header = `\n--- DOCUMENT ${i + 1}: ${doc.title} (${doc.file_type}) ---\n`;
    const footer = '\n';
    const remaining = maxChars - used - header.length - footer.length;

    if (remaining <= 200) {
      context += `\n\n[${docs.length - i} more documents omitted — context full]`;
      break;
    }

    if (doc.content.length <= remaining) {
      context += header + doc.content + footer;
      used += header.length + doc.content.length + footer.length;
    } else {
      const cutoff = remaining - 40;
      context += header + doc.content.substring(0, cutoff) + '... [document truncated]';
      if (i < docs.length - 1) {
        context += `\n[${docs.length - i - 1} remaining documents omitted]`;
      }
      break;
    }
  }

  return context.trim();
}

async function buildInternetContext(query: string): Promise<string> {
  try {
    const results = await searchInternet(query, 3);
    if (results.length > 0) {
      let ctx = '';
      for (const r of results) {
        ctx += `Source: ${r.title} (${r.url})\n${r.content}\n\n`;
      }
      return ctx.trim();
    }
  } catch (error) {
    console.error('[documents] Internet search failed:', error);
  }
  return '';
}

export async function getDocumentContext(maxChars = 100_000): Promise<string> {
  try {
    const docs = await loadAllDocuments();
    return buildDocumentContext(docs, maxChars);
  } catch (error) {
    console.error('[documents] Failed to load:', error);
    return '';
  }
}

export async function searchOrLoadContext(
  query: string,
  internetFallbackEnabled: boolean,
  maxChars = 100_000
): Promise<{ context: string; internetContext: string; usedInternet: boolean }> {
  // Load documents
  const docContext = await getDocumentContext(maxChars);

  // Also search internet alongside documents (when Tavily is configured)
  let internetContext = '';
  if (internetFallbackEnabled && isTavilyConfigured()) {
    console.log('[documents] Fetching internet results alongside documents');
    internetContext = await buildInternetContext(query);
  }

  const usedInternet = !docContext && !!internetContext;

  return { context: docContext, internetContext, usedInternet };
}

export function clearDocumentCache(): void {
  docCache = null;
  cacheTime = 0;
}
