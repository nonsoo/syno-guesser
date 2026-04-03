import { createStore } from "zustand";
import type { GameActions, GameProps, GameState } from "./gameStore.types";

import get_initial_synonyms_lst from "../../helpers/get-initial-synonyms-lst";
import randomizeHint from "../../helpers/randomizeHints";
import { generateStatusColour, isGuessInWordLst } from "./gameStore.helpers";

export const createGameStore = ({ initialState }: GameProps) => {
  const GameStore = createStore<GameState & GameActions>((set) => ({
    ...initialState,
    getHint: () => {
      set((state) => {
        if (state.availableHints.length === 0 || state.myLives <= 0) {
          return state; // No hints available or no lives left
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
          return state; // Game already ended or empty guess
        }

        const guessInWordLst = isGuessInWordLst(
          validatedGuess,
          state.availableHints,
          state.synonyms,
          triggerWords,
        );

        if (!guessInWordLst) {
          action();
          return state;
        }

        const synonymBackgroudColour = generateStatusColour(
          validatedGuess,
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

  return GameStore;
};
