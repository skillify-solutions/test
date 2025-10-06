# HANDMADE.WORLD (now branded as "Artisan")

## Overview

HANDMADE.WORLD (now branded as "Artisan") is a Next.js 15.5.4 application that serves as a searchable, authenticated database platform connecting artisans, maker groups, designers, buyers, and service providers across India's handmade ecosystem. The platform is hosted by Creative Dignity and aims to amplify visibility for India's handmade crafts, fix data gaps, and create pathways to markets while preserving craft knowledge and improving artisan livelihoods.

The application is built as a marketing and directory website with multiple database views (makers, events, retail outlets, service providers), resource sections, and community engagement features.

## Recent Changes

**October 6, 2025 - Responsive Form Styling**
- Updated registration modal and all three registration forms (Maker, Service Provider, Buyer) with fully responsive styling
- Implemented responsive spacing, typography, and button layouts across mobile/tablet/desktop breakpoints
- Modal now uses viewport-based width constraints with proper overflow handling
- All forms use consistent shadcn/ui components (Label, Input, Textarea, Button) with responsive classes
- Buttons stack vertically on mobile and display horizontally on larger screens

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- Next.js 15.5.4 with App Router architecture
- Server Components by default with selective client-side interactivity
- File-based routing under `app/(marketing)/` route group for all public pages
- TypeScript for type safety across components and configurations

**Styling & UI Components**
- Tailwind CSS v4 with PostCSS integration for utility-first styling
- shadcn/ui component library (New York style variant) for consistent, accessible primitives
- Custom theme system using CSS variables defined in `app/globals.css` and `styles/theme.css`
- Dark/light theme support via `next-themes` provider
- Framer Motion for animations with respect for `prefers-reduced-motion`
- Lucide React for iconography

**Component Architecture**
- Reusable layout components: `SiteHeader`, `SiteFooter`, `Hero`, `Section`
- UI primitives in `components/ui/`: `Button`, `Input`, `Textarea`, `Label`, `Sheet` (mobile menu), `Dialog`
- Registration system with `RegisterModal` component supporting three user types (Makers, Service Providers, Buyers)
- Form components in `components/forms/` with react-hook-form and zod validation
- Path aliases configured (`@/components`, `@/lib`, etc.) for clean imports
- Separation of concerns: presentational components vs. layout components
- All forms fully responsive with mobile-first Tailwind CSS classes

**Navigation System**
- Centralized route configuration in `lib/routes.config.ts`
- Single source of truth for navigation items consumed by header component
- Active route detection using `usePathname()` hook
- Responsive navigation with Sheet component for mobile menu

### Data & State Management

**Current State**
- Static mockup/prototype phase - no database integration yet
- Hardcoded sample data in page components (stats, listings, etc.)
- Registration forms with client-side validation using react-hook-form and zod
- Three user types supported: Makers, Service Providers, and Buyers
- No authentication system or backend submission implemented yet

**Anticipated Architecture**
- Database layer expected to be added (placeholder for artisan profiles, events, resources)
- Search functionality currently mocked but structured for future implementation
- Filter/facet system designed in UI (location, craft type, etc.) awaiting backend integration

### Accessibility & Performance

**Accessibility Features**
- Semantic HTML structure throughout
- Keyboard navigation support for interactive elements
- ARIA attributes where appropriate (navigation, buttons)
- Alt text placeholders for images
- Focus-visible ring styling for keyboard users

**Performance Optimizations**
- Next.js automatic code splitting by route
- Image optimization ready via Next.js Image component (placeholder usage shown)
- Static generation potential for marketing pages
- Sticky header with backdrop blur using CSS-only effects

### Development Patterns

**File Organization**
- Route group `(marketing)` contains all public-facing pages
- Shared components in `/components` root
- UI primitives isolated in `/components/ui`
- Utilities and helpers in `/lib`
- Global styles in `/app` and `/styles`

**Configuration**
- TypeScript strict mode enabled
- Path aliases for clean imports
- ESLint configured with Next.js recommended rules
- Development server runs on port 5000 with network exposure (0.0.0.0)

## External Dependencies

### UI & Styling Libraries
- **@radix-ui/react-dialog** (v1.1.15) - Accessible modal/sheet primitives for registration forms
- **@radix-ui/react-label** (v2.1.2) - Form label component with accessibility
- **@radix-ui/react-slot** (v1.2.3) - Component composition utility
- **tailwindcss** (v4) - Utility-first CSS framework
- **@tailwindcss/postcss** (v4) - PostCSS integration
- **tw-animate-css** (v1.4.0) - Animation utilities for Tailwind
- **class-variance-authority** (v0.7.1) - Component variant management
- **clsx** (v2.1.1) & **tailwind-merge** (v3.3.1) - Class name utilities

### React & Next.js
- **next** (v15.5.4) - React framework with App Router
- **react** (v19.1.0) & **react-dom** (v19.1.0) - React library
- **next-themes** (v0.4.6) - Theme management (dark/light mode)

### Icons & Animation
- **lucide-react** (v0.544.0) - Icon library
- **framer-motion** (v12.23.22) - Animation library

### Fonts
- **Geist** & **Geist Mono** - Google Fonts loaded via next/font

### Form Management & Validation
- **react-hook-form** (v7.54.2) - Performant form state management
- **@hookform/resolvers** (v3.9.1) - Validation resolver for zod
- **zod** (v3.24.1) - TypeScript-first schema validation for form data

### Development Tools
- **TypeScript** (v5) - Type checking
- **ESLint** (v9) - Code linting with Next.js config
- **@types/node**, **@types/react**, **@types/react-dom** - TypeScript definitions

### Future Integration Points
- Authentication system (not yet implemented)
- Database solution (structure suggests Drizzle ORM may be added)
- Search API (UI present, backend pending)
- Form submission handling (contact, applications)
- Image storage/CDN for artisan profiles and galleries
- Analytics or tracking (not present)