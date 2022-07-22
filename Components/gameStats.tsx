import { FC } from "react";

import styles from "../styles/gameStats.module.css";

interface Props {
  gamesPlayed: number[] | undefined;
  winStreak: number | undefined;
  maxWinStreak: number | undefined;
}

const GameStats: FC<Props> = ({ gamesPlayed, winStreak, maxWinStreak }) => {
  return (
    <section className={styles.gameStatCon}>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>{gamesPlayed?.length}</p>
        <p className={styles.gameStat_Title}>Games Played</p>
      </div>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>{winStreak}</p>
        <p className={styles.gameStat_Title}>Current Win Streak</p>
      </div>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>{maxWinStreak}</p>
        <p className={styles.gameStat_Title}>Max Win Streak</p>
      </div>
    </section>
  );
};

export default GameStats;
