import { useEffect, SetStateAction } from "react";

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  removeGameStateFromLocalStorage,
  loadGameStats,
} from "../helpers/saveGame";

import {
  resData,
  StoredGameStatistics,
  userGuessLst,
  synonyms,
  setupValues,
  triggerWord,
} from "../types/projectTypes";

import { getOffsetDay } from "../helpers/newDay";

type iSetState<T> = (value: SetStateAction<T>) => void;

type IuseLoadGame = (
  setMyGameStats: iSetState<StoredGameStatistics>,
  gameState: boolean
) => void;

const useLoadGame: IuseLoadGame = (setMyGameStats, gameState) => {
  useEffect(() => {
    const myGameStatsZ = loadGameStats();
    if (myGameStatsZ) {
      setMyGameStats(myGameStatsZ);
    }
  }, [gameState, setMyGameStats]);
};

export default useLoadGame;
