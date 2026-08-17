# Tech Stack

## Runtime and Framework

- Next.js `^16.2.6` (App Router)
- React `^19.2.6`
- TypeScript `^6.0.3`

## State and Data

- Zustand `^5.0.13` for client state stores.
- Axios `^1.16.1` for HTTP/data fetching.
- Date handling via `date-fns` and `@date-fns/tz`.

## UI and Utilities

- CSS modules + global CSS in `styles/`.
- `clsx` for class name composition.
- `lucide-react` and `react-icons` for iconography.
- `react-day-picker` for date selection UI.
- `uuid` for unique identifiers.

## Quality Tooling

- ESLint `^9` with Next.js + React + hooks plugins.
- Vitest `^4` + Testing Library for unit/integration tests.
- happy-dom/jsdom available for test environments.

## Key Scripts

- `npm run dev`: start local development server.
- `npm run build`: production build.
- `npm run start`: run production server.
- `npm run lint` / `npm run lint:fix`: linting.
- `npm run typecheck`: TypeScript checks (`tsc`).
- `npm run test` / `npm run test:ci`: Vitest.

## Config Highlights

- TypeScript path alias: `@/*` -> project root (`tsconfig.json`).
- Next config enables strict mode and React Compiler (`next.config.ts`).
- Vitest is configured with React plugin and `utils/config/vitest_setup.ts` (`vitest.config.ts`).
