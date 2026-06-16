
// Tavily Internet Search


import { getConfig } from './config';
import type { InternetSearchResult } from './types';

export function isConfigured(): boolean {
  return !!getConfig().tavilyApiKey;
}

export async function searchInternet(
  query: string,
  maxResults = 3
): Promise<InternetSearchResult[]> {
  const config = getConfig();
  if (!config.tavilyApiKey) return [];

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: config.tavilyApiKey,
        query: query.trim(),
        search_depth: 'basic',
        max_results: maxResults,
        include_answer: false,
      }),
    });

    if (!response.ok) {
      console.error('[tavily] Search failed:', response.status);
      return [];
    }

    const data = await response.json();
    return (data.results || []).map((r: any) => ({
      title: r.title || '',
      url: r.url || '',
      content: r.content || '',
    }));
  } catch (error) {
    console.error('[tavily] Search error:', error);
    return [];
  }
}
