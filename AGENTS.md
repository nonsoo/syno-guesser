# AGENTS

This repository uses this file as the agent entry point.

## Required Context

Read these files before making code changes:

- [.agents/context/codebase-summary.md](.agents/context/codebase-summary.md)
- [.agents/context/tech-stack.md](.agents/context/tech-stack.md)

## First-Read Order

Use this order to reduce mistakes and duplicate effort:

1. Read [.agents/context/codebase-summary.md](.agents/context/codebase-summary.md) for domain and architecture context.
2. Read [.agents/context/tech-stack.md](.agents/context/tech-stack.md) for tools, scripts, and constraints.
3. Open the route or store relevant to the task (`app/`, `Components/`, `utils/store/`).
4. Check matching tests in `__tests__/` before changing behavior.

## Working Rules

- Keep changes focused and minimal.
- Preserve current app behavior unless a task explicitly asks for behavior changes.
- Prefer existing patterns in `app/`, `Components/`, and `utils/`.
- Add or update tests in `__tests__/` when changing behavior.
- Run relevant checks before finishing:
  - `npm run typecheck`
  - `npm run test:ci`
  - `npm run lint`

## Primary Areas

- App routes and server helpers: `app/`
- Reusable UI components: `Components/` and `app/components/`
- Shared logic, stores, hooks, and helpers: `utils/`
- Styling: `styles/`
- Tests: `__tests__/`

## Task Playbooks

### Bug Fix Flow

1. Reproduce the issue locally or via existing tests.
2. Locate ownership: route/component/store/helper responsible for behavior.
3. Add or update a failing test first when practical.
4. Implement the smallest fix that resolves the issue.
5. Run `npm run test:ci`, `npm run typecheck`, and `npm run lint`.
6. Confirm no related regressions in archive/daily game behavior.

### Feature Flow

1. Map feature impact across UI (`app/`, `Components/`) and state (`utils/store/`).
2. Reuse existing helper/store patterns before adding new abstractions.
3. Keep public behavior and naming consistent with current game vocabulary.
4. Add tests for new logic and user-visible behavior.
5. Run `npm run test:ci`, `npm run typecheck`, and `npm run lint`.

### Refactor Flow

1. Avoid behavior changes unless explicitly required.
2. Preserve current types and external APIs where possible.
3. Move logic in small steps with test coverage in place.
4. Run full checks and verify unchanged gameplay behavior.

## Code Standards

- Language and types:
  - Use TypeScript for all new logic.
  - Prefer explicit types at module boundaries and exported APIs.
  - Avoid `any`; use union types or generics where possible.
- React and Next.js:
  - Prefer functional components and hooks.
  - Keep server/client boundaries clear in App Router code.
  - Avoid unnecessary re-renders; derive state when possible.
- State and business logic:
  - Keep UI components lean; place reusable logic in `utils/helpers/` or `utils/store/`.
  - Centralize game-state mutations in zustand store modules.
  - Keep date-sensitive logic deterministic and testable.
- Styling and UI:
  - Use existing CSS module patterns in `styles/`.
  - Reuse established component styles and naming conventions.
- Testing:
  - Add or update tests for every behavioral change.
  - Prefer unit tests for store/helper logic and integration tests for page flows.
  - Keep tests deterministic (mock time/data when needed).
- Imports and structure:
  - Prefer `@/*` path aliases where they improve clarity.
  - Keep files cohesive; avoid large mixed-responsibility modules.
  - Remove dead code and unused exports in touched files.

## Notes

- Use path alias `@/*` from `tsconfig.json` where helpful.
- The app is a daily word/synonym guessing game; avoid introducing unrelated complexity.
