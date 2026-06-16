// News
export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface NewsInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  date: string;
}

// Events
export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image?: string;
}

// Videos
export type VideoPlatform = 'youtube' | 'facebook' | 'tiktok';

export interface Video {
  id: number;
  title: string;
  description: string | null;
  youtube_id: string;
  platform: VideoPlatform;
  thumbnail: string | null;
  duration: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VideoInput {
  title: string;
  description?: string;
  youtube_id: string;
  platform?: VideoPlatform;
  thumbnail?: string;
  duration?: string;
  published_at?: string;
}

// Gallery
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageInput {
  src: string;
  alt: string;
  category: string;
}

// Contact
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Admin
export interface Admin {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

// Documents (Knowledge Base)
export interface Document {
  id: number;
  title: string;
  file_type: string;
  file_path: string;
  file_size: number;
  content: string | null;
  status: 'processing' | 'ready' | 'failed';
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentInput {
  title: string;
}

// Conversations
export interface Conversation {
  id: string;
  title: string;
  message_count: number;
  total_tokens: number;
  sources_used: string | null;
  created_at: string;
  updated_at: string;
}

// Messages
export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens: number;
  sources: string | null;
  confidence: number | null;
  latency_ms: number | null;
  created_at: string;
}

// Settings
export interface Setting {
  setting_key: string;
  setting_value: string;
  updated_at: string;
}
