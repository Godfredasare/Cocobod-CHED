export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          image: string
          category: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          image: string
          category: string
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          image?: string
          category?: string
          date?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          venue: string
          category: string
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          venue: string
          category: string
          image?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          venue?: string
          category?: string
          image?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string
          youtube_id: string
          thumbnail: string
          duration: string
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          youtube_id: string
          thumbnail?: string
          duration: string
          published_at: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          youtube_id?: string
          thumbnail?: string
          duration?: string
          published_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          src: string
          alt: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          src: string
          alt: string
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          src?: string
          alt?: string
          category?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type News = Database['public']['Tables']['news']['Row']
export type NewsInsert = Database['public']['Tables']['news']['Insert']
export type NewsUpdate = Database['public']['Tables']['news']['Update']

export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']

export type Video = Database['public']['Tables']['videos']['Row']
export type VideoInsert = Database['public']['Tables']['videos']['Insert']
export type VideoUpdate = Database['public']['Tables']['videos']['Update']

export type GalleryImage = Database['public']['Tables']['gallery']['Row']
export type GalleryImageInsert = Database['public']['Tables']['gallery']['Insert']
export type GalleryImageUpdate = Database['public']['Tables']['gallery']['Update']
