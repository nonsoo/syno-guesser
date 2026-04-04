export interface GameStatisticsState {
  lastOffSetDate: number;
  gamesPlayed: number;
  winStreak: number;
  maxWinStreak: number;
}

export interface GameStatisticsActions {
  setGameStatistics: (hasWon: boolean, offsetDate: number) => void;
}
