-- CHED Admin Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News Table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_id VARCHAR(50) NOT NULL,
  thumbnail TEXT,
  duration VARCHAR(20),
  published_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  src TEXT NOT NULL,
  alt VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admins)
CREATE POLICY "Authenticated users can view news" ON news
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert news" ON news
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update news" ON news
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news" ON news
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view events" ON events
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert events" ON events
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update events" ON events
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events" ON events
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view videos" ON videos
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert videos" ON videos
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos" ON videos
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete videos" ON videos
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view gallery" ON gallery
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert gallery" ON gallery
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery" ON gallery
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery" ON gallery
  FOR DELETE TO authenticated USING (true);

-- Public read access for website frontend
CREATE POLICY "Public can view news" ON news
  FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view events" ON events
  FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view videos" ON videos
  FOR SELECT TO anon USING (true);

CREATE POLICY "Public can view gallery" ON gallery
  FOR SELECT TO anon USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at
  BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
