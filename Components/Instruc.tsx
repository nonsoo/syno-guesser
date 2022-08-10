import { FC } from "react";
import styles from "../styles/Instructions.module.css";

import { IoClose } from "react-icons/io5";

interface Props {
  onToggle: () => void;
}

const Instruc: FC<Props> = ({ onToggle }) => {
  return (
    <section className={styles.ModalBackground}>
      <section className={styles.Modal}>
        <IoClose
          className={styles.Modal__closeBtn}
          onClick={onToggle}
          data-testid="instruct_Close_btn"
        />

        <p className={styles.Modal__Title}>How to play</p>
        <div className={styles.ModalTextCon}>
          <p className={styles.Modal__Text}>
            Use the <span>CLUELESS WORDS</span> to find the{" "}
            <span>secret word</span> in only 6 tries! The clueless words are{" "}
            <span>synonyms</span> to the secret word.
          </p>
          <p className={styles.Modal__Text}>
            Wrong guesses will show up in the guess bucket! Use a hint to get a
            new synonym! But be careful because each hint uses a guess.
          </p>

          <section className={styles.Modal__Example}>
            <p className={styles.ExamplesTitle}>Examples</p>
            <div className={styles.Example__syns}>
              <div className={styles.Example__synsTags}>
                <p className={styles.syno__item}>Novel</p>
                <p className={styles.syno__item}>Fiction</p>
                <p className={styles.syno__item}>Softcover</p>
              </div>
              <p className={styles.Example__synsWord}>
                Your starting Clueless Words (synonyms to the secret word)
              </p>
            </div>
            <div className={styles.Example__syns}>
              <div className={styles.Example__synsTags}>
                <p className={styles.wrongGuess}>Read</p>
                <p className={styles.wrongGuess}>Play</p>
                <p className={styles.wrongGuess}>Picture</p>
              </div>
              <p className={styles.Example__synsWord}>
                Wrong guesses are in red and will appear in the guess bucket
              </p>
            </div>
            <div className={styles.secretWord}>
              <p className={styles.secretWord_Word}>Book</p>
              <p className={styles.secretWord_WordInstuctions}>
                The secret word will be revealed to you at the end
              </p>
            </div>
          </section>
          <p className={styles.Modal__Text}>
            A new set of clueless words will be available each day!
          </p>
        </div>
      </section>
    </section>
  );
};

export default Instruc;
