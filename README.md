# YC App

A Next.js application with Sanity CMS integration, NextAuth authentication, and Sentry monitoring for startup pitch management.

## Tech Stack

- **Next.js 15** with Turbopack
- **React 19**
- **TypeScript**
- **Tailwind CSS** with animations
- **Sanity CMS** for content management
- **NextAuth** for GitHub authentication
- **Sentry** for error monitoring
- **Radix UI** components
- **Markdown** support with editor

## Features

- 🚀 **Startup Management** - Create and manage startup pitches
- 👤 **User Authentication** - GitHub OAuth integration
- 📝 **Rich Content Editor** - Markdown support with live preview
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 📊 **Content Management** - Sanity CMS backend
- 🔍 **Search Functionality** - Find startups and users
- 📱 **Mobile Responsive** - Works on all devices

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VitalikStrog/yc-app.git
   cd yc-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy `.env.template` to `.env.local`:
   ```bash
   cp .env.template .env.local
   ```

   Fill in the required variables (details below).

## Service Setup

### GitHub OAuth (NextAuth)

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Create a new OAuth App:
    - **Application name**: YC App
    - **Homepage URL**: `http://localhost:3000` (for development)
    - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy **Client ID** and **Client Secret**
4. Generate `AUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

### Sanity CMS

1. Create an account at [sanity.io](https://www.sanity.io/)
2. Create a new project:
   ```bash
   npx sanity@latest init
   ```
3. Find your Project ID in project settings
4. Create a Write Token:
    - Go to Settings > API > Tokens
    - Create a new token with "Editor" permissions
5. Set up your Sanity schema in the `sanity/` directory

### Sentry

1. Create an account at [sentry.io](https://sentry.io/)
2. Create a new Next.js project
3. Create an Auth Token:
    - Go to Settings > Account > API > Auth Tokens
    - Create a token with "project:releases" scope

## Environment Variables

Fill in your `.env.local` with the following variables:

```env
# NextAuth Configuration
AUTH_SECRET=your_generated_secret_here
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="v2024-01-01"

# Sanity Write Token (for creating/updating content)
NEXT_SANITY_WRITE_TOKEN=your_sanity_write_token

# Sentry Configuration
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

## Running the Project

### Development Mode
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate TypeScript types for Sanity schemas

## Project Structure

```
yc-app/
├── app/
│   ├── (root)/
│   │   ├── startup/         # Startup-related pages
│   │   └── user/           # User profile pages
│   ├── api/
│   │   ├── auth/           # NextAuth API routes
│   │   └── sentry-example-api/
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   └── globals.css         # Global styles
├── sanity/
│   ├── lib/                # Sanity client and queries
│   ├── schemaTypes/        # Content schemas
│   └── structure.ts        # Studio structure
├── public/                 # Static assets
├── .env.template          # Environment variables template
└── next.config.ts         # Next.js configuration
```

## Key Components

### Authentication Flow
The app uses NextAuth with GitHub provider. When users sign in:
1. GitHub OAuth authentication occurs
2. User data is stored/updated in Sanity CMS
3. Session includes user ID from Sanity for content management

### Content Management
- **Startups**: Create and manage startup pitches
- **Authors**: User profiles linked to GitHub accounts
- **Rich Content**: Markdown support for descriptions and content

### UI Components
- Form components for creating startups
- Search functionality
- User cards and startup cards
- Navigation and layout components

## Development Notes

- **TypeScript**: Fully typed with generated Sanity types
- **ESLint & Prettier**: Code formatting and linting
- **Turbopack**: Fast development builds
- **Hot Reload**: Instant updates during development
- **Responsive Design**: Mobile-first approach

## Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

3. **Update environment variables** in your deployment platform

4. **Update OAuth callback URLs** to match your production domain
