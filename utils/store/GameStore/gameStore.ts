import type {
  GameActions,
  GameProps,
  GameState,
  GameStore,
} from "./gameStore.types";
import type { StateCreator } from "zustand";

import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GAME_STORE_KEY } from "@/utils/constants/id-constants";

import { generateStatusColour, isGuessInWordLst } from "./gameStore.helpers";

const createGameStoreCreator =
  ({
    initialState,
    gameStatisticsStore,
  }: GameProps): StateCreator<GameState & GameActions> =>
  (set) => ({
    ...initialState,
    getHint: () => {
      set((state) => {
        if (state.availableHints.length === 0) {
          return state;
        }

        const noLivesRemaining = state.myLives - 1 <= 0;

        if (noLivesRemaining && gameStatisticsStore && !state.archivedGame) {
          const setGameStatistics =
            gameStatisticsStore.getState().setGameStatistics;
          setGameStatistics(false, state.gameState.dayOfPlay);
        }

        const newHint = state.availableHints[0];
        const newAvailableHints = state.availableHints.slice(1);

        return {
          synonyms: [...state.synonyms, newHint],
          availableHints: newAvailableHints,
          myLives: state.myLives - 1,
          gameState: {
            ...state.gameState,
            status: noLivesRemaining ? "ended" : state.gameState.status,
            winState: noLivesRemaining ? "lose" : state.gameState.winState,
          },
        };
      });
    },
    onGuess: ({ myGuess, triggerWords, theme, action }) => {
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
          if (gameStatisticsStore && !state.archivedGame) {
            const setGameStatistics =
              gameStatisticsStore.getState().setGameStatistics;
            setGameStatistics(true, state.gameState.dayOfPlay);
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
            gameState: {
              ...state.gameState,
              status: "ended",
              winState: "win",
            },
          };
        }

        if (state.myLives - 1 <= 0) {
          if (gameStatisticsStore && !state.archivedGame) {
            const setGameStatistics =
              gameStatisticsStore.getState().setGameStatistics;
            setGameStatistics(false, state.gameState.dayOfPlay);
          }
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
  });

export const createGameStore = ({
  initialState,
  gameStatisticsStore,
}: GameProps): GameStore => {
  if (initialState.archivedGame) {
    return createStore<GameState & GameActions>()(
      createGameStoreCreator({ initialState, gameStatisticsStore }),
    ) as GameStore;
  }

  return createStore<GameState & GameActions>()(
    persist(createGameStoreCreator({ initialState, gameStatisticsStore }), {
      name: GAME_STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guessLst: state.guessLst,
        synonyms: state.synonyms,
        myLives: state.myLives,
        gameState: state.gameState,
      }),
      skipHydration: true,
    }),
  );
};
