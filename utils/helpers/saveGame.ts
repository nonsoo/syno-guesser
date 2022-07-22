import { StoredGameState, StoredGameStatistics } from "../types/projectTypes";

const gameStateKey = "gameStateKey";
const gameStatKey = "gameStatKey";

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

export const saveGameStats = (gameStat: StoredGameStatistics) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStat));
};

export const loadGameStats = () => {
  const state = localStorage.getItem(gameStatKey);
  return state ? (JSON.parse(state) as StoredGameStatistics) : null;
};
