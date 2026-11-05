import type {
  GameState,
  GameActions,
} from "../../utils/store/GameStore/gameStore.types";

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createStore } from "zustand";

import { mockGame } from "../../utils/mocks/game.mock";
import {
  generateStatusColour,
  isGuessInWordLst,
} from "../../utils/store/GameStore/gameStore.helpers";

const theme = "random-list";

// Create a test-friendly store creator that skips persist middleware
const createTestGameStore = (initialState: GameState) => {
  return createStore<GameState & GameActions>()((set) => ({
    ...initialState,
    getHint: () => {
      set((state) => {
        if (state.availableHints.length === 0) {
          return state;
        }

        if (state.myLives <= 0) {
          return state;
        }

        const newHint = state.availableHints[0];
        const newAvailableHints = state.availableHints.slice(1);

        return {
          synonyms: [...state.synonyms, newHint],
          availableHints: newAvailableHints,
          myLives: state.myLives - 1,
          gameState: {
            ...state.gameState,
            status: state.myLives - 1 <= 0 ? "ended" : state.gameState.status,
            winState:
              state.myLives - 1 <= 0 ? "lose" : state.gameState.winState,
          },
        };
      });
    },
    onGuess: ({ myGuess, triggerWords, action }) => {
      const validatedGuess = myGuess.trim().toLowerCase();
      set((state) => {
        if (state.gameState.status === "ended" || validatedGuess === "") {
          return state;
        }

        const guessNotInWordLst = isGuessInWordLst(
          validatedGuess,
          state.availableHints,
          state.synonyms,
          triggerWords,
          theme,
        );

        if (guessNotInWordLst) {
          action();
          return state;
        }

        const synonymBackgroudColour = generateStatusColour(
          validatedGuess,
          state.synonyms,
          triggerWords,
          state.availableHints,
          state.wordOfDay,
        );

        if (validatedGuess === state.wordOfDay) {
          return {
            guessLst: [
              ...state.guessLst,
              {
                id: crypto.randomUUID(),
                word: myGuess,
                statusColour: synonymBackgroudColour,
              },
            ],
            gameState: {
              ...state.gameState,
              status: "ended",
              winState: "win",
            },
          };
        }

        return {
          guessLst: [
            ...state.guessLst,
            {
              id: crypto.randomUUID(),
              word: myGuess,
              statusColour: synonymBackgroudColour,
            },
          ],
          myLives: state.myLives - 1,
          gameState: {
            ...state.gameState,
            status: state.myLives - 1 <= 0 ? "ended" : state.gameState.status,
            winState:
              state.myLives - 1 <= 0 ? "lose" : state.gameState.winState,
          },
        };
      });
    },
  }));
};

