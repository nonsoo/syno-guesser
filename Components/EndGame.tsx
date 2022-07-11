import { FC } from "react";
import styles from "../styles/wingame.module.css";

import { endgameProps } from "../utils/types/projectTypes";

const EndGame: FC<endgameProps> = ({
  secretWord,
  numGuesses,
  def,
  winState,
  myGuesses,
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
        <div className={styles.defContent}>
          {def.map((definition, index) => (
            <p key={index} className={styles.EndGame__defin}>
              {`${index + 1}) ${definition}`}
            </p>
          ))}
        </div>
        <p className={styles.EndGame__guessnum}> Guesses: {numGuesses}</p>
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
