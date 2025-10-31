"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  use,
} from "react";

interface Props {
  children: ReactNode;
}
interface GameContext {
  gameState: boolean;
  setGameState: Dispatch<SetStateAction<boolean>>;
}

const GameContext = createContext<GameContext | null>(null);

const GameProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState(false);

  return (
    <GameContext value={{ gameState, setGameState }}>{children}</GameContext>
  );
};

export const GetGameContext = () => {
  const context = use(GameContext);

  if (!context)
    throw new Error("Context can only be accessed inside a provider");

  return context;
};

export default GameProvider;
