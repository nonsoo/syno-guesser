import { useEffect, SetStateAction } from "react";

import { loadGameStats } from "../helpers/saveGame";
import { StoredGameStatistics } from "../types/projectTypes";

type SetState<T> = (value: SetStateAction<T>) => void;

type UseLoadGame = (
  setMyGameStats: SetState<StoredGameStatistics>,
  gameState: boolean
) => void;

const useLoadGame: UseLoadGame = (setMyGameStats, gameState) => {
  useEffect(() => {
    const myGameStatsZ = loadGameStats();
    if (myGameStatsZ) {
      setMyGameStats(myGameStatsZ);
    }
  }, [gameState, setMyGameStats]);
};

export default useLoadGame;
