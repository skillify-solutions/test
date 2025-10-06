# Handmade.World Mockups – Next.js 14 Implementation

## Setup

```bash
npm install
npm run dev
```

## Build & Start

```bash
npm run build
npm run start
```

## Tech
- Next.js 14 App Router + TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- lucide-react, framer-motion, next-themes

## Routes
Navigation is defined in `lib/routes.config.ts`. Update this file to change order or labels.

## Mockups
Place all provided images under `public/mockups/` (keep filenames). Use these to align visuals.

## Updating Navigation
Edit `lib/routes.config.ts` and adjust labels/hrefs. The header reads this to render desktop and mobile menus.

## Accessibility & Performance
- Keyboard-accessible menus and buttons
- Respect reduced motion
- Alt text on images

## Development Notes
- Reusable components live in `components/`
- Global theme variables in `styles/theme.css`

## Theme color

The project uses a single theme color inspired by popular handmade marketplaces. The CSS variables are defined in `styles/theme.css`:

- `--brand`: #F16521 (primary brand color)
- `--brand-foreground`: #ffffff (text color for brand backgrounds)

Use these variables in components (for example with Tailwind's arbitrary value syntax: `text-[color:var(--brand)]` or `bg-[color:var(--brand)]`) to keep the UI consistent.
