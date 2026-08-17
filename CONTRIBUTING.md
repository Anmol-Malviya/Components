# Contributing to Anmol UI Components

Thanks for contributing to the component library. Keep submissions focused, reusable, responsive, and easy for other developers to copy into their projects.

## 1. Create a component folder

Add each component under `components/elements/<component-slug>/`.

Typical structure:

```text
components/elements/fancy-button/
  index.tsx
  preview.tsx
```

3D or more complex components may use additional files such as a dedicated model/component file and `index.ts` exports.

## 2. Include the required component data

A submission should provide:

- a clear component name and slug
- category and short description
- copy-ready React/JSX source
- copy-ready CSS when the component needs custom styles
- a working homepage preview
- any required dependencies documented in the component metadata or source

Keep demo-only styles separate from the code users are expected to copy.

## 3. Register the component

1. Import the component definition in `lib/components.ts`.
2. Add it to the exported `components` array.
3. Import the preview in `components/ComponentGallery.tsx`.
4. Map the preview key so it renders in the gallery.

## 4. Validate locally

Before opening a pull request, run:

```bash
npm install
npm run build
```

Also run the development server and verify the component on desktop and mobile:

```bash
npm run dev
```

Check that search, category filtering, the live preview, and the component detail page still work.

## 5. Branch and pull request guidelines

- Create a focused branch for one component or one improvement.
- Use clear commit messages.
- Do not include unrelated generated files or formatting changes.
- In the pull request, explain what was added, list any new dependencies, and mention how you validated the change.
- Include screenshots or a short recording when the visual behavior is not obvious from the code.

## Component quality checklist

- Responsive layout
- Keyboard-friendly interactions where relevant
- No broken imports or missing assets
- No secrets, API keys, or private URLs
- Copy-ready code matches the rendered preview
- Reasonable performance for animations and 3D scenes

By contributing, you agree that your changes may be published as part of this open component library.
