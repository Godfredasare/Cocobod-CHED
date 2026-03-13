import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate URL format
const isValidUrl = (url: string | undefined): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Only create client if we have valid credentials
const hasValidCredentials = isValidUrl(supabaseUrl) && supabaseAnonKey;

if (!hasValidCredentials) {
  console.warn('Missing or invalid Supabase credentials. Some features may not work.');
}

// Create client with fallback to prevent build errors
export const supabase = createClient<Database>(
  hasValidCredentials ? supabaseUrl : 'https://placeholder.supabase.co',
  hasValidCredentials ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Server-side client with service role for admin operations
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient<Database>(
    hasValidCredentials ? supabaseUrl! : 'https://placeholder.supabase.co',
    hasValidCredentials && serviceRoleKey ? serviceRoleKey : 'placeholder-key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};
