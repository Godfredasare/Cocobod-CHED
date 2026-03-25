# CHED Admin Dashboard

Admin dashboard for managing CHED website content (News, Events, Videos, Gallery) using Supabase as the backend.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys from Settings > API

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your values:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (for server-side operations)

### 3. Create Database Tables

1. Go to Supabase Dashboard > SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL to create tables and policies

### 4. Create an Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email (e.g., admin@ched.gov.gh) and password
4. The user will automatically have admin access

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000/admin` to access the dashboard.

## Features

- **News Management**: Create, edit, and delete news articles
- **Events Management**: Manage upcoming and past events
- **Videos Management**: Add YouTube videos to the website
- **Gallery Management**: Upload and manage photo gallery images

## Routes

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview |
| `/admin/login` | Login page |
| `/admin/news` | News list |
| `/admin/news/new` | Create news article |
| `/admin/news/[id]` | Edit news article |
| `/admin/events` | Events list |
| `/admin/events/new` | Create event |
| `/admin/events/[id]` | Edit event |
| `/admin/videos` | Videos list |
| `/admin/videos/new` | Add video |
| `/admin/videos/[id]` | Edit video |
| `/admin/gallery` | Gallery images |
| `/admin/gallery/new` | Add image |
| `/admin/gallery/[id]` | Edit image |

## Security

- Row Level Security (RLS) is enabled on all tables
- Only authenticated users can create, update, and delete content
- Public read access is allowed for the website frontend
