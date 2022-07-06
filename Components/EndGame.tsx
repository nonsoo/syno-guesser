import { FC } from "react";
import styles from "../styles/wingame.module.css";

interface Props {
  secretWord: string;
  numGuesses: number;
}

const EndGame: FC<Props> = ({ secretWord, numGuesses }) => {
  return (
    <section className={styles.EndGame}>
      <p className={styles.EndGame__Secret}>{secretWord}</p>
      <p className={styles.EndGame__guessnum}> Guesses: {numGuesses}</p>
    </section>
  );
};

export default EndGame;
