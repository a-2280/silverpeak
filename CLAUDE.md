# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
- `npm run dev` - Start development server with Turbopack (recommended)
- `npm run build` - Build production version with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Sanity CMS
- `npx sanity dev` - Start Sanity Studio in development mode
- `npx sanity build` - Build Sanity Studio for production
- `npx sanity deploy` - Deploy Sanity Studio

## Project Architecture

This is a Next.js 15 application integrated with Sanity CMS for content management.

### Core Stack
- **Framework**: Next.js 15 with App Router
- **CMS**: Sanity v4 with next-sanity integration
- **Styling**: Tailwind CSS v4 + Styled Components
- **React**: React 19

### Directory Structure
- `app/` - Next.js App Router pages and layouts
  - `studio/[[...tool]]/` - Sanity Studio mounted at `/studio` path
- `sanity/` - Sanity configuration and schema
  - `env.js` - Environment variables for Sanity
  - `lib/` - Sanity client, image URL builder, and utilities
  - `schemaTypes/` - Content type definitions (currently empty)
  - `structure.js` - Studio structure configuration
- `public/fonts/` - Custom font files

### Key Integration Points
- Sanity Studio is embedded at `/studio` route using NextStudio component
- Sanity client configured in `sanity/lib/client.js` with CDN enabled
- Image optimization through `sanity/lib/image.js` using Sanity's image URL builder
- Environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`

### Configuration Files
- `sanity.config.js` - Main Sanity Studio configuration with Vision plugin
- `sanity.cli.js` - CLI configuration for Sanity commands
- `next.config.mjs` - Empty Next.js configuration (using defaults)
- `eslint.config.mjs` - ESLint with Next.js core web vitals rules

### Content Management
- Schema types defined in `sanity/schemaTypes/index.js` (currently empty - add content types here)
- Studio structure configured in `sanity/structure.js` (default document list)
- API version set to '2025-09-13'

### Development Notes
- Uses Turbopack for faster builds and development
- Styled Components configured alongside Tailwind CSS
- Project title: "Silverpeak" with description "Engineering"