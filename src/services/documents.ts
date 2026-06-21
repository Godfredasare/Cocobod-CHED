
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

function enrichSearchQuery(query: string): string {
  const lower = query.toLowerCase();
  const contextTerms: string[] = [];
  if (!lower.includes('ghana') && !lower.includes('ghanaian')) contextTerms.push('Ghana');
  if (!lower.includes('cocobod') && !lower.includes('cocoa board')) contextTerms.push('COCOBOD');
  if (!lower.includes('cocoa') && !lower.includes('cacao')) contextTerms.push('cocoa');
  if (contextTerms.length === 0) return query;
  return `${query} ${contextTerms.join(' ')}`.trim();
}

async function buildInternetContext(query: string): Promise<string> {
  try {
    const enrichedQuery = enrichSearchQuery(query);
    console.log(`[documents] Tavily search query: "${enrichedQuery.substring(0, 120)}"`);
    const results = await searchInternet(enrichedQuery, 3);
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
  const shouldFetchInternet = internetFallbackEnabled && isTavilyConfigured();

  if (shouldFetchInternet) {
    console.log('[documents] Fetching documents and internet results in parallel');
  }

  const [docContext, internetContext] = await Promise.all([
    getDocumentContext(maxChars),
    shouldFetchInternet ? buildInternetContext(query) : Promise.resolve(''),
  ]);

  const usedInternet = !docContext && !!internetContext;

  return { context: docContext, internetContext, usedInternet };
}

export function clearDocumentCache(): void {
  docCache = null;
  cacheTime = 0;
}
