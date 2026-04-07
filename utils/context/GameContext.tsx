"use client";

import {
  createContext,
  ReactNode,
  use,
  useEffect,
  useEffectEvent,
} from "react";

import { GAME_STORE_KEY } from "../constants/id-constants";
import { createGameStatisticsStore } from "../store/GameStatisticsStore/GameStatisticsStore";
import { createGameStore } from "../store/GameStore/gameStore";
import { GameState } from "../store/GameStore/gameStore.types";
import { WordListTheme } from "../types/projectTypes";

interface Props {
  children: ReactNode;
  initialState: GameState;
  hasAccount: boolean;
  theme: WordListTheme;
}
interface GameContext {
  gameStore: ReturnType<typeof createGameStore>;
  gameStatisticsStore: ReturnType<typeof createGameStatisticsStore>;
  theme: WordListTheme;
}

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children, initialState, hasAccount, theme }: Props) => {
  const dayOfPlay = initialState.gameState.dayOfPlay;
  const gameStatisticsStore = createGameStatisticsStore(hasAccount, dayOfPlay);
  const gameStore = createGameStore({
    initialState,
    gameStatisticsStore,
  });

  const hydrateGameStoreEvent = useEffectEvent(() => {
    const storedState = localStorage.getItem(GAME_STORE_KEY);

    if (!storedState) return;

    const parsedState = JSON.parse(storedState) as {
      state: Partial<GameState>;
      version: number;
    };

    if (
      !initialState.archivedGame &&
      parsedState.state.gameState?.dayOfPlay === dayOfPlay
    ) {
      gameStore.persist.rehydrate();
    }
  });

  useEffect(() => {
    hydrateGameStoreEvent();
  }, []);

  return (
    <GameContext value={{ gameStatisticsStore, gameStore, theme }}>
      {children}
    </GameContext>
  );
};

export const GetGameContext = () => {
  const context = use(GameContext);

  if (!context)
    throw new Error("Context can only be accessed inside a provider");

  return context;
};

export default GameProvider;
