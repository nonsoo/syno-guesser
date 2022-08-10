import { FC } from "react";
import styles from "../styles/wingame.module.css";

import { endgameProps } from "../utils/types/projectTypes";

const EndGame: FC<endgameProps> = ({
  secretWord,
  winState,
  myGuesses,
  children,
}) => {
  return (
    <>
      {winState ? (
        <div className={styles.WinState} data-testid="winState">
          <p className={styles.WinState_letter}>w</p>
          <p className={styles.WinState_letter}>i</p>
          <p className={styles.WinState_letter}>n</p>
          <p className={styles.WinState_letter}>n</p>
          <p className={styles.WinState_letter}>e</p>
          <p className={styles.WinState_letter}>r</p>
          <p className={styles.WinState_letter}>!</p>
        </div>
      ) : (
        <p className={styles.WinState}>Better luck next time!</p>
      )}
      <section className={styles.EndGame}>
        <p className={styles.EndGame__Secret}>{secretWord}</p>
        <div className={styles.EndGame__Synonyms}>{children}</div>

        <p className={styles.EndGame__guessnum}> Guesses: {myGuesses.length}</p>
        <div className={styles.MyGuessCon}>
          {myGuesses.map((guess, index) => (
            <p key={index}>{guess}</p>
          ))}
        </div>
        <p className={styles.checkBack}>Check back tomorrow for a new word!</p>
      </section>
    </>
  );
};

export default EndGame;
