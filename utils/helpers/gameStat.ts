import { loadGameStats, saveGameStats } from "./saveGame";

const gameStat = (offSetDate: number, playerWinState: boolean) => {
  const gameStat = loadGameStats();

  if (gameStat) {
    let gamesPlayedLst = gameStat.gamesPlayed;

    // check if the last item in the list + 1 is equal to the offset date
    // If it is then it means that the player played a game the previous day
    // then add the new date to the list
    if (gamesPlayedLst[gamesPlayedLst.length - 1] + 1 === offSetDate) {
      gamesPlayedLst.push(offSetDate);
    } else {
      gamesPlayedLst = [];
    }

    if (playerWinState) {
      gameStat.winStreak = gameStat.winStreak + 1;
    } else {
      gameStat.winStreak = 0;
    }

    if (gameStat.winStreak > gameStat.maxWinStreak) {
      gameStat.maxWinStreak = gameStat.maxWinStreak + 1;
    }

    saveGameStats({
      gamesPlayed: gamesPlayedLst,
      winStreak: gameStat.winStreak,
      maxWinStreak: gameStat.maxWinStreak,
    });
  } else {
    if (playerWinState) {
      saveGameStats({
        gamesPlayed: [offSetDate],
        winStreak: 1,
        maxWinStreak: 1,
      });
    } else {
      saveGameStats({
        gamesPlayed: [offSetDate],
        winStreak: 0,
        maxWinStreak: 0,
      });
    }
  }
};

export default gameStat;
