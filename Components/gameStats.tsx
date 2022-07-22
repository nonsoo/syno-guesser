import { FC } from "react";

import styles from "../styles/gameStats.module.css";

const GameStats: FC = () => {
  return (
    <section className={styles.gameStatCon}>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>1</p>
        <p className={styles.gameStat_Title}>Games Played</p>
      </div>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>2</p>
        <p className={styles.gameStat_Title}>Current Win Streak</p>
      </div>
      <div className={styles.gameStat}>
        <p className={styles.gameStat__Stat}>3</p>
        <p className={styles.gameStat_Title}>Max Win Streak</p>
      </div>
    </section>
  );
};

export default GameStats;
