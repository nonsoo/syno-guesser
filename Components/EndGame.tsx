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
        <p className={styles.WinState}>Winner!!!</p>
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
      </section>
    </>
  );
};

export default EndGame;
