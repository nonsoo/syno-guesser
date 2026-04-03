import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  GameStatisticsActions,
  GameStatisticsState,
} from "./GameStatisticsStore.types";

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
            const updatedGamesPlayed =
              state.lastOffSetDate === offsetDate - 1
                ? state.gamesPlayed + 1
                : 1;
            const updatedWinStreak = hasWon ? state.winStreak + 1 : 0;
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
        name: "clueless-statistics",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );

  return gameStatisticsStore;
};
