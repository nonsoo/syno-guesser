import { createStore } from "zustand";
import type { GameActions, GameProps, GameState } from "./gameStore.types";

import get_initial_synonyms_lst from "../../helpers/get-initial-synonyms-lst";
import randomizeHint from "../../helpers/randomizeHints";
import { isGuessInWordLst } from "./gameStore.helpers";

export const createGameStore = ({
  synonyms,
  wordOfDay,
  offsetDate,
}: GameProps) => {
  const initialSynonyms = get_initial_synonyms_lst(synonyms);
  const availableHints = randomizeHint(
    synonyms.filter((synonym) => !initialSynonyms.includes(synonym)),
  );

  const initialState: GameState = {
    wordOfDay: wordOfDay.trim().toLowerCase(),
    availableHints,

    myLives: 6,
    guessLst: [],
    synonyms: initialSynonyms,
    gameState: {
      status: "in-progress",
      winState: "none",
      dayOfPlay: offsetDate,
    },
  };

  const GameStore = createStore<GameState & GameActions>((set) => ({
    ...initialState,
    getHint: () => {
      set((state) => {
        if (state.availableHints.length === 0 || state.myLives <= 0) {
          return state; // No hints available or no lives left
        }

        const newHint = availableHints[0];
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
    onGuess: ({ myGuess, triggerWords }) => {
      const validatedGuess = myGuess.trim().toLowerCase();
      set((state) => {
        if (state.gameState.status === "ended" || validatedGuess === "") {
          return state; // Game already ended or empty guess
        }

        const guessInWordLst = isGuessInWordLst(
          validatedGuess,
          wordOfDay,
          state.availableHints,
          state.synonyms,
          triggerWords,
        );

        const synonymBackgroudColVar = guessInWordLst
          ? "hsl(111, 32%, 38%)"
          : "hsl(0, 84%, 68%)";

        if (validatedGuess === state.wordOfDay) {
          return {
            guessLst: [
              ...state.guessLst,
              {
                id: crypto.randomUUID(),
                word: myGuess,
                statusColour: synonymBackgroudColVar,
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
              statusColour: synonymBackgroudColVar,
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
