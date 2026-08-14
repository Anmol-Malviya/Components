# Anmol UI Components

A copy-ready React component gallery inspired by modern component marketplaces.

## What is included

- Live component previews on the home page
- Search and category filters
- Dedicated detail page for every component
- One-click JSX and CSS copy buttons
- Responsive dark UI
- Data-driven component registry for easy expansion
- Zero third-party UI dependencies

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add a new component

The library is intentionally simple.

1. Open `lib/components.ts`.
2. Add a new object to the `components` array with `slug`, `name`, `category`, `description`, `tags`, `preview`, `theme`, `code`, and `css`.
3. Add the live preview markup in `components/ComponentGallery.tsx` using the same `preview` key.
4. Add the matching demo styles to `app/globals.css`.

The component will automatically appear on the homepage, category filters, search results, and its own `/components/[slug]` detail page.

## Current starter components

- Aurora Button
- Neon Outline Button
- Glass Focus Card
- Spotlight Card
- Elastic Loading Dots
- AI Pulse Ring
- Modern Toggle
- Avatar Stack

## Suggested next upgrades

- Community submissions
- Authentication and creator profiles
- Favorite/save components
- Copy as Tailwind / CSS / shadcn variants
- Component playground with editable props
- View counts and trending sort
- Tags in the URL for shareable searches
- Admin dashboard to publish components without editing code

## Deploy

This project is ready for Vercel.

```bash
npm run build
```

Then import the GitHub repository into Vercel.
