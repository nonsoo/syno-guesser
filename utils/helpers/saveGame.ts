import { StoredGameState } from "../types/projectTypes";

const gameStateKey = "gameStateKey";

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  return state ? (JSON.parse(state) as StoredGameState) : null;
};

export const removeGameStateFromLocalStorage = () => {
  localStorage.removeItem(gameStateKey);
};
