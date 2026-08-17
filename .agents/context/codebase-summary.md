# Codebase Summary

## Purpose

Syno Guesser is a daily word-guessing game. Players receive synonym-based hints and try to guess a secret word. Incorrect guesses are tracked, and closer guesses are shown with warmer feedback.

## High-Level Structure

- `app/`: Next.js App Router entrypoints, pages, dynamic archive route, and server helpers.
- `Components/`: Shared UI building blocks used across game screens.
- `app/components/`: Route-local or app-level components tied closely to pages.
- `utils/`: Core logic and architecture helpers:
  - `store/`: Zustand-based game and statistics stores.
  - `helpers/`: Date logic, hint randomization, sharing helpers, data access.
  - `hooks/`: Reusable React hooks.
  - `constants/`, `types/`, `mocks/`, `config/`.
- `styles/`: CSS modules and global layout styles.
- `__tests__/`: Unit and integration tests for stores, helpers, and pages.

## Core Behavior Areas

- Daily game setup and reset logic.
- Synonym list retrieval and hint progression.
- Guess evaluation and feedback rendering.
- Persisted game statistics and archive browsing by date.

## Test Layout

- `__tests__/unit/`: Store and helper unit tests.
- `__tests__/integration/`: Page/component integration tests.

## Agent Tips

- Start from the route in `app/page.tsx` for main gameplay flow.
- Check `utils/store/` first for state-related changes.
- Keep date-based behavior consistent with helpers in `utils/helpers/dates.ts` and related files.
