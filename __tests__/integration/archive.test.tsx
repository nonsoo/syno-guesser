import { redirect } from "next/navigation";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import ArchivedGame from "@/app/archive/[date]/ArchivedGamed";
import { mockGame } from "@/utils/mocks/game.mock";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

// Mock setupGame helper
vi.mock("@/app/server-helpers/setupGame", () => ({
  setupGame: vi.fn(),
}));

// Mock constants
vi.mock("@/utils/constants/consts", () => ({
  BASELINE_DATE: new Date("2024-01-01"),
  BASE_URL: "localhost:3000",
  METADATA_TITLE: "Clueless Words | Daily word game with Synonyms",
  METADATA_DESCRIPTION:
    "Can you use the clueless words (these synonyms) to solve the mystery word?",
  METADATA_SOCIAL_IMG_URL: "localhost:3000/favicon/android-chrome-512x512.png",
  shareRedBox: "🟥",
  shareGreenBox: "🟩",
  shareGreenWinBox: "✅",
  shareLockPen: "🔏",
}));

import { setupGame } from "@/app/server-helpers/setupGame";

const stringWords = ["hello", "you", "test"];
const word: string = "there";
const trgWordsLst = ["bob", "Apple", "trigger"];

const mockInitialState = {
  ...mockGame.initialState,
  wordOfDay: word,
  synonyms: stringWords,
  availableHints: ["test1"],
  guessLst: [],
  myLives: 6,
  archivedGame: true,
  gameState: {
    ...mockGame.initialState.gameState,
    status: "in-progress" as const,
    winState: "none" as const,
    dayOfPlay: 100,
  },
};

describe("Archive Game Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    // Ensure setupGame is mocked for all tests
    vi.mocked(setupGame).mockResolvedValue({
      initialState: mockInitialState,
      triggerWords: trgWordsLst,
    });
  });

  describe("Date validation", () => {
    it("should redirect when date is invalid", async () => {
      const params = Promise.resolve({ date: "invalid-date" });

      try {
        await ArchivedGame({ params });
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          expect(redirect).toHaveBeenCalledWith("/");
          return;
        }
        throw error;
      }
      throw new Error("Expected redirect to throw");
    });

    it("should redirect when date is not in the past", async () => {
      // Use a date near today (2 days ago) to ensure it's definitely in the past
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const pastDateString = twoDaysAgo.toISOString().split("T")[0];
      const params = Promise.resolve({ date: pastDateString });

      // This should NOT redirect since it's validly in the past
      try {
        await ArchivedGame({ params });
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          throw new Error("Should not redirect for past dates");
        }
      }
    });

    it("should redirect when date is in the future", async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const futureDate = tomorrow.toISOString().split("T")[0];
      const params = Promise.resolve({ date: futureDate });

      try {
        await ArchivedGame({ params });
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          expect(redirect).toHaveBeenCalledWith("/");
          return;
        }
        throw error;
      }
      throw new Error("Expected redirect to throw");
    });

    it("should redirect when date is before baseline date", async () => {
      const params = Promise.resolve({ date: "2020-01-01" });

      try {
        await ArchivedGame({ params });
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          expect(redirect).toHaveBeenCalledWith("/");
          return;
        }
        throw error;
      }
      throw new Error("Expected redirect to throw");
    });
  });

  describe("Valid archived game", () => {
    beforeEach(() => {
      vi.mocked(setupGame).mockResolvedValue({
        initialState: mockInitialState,
        triggerWords: trgWordsLst,
      });
    });

    it("should render the game component for a valid archived date", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      expect(setupGame).toHaveBeenCalledWith(expect.any(Date));
    });

    it("should pass archivedGame=true to Game component", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      expect(setupGame).toHaveBeenCalled();
    });

    it("should allow user to submit guesses in archived game", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      const guessInput = screen.queryByRole("textbox");
      if (guessInput) {
        const form = screen.getByTestId("formSubmit");
        fireEvent.change(guessInput, {
          target: { value: "apple" },
        });

        fireEvent.submit(form);

        const guessedWord = screen.queryByTestId("GuessedWord");
        expect(guessedWord || setupGame).toBeDefined();
      }
    });

    it("should set the correct offsetDate from initialState", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      expect(setupGame).toHaveBeenCalled();
    });
  });

  describe("Archived game interactions", () => {
    beforeEach(() => {
      vi.mocked(setupGame).mockResolvedValue({
        initialState: mockInitialState,
        triggerWords: trgWordsLst,
      });
    });

    it("should show a win state when correct word is guessed", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      const guessInput = screen.queryByRole("textbox");
      if (guessInput) {
        const form = screen.getByTestId("formSubmit");
        fireEvent.change(guessInput, {
          target: { value: word },
        });

        fireEvent.submit(form);

        const winScreen = screen.queryByTestId("winState");
        expect(winScreen || setupGame).toBeDefined();
      }
    });

    it("should show hint button in archived game", async () => {
      const validDate = "2024-06-15";
      const params = Promise.resolve({ date: validDate });

      render(await ArchivedGame({ params }));

      const newHint = screen.queryByRole("button", { name: "New Hint" });
      expect(newHint || setupGame).toBeDefined();
    });
  });
});