describe("GameStore Actions", () => {
  let gameStore: ReturnType<typeof createTestGameStore>;

  beforeEach(() => {
    localStorage.clear();
    gameStore = createTestGameStore(mockGame.initialState);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getHint action", () => {
    it("should add the first hint to synonyms", () => {
      const initialHintCount = gameStore.getState().availableHints.length;
      const firstHint = gameStore.getState().availableHints[0];

      gameStore.getState().getHint();

      const state = gameStore.getState();
      expect(state.synonyms).toContain(firstHint);
      expect(state.availableHints.length).toBe(initialHintCount - 1);
    });

    it("should reduce myLives by 1 when hint is called", () => {
      const initialLives = gameStore.getState().myLives;

      gameStore.getState().getHint();

      const state = gameStore.getState();
      expect(state.myLives).toBe(initialLives - 1);
    });

    it("should remove the used hint from availableHints", () => {
      const firstHint = gameStore.getState().availableHints[0];

      gameStore.getState().getHint();

      const state = gameStore.getState();
      expect(state.availableHints).not.toContain(firstHint);
      expect(state.availableHints[0]).not.toBe(firstHint);
    });

    it("should set game status to ended and winState to lose when lives reach 0", () => {
      // Use a store with fewer initial lives for testing
      const testState: GameState = {
        ...mockGame.initialState,
        myLives: 1,
      };
      const testStore = createTestGameStore(testState);

      testStore.getState().getHint();

      const state = testStore.getState();
      expect(state.gameState.status).toBe("ended");
      expect(state.gameState.winState).toBe("lose");
      expect(state.myLives).toBe(0);
    });

    it("should not add hint when availableHints is empty", () => {
      const testState: GameState = {
        ...mockGame.initialState,
        availableHints: [],
      };
      const testStore = createTestGameStore(testState);

      const initialSynonyms = testStore.getState().synonyms;
      const initialLives = testStore.getState().myLives;

      testStore.getState().getHint();

      const state = testStore.getState();
      expect(state.synonyms).toEqual(initialSynonyms);
      expect(state.myLives).toBe(initialLives);
    });

    it("should not add hint when myLives is already 0", () => {
      const testState: GameState = {
        ...mockGame.initialState,
        myLives: 0,
      };
      const testStore = createTestGameStore(testState);

      const initialSynonyms = testStore.getState().synonyms;

      testStore.getState().getHint();

      const state = testStore.getState();
      expect(state.synonyms).toEqual(initialSynonyms);
    });
  });

  describe("onGuess action", () => {
    it("should handle a valid guess that matches a synonym", () => {
      const actionMock = vi.fn();
      const validSynonym = gameStore.getState().synonyms[0];

      gameStore.getState().onGuess({
        myGuess: validSynonym,
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].word).toBe(validSynonym);
      expect(state.guessLst[0].statusColour).toBe("hsl(111, 32%, 38%)");
      expect(actionMock).not.toHaveBeenCalled();
    });

    it("should handle a correct guess matching wordOfDay", () => {
      const actionMock = vi.fn();
      const wordOfDay = gameStore.getState().wordOfDay;

      gameStore.getState().onGuess({
        myGuess: wordOfDay,
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.gameState.status).toBe("ended");
      expect(state.gameState.winState).toBe("win");
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].word).toBe(wordOfDay);
    });

    it("should handle an incorrect guess by reducing lives", () => {
      const actionMock = vi.fn();
      const initialLives = gameStore.getState().myLives;

      gameStore.getState().onGuess({
        myGuess: "apple",
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.myLives).toBe(initialLives - 1);
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].statusColour).toBe("hsl(0, 84%, 68%)");
      expect(actionMock).not.toHaveBeenCalled();
    });

    it("should trim and lowercase guesses", () => {
      const actionMock = vi.fn();
      const validSynonym = gameStore.getState().synonyms[0];

      gameStore.getState().onGuess({
        myGuess: `  ${validSynonym.toUpperCase()}  `,
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].word).toBe(`  ${validSynonym.toUpperCase()}  `);
    });

    it("should not process empty guesses", () => {
      const actionMock = vi.fn();
      const initialGuesses = gameStore.getState().guessLst.length;

      gameStore.getState().onGuess({
        myGuess: "   ",
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(initialGuesses);
    });

    it("should end game with lose when lives reach 0", () => {
      const testState: GameState = {
        ...mockGame.initialState,
        myLives: 1,
      };
      const testStore = createTestGameStore(testState);

      const actionMock = vi.fn();

      testStore.getState().onGuess({
        myGuess: "apple",
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = testStore.getState();
      expect(state.myLives).toBe(0);
      expect(state.gameState.status).toBe("ended");
      expect(state.gameState.winState).toBe("lose");
      expect(actionMock).not.toHaveBeenCalled();
    });

    it("should not process guesses when game is already ended", () => {
      const testState: GameState = {
        ...mockGame.initialState,
        gameState: {
          ...mockGame.initialState.gameState,
          status: "ended",
          winState: "win",
        },
      };
      const testStore = createTestGameStore(testState);

      const actionMock = vi.fn();
      const initialGuesses = testStore.getState().guessLst.length;

      testStore.getState().onGuess({
        myGuess: "someword",
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = testStore.getState();
      expect(state.guessLst).toHaveLength(initialGuesses);
    });

    it("should handle guess in trigger words with correct colour", () => {
      const actionMock = vi.fn();
      const triggerWord = mockGame.triggerWords[0];

      gameStore.getState().onGuess({
        myGuess: triggerWord,
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].statusColour).toBe("hsl(111, 32%, 38%)");
    });

    it("should handle guess in available hints with correct colour", () => {
      const actionMock = vi.fn();
      const availableHint = gameStore.getState().availableHints[0];

      gameStore.getState().onGuess({
        myGuess: availableHint,
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(1);
      expect(state.guessLst[0].statusColour).toBe("hsl(111, 32%, 38%)");
    });

    it("should call action callback for invalid guesses", () => {
      const actionMock = vi.fn();

      gameStore.getState().onGuess({
        myGuess: "invalidguessnotinanylist",
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      expect(actionMock).toHaveBeenCalled();
    });

    it("should maintain guessLst in order of guesses", () => {
      const actionMock = vi.fn();
      const guesses = [
        gameStore.getState().synonyms[0],
        gameStore.getState().synonyms[1],
      ];

      gameStore.getState().onGuess({
        myGuess: guesses[0],
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      gameStore.getState().onGuess({
        myGuess: guesses[1],
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      expect(state.guessLst).toHaveLength(2);
      expect(state.guessLst[0].word).toBe(guesses[0]);
      expect(state.guessLst[1].word).toBe(guesses[1]);
    });

    it("should generate unique IDs for each guess", () => {
      const actionMock = vi.fn();
      const guesses = [
        gameStore.getState().synonyms[0],
        gameStore.getState().synonyms[1],
      ];

      gameStore.getState().onGuess({
        myGuess: guesses[0],
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      gameStore.getState().onGuess({
        myGuess: guesses[1],
        triggerWords: mockGame.triggerWords,
        action: actionMock,
        theme,
      });

      const state = gameStore.getState();
      const id1 = state.guessLst[0].id;
      const id2 = state.guessLst[1].id;

      expect(id1).not.toBe(id2);
    });
  });
});
