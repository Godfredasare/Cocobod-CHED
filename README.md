# CHED Ghana Website

The official website for the Cocoa Health and Extension Division (CHED) of Ghana COCOBOD.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **shadcn/ui** - UI components

## Features

- Responsive design for all devices
- AI-powered chatbot assistant
- News and gallery management
- Contact form
- Regional office information
- Department and management profiles

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Copilot Studio API Configuration (Optional)
# If configured, the chatbot will use Copilot Studio for AI responses
# Otherwise, it falls back to the default AI SDK

COPILOT_STUDIO_ENDPOINT=
COPILOT_STUDIO_TOKEN=
```

**Note:** The chatbot works out of the box with the default AI SDK. Only configure Copilot Studio if you want to use Microsoft Copilot Studio.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About pages
│   ├── api/               # API routes
│   │   └── chat/          # Chatbot API
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── management/        # Management page
│   ├── news/              # News pages
│   ├── operations/        # Operations page
│   └── partnership/       # Partnership page
├── components/            # React components
│   ├── ched/              # CHED-specific components
│   └── ui/                # shadcn/ui components
├── data/                  # JSON data files
│   ├── contact.json       # Contact information
│   ├── departments.json   # Department data
│   ├── gallery.json       # Gallery images
│   ├── management.json    # Team members
│   ├── news.json          # News articles
│   ├── operations.json    # Operations data
│   ├── partnership.json   # Partners data
│   └── regions.json       # Regional offices
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## Updating Content

All content is stored in JSON files in the `/src/data/` directory. Simply edit the relevant JSON file to update:

- **News** - Edit `news.json`
- **Gallery** - Edit `gallery.json`
- **Team Members** - Edit `management.json`
- **Partners** - Edit `partnership.json`
- **Operations Data** - Edit `operations.json`
- **Regional Offices** - Edit `regions.json`
- **Departments** - Edit `departments.json`
- **Contact Info** - Edit `contact.json`

## Deployment

The project is configured for deployment on Vercel or any Next.js-compatible hosting platform.

```bash
npm run build
npm start
```

## License

© 2024 CHED Ghana - Cocoa Health and Extension Division
