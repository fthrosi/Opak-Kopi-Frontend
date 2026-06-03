# Opak Kopi Front End

Frontend web application for Opak Kopi, built with React, TypeScript, Vite, Tailwind CSS, Material UI, Zustand, Axios, Socket.IO, Zod, and React Router.

The app supports customer, cashier, and owner workflows: menu browsing, reservations, promos, favorites, profile management, order history, feedback, cashier order handling, reservation handling, menu management, user management, reports, and owner dashboard views.

## Tech Stack

- React 19 with TypeScript
- Vite 7 for development and builds
- Tailwind CSS 4 and Material UI for styling/components
- React Router for routing
- Zustand for client state
- Axios for API requests
- Socket.IO Client for realtime updates
- Zod and React Hook Form for form validation
- EmailJS and Midtrans client integration through Vite environment variables

## Live Demo
Production: https://opak-kopi-project.elyvoren.com/

## Project Structure

```text
src/
  api/                 Axios API clients and auth refresh handling
  assets/              Source assets imported by React
  components/
    atoms/             Small reusable UI primitives
    molecules/         Combined UI controls and sections
    organism/          Larger feature components
    pages/             Route-level pages for customer, cashier, owner
    routes/            Public and role-based route guards
    store/             Zustand stores
    templates/         Layout templates by role/view
  const/               Shared constants and formatters
  hooks/               Reusable React hooks
  lib/                 Utility helpers
  types/               Shared TypeScript types
  validateSchema/      Zod schemas
public/
  image/               Static images
  sound/               Static audio files
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create or update `.env` in the project root:

```env
VITE_API_URL=http://localhost:3000
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server with hot reload.

```bash
npm run build
```

Runs TypeScript build checks and creates the production build in `dist/`.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally for inspection.

## Main Routes

- Public: `/`, `/menu`, `/kontak`, `/login`, `/register`
- Customer: `/menulogin`, `/reservasi`, `/promo`, `/favorit`, `/profile`, `/history-order`, `/history-reservasi`, `/history-poin`, `/feedback`
- Cashier: `/kasir/pesanan`, `/kasir/menu`, `/kasir/reservasi`, `/kasir/tambah-pesanan`
- Owner: `/owner/dashboard`, `/owner/pesanan`, `/owner/reservasi`, `/owner/menu`, `/owner/promo`, `/owner/kritik-saran`, `/owner/kategori`, `/owner/pengguna`, `/owner/laporan`

Routes are protected with role-based guards in `src/components/routes/`.

## API and Auth

The shared Axios instance is defined in `src/api/index.tsx`. It uses `VITE_API_URL`, sends credentials with requests, and attempts `/auth/refresh-token` on unauthorized responses before logging the user out.

## Docker Production Build

Build and run the Nginx production container:

```bash
docker compose up --build
```

The container serves the built SPA on `http://localhost:8080`. Nginx is configured to fall back to `index.html` so React Router routes work after refresh.

## Quality Checks

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

Automated tests are not configured yet. Verify affected user flows manually in the browser.

## Notes for Contributors

- Keep secrets out of commits. Use `.env` for local configuration.
- Place new API wrappers in `src/api/` and shared types in `src/types/`.
- Prefer existing component layers before creating new folders.
- Do not edit generated files in `dist/`.
