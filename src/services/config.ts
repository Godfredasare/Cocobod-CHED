
export interface AIConfig {
  deepseekApiKey: string;
  deepseekBaseUrl: string;
  deepseekModel: string;
  tavilyApiKey: string;
}

export function getConfig(): AIConfig {
  return {
    deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
    deepseekBaseUrl: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
    deepseekModel: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    tavilyApiKey: process.env.TAVILY_API_KEY || '',
  };
}

export function isAIConfigured(): boolean {
  return !!getConfig().deepseekApiKey;
}

export function isTavilyConfigured(): boolean {
  return !!getConfig().tavilyApiKey;
}
