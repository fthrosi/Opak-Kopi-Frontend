# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React 19 + TypeScript front-end for Opak Kopi. Application code lives in `src/`, with entry points in `src/main.tsx` and `src/App.tsx`. UI is organized under `src/components/`: `atoms`, `molecules`, `organism`, `templates`, `pages`, and `routes`. API clients are in `src/api/`, Zustand stores in `src/components/store/`, constants in `src/const/`, models in `src/types/`, schemas in `src/validateSchema/`, hooks in `src/hooks/`, and utilities in `src/lib/`. Static images and audio live in `public/`. Do not edit generated `dist/` files.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server with hot reload.
- `npm run build`: run TypeScript project checks, then create a production Vite build.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: serve the built app locally for final inspection.

There is currently no `npm test` script. Use `npm run lint` and `npm run build` as the baseline checks before submitting changes.

## Coding Style & Naming Conventions

Write TypeScript and React components in `.tsx` files. Follow the existing style: functional components, hooks for reusable behavior, schema validation with Zod, API calls through `src/api/`, and shared state through Zustand. Keep indentation at two spaces, prefer single quotes, and keep imports explicit. Use camelCase for functions, hooks, constants, and stores; use PascalCase for React components and exported types. Place new UI in the smallest suitable component layer instead of adding everything to pages.

## Testing Guidelines

Automated tests are not configured yet. If adding tests, colocate them near the feature or use `src/**/__tests__/`, name files `*.test.ts` or `*.test.tsx`, and add a package script. For now, verify changed flows manually in the browser and run `npm run lint` plus `npm run build`.

## Commit & Pull Request Guidelines

Recent commit history uses short subjects such as `make flag for active menu` and `fixing bug...`. Keep commit messages concise and action-oriented, for example `fix promo status colors` or `add owner reservation filter`. Pull requests should include a brief summary, changed user flows, verification commands, related issue links, and screenshots or screen recordings for visible UI changes.

## Security & Configuration Tips

Keep environment-specific values in `.env` and never commit secrets. Check API base URLs, socket configuration, and deployment files (`dockerfile`, `docker-compose.yaml`, `nginx.conf`, `vercel.json`) when changing runtime behavior.
