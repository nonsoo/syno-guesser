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

interface Props {
  children: ReactNode;
  initialState: GameState;
  offsetDate: number;
  hasAccount: boolean;
}
interface GameContext {
  gameStore: ReturnType<typeof createGameStore>;
  gameStatisticsStore: ReturnType<typeof createGameStatisticsStore>;
}

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({
  children,
  offsetDate,
  initialState,
  hasAccount,
}: Props) => {
  const gameStatisticsStore = createGameStatisticsStore(hasAccount, offsetDate);
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
      parsedState.state.gameState?.dayOfPlay === offsetDate
    ) {
      gameStore.persist.rehydrate();
    }
  });

  useEffect(() => {
    hydrateGameStoreEvent();
  }, []);

  return (
    <GameContext value={{ gameStatisticsStore, gameStore }}>
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
