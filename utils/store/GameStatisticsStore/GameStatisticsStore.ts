import type {
  GameStatisticsActions,
  GameStatisticsState,
} from "./GameStatisticsStore.types";

import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GAME_STATISTICS_STORE_KEY } from "@/utils/constants/id-constants";

import { generateUpdatedWinStreak } from "./GameStatisticsStore.helpers";

export const createGameStatisticsStore = (
  hasAccount = false,
  offsetDate: number,
) => {
  if (hasAccount) return null;

  const initialState: GameStatisticsState = {
    lastOffSetDate: offsetDate,
    gamesPlayed: 1,
    winStreak: 0,
    maxWinStreak: 0,
  };

  const gameStatisticsStore = createStore<
    GameStatisticsState & GameStatisticsActions
  >()(
    persist(
      (set) => ({
        ...initialState,
        setGameStatistics: (hasWon, offsetDate) => {
          set((state) => {
            const isConsecutiveDay = state.lastOffSetDate === offsetDate - 1;
            const updatedGamesPlayed = isConsecutiveDay
              ? state.gamesPlayed + 1
              : 1;

            const updatedWinStreak = generateUpdatedWinStreak(
              hasWon,
              isConsecutiveDay,
              state.winStreak,
            );

            const updatedMaxWinStreak = Math.max(
              state.maxWinStreak,
              updatedWinStreak,
            );

            return {
              lastOffSetDate: offsetDate,
              gamesPlayed: updatedGamesPlayed,
              winStreak: updatedWinStreak,
              maxWinStreak: updatedMaxWinStreak,
            };
          });
        },
      }),
      {
        name: GAME_STATISTICS_STORE_KEY,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );

  return gameStatisticsStore;
};
