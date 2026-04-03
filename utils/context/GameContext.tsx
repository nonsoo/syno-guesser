"use client";

import { createContext, ReactNode, use } from "react";
import { createGameStore } from "../store/GameStore/gameStore";
import { createGameStatisticsStore } from "../store/GameStatisticsStore/GameStatisticsStore";

interface Props {
  children: ReactNode;
  synonymsOfDay: string[];
  wordOfDay: string;
  offsetDate: number;
}
interface GameContext {
  gameStore: ReturnType<typeof createGameStore>;
  gameStatisticsStore: ReturnType<typeof createGameStatisticsStore>;
}

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({
  children,
  offsetDate,
  synonymsOfDay,
  wordOfDay,
}: Props) => {
  const gameStore = createGameStore({
    synonyms: synonymsOfDay,
    wordOfDay,
    offsetDate,
  });
  const gameStatisticsStore = createGameStatisticsStore(false, offsetDate);

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
