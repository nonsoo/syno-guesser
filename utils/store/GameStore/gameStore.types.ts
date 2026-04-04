import { StoreApi } from "zustand";

import { Synonyms, UserGuessLst } from "@/utils/types/projectTypes";

import { createGameStatisticsStore } from "../GameStatisticsStore/GameStatisticsStore";

export interface GameState {
  wordOfDay: string;
  gameState: {
    status: "in-progress" | "ended";
    winState: "win" | "lose" | "none";
    dayOfPlay: number;
  };
  archivedGame: boolean;
  myLives: number;
  guessLst: UserGuessLst[];
  synonyms: Synonyms;
  availableHints: Synonyms;
}

export interface GameActions {
  getHint: () => void;
  onGuess: ({
    myGuess,
    triggerWords,
    action,
  }: {
    myGuess: string;
    triggerWords: string[];
    action: () => void;
  }) => void;
}

export interface GameProps {
  initialState: GameState;
  gameStatisticsStore: ReturnType<typeof createGameStatisticsStore>;
}

export type GameStore = StoreApi<GameState & GameActions> & {
  persist: {
    rehydrate: () => void;
  };
};
