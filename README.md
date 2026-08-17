# Anmol UI Components

A copy-ready React component gallery inspired by modern component marketplaces.

## What is included

- Live component previews on the home page
- Search and category filters
- Dedicated detail page for every component
- One-click JSX and CSS copy buttons
- Responsive dark UI
- Folder-per-component architecture
- Data-driven component registry for easy expansion
- Interactive 3D components with React Three Fiber

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Component architecture

Every UI element has its own folder inside `components/elements`.

```text
components/
  elements/
    3d-doraemon/
      Doraemon3D.tsx
      index.ts
      preview.tsx
    3d-laptop/
      Laptop3D.tsx
      index.ts
      preview.tsx
    aurora-button/
      index.tsx
    neon-button/
      index.tsx
    glass-focus-card/
      index.tsx
    spotlight-card/
      index.tsx
    loading-dots/
      index.tsx
    ai-pulse-ring/
      index.tsx
    modern-toggle/
      index.tsx
    avatar-stack/
      index.tsx
```

Each element folder owns:

- Component metadata
- Copy-ready React/JSX source
- Copy-ready CSS source
- Homepage live preview component

`lib/components.ts` is the central registry that imports these element definitions.

## Add a new component

1. Create a new folder such as `components/elements/fancy-button/`.
2. Add its metadata, code snippet, CSS snippet, and preview component.
3. Import the definition inside `lib/components.ts` and add it to the `components` array.
4. Import its preview inside `components/ComponentGallery.tsx` and map its preview key.
5. Add gallery-only demo styles only when the preview needs them.

The component will then appear on the homepage, category filters, search results, and its own `/components/[slug]` detail page.

## Contributing

Community submissions are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for component structure, validation steps, quality checks, and pull request guidelines.

## Current starter components

- 3D Doraemon — procedural React Three Fiber character with idle motion, drag, zoom, lighting and shadows
- 3D Laptop — interactive React Three Fiber component with drag, zoom, auto-rotate and replaceable screen content
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
