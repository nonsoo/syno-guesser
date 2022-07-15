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
        <IoClose className={styles.Modal__closeBtn} onClick={onToggle} />

        <p className={styles.Modal__Title}>Clueless Words</p>
        <div className={styles.ModalTextCon}>
          <p className={styles.Modal__Text}>
            Given 3 synonyms to a word, can you guess the secret word? Try your
            luck because you have only 6 tries!
          </p>
          <p className={styles.Modal__Text}>
            The wrong guesses will go into the guess bucket and the guesses that
            are close to the secret word will turn a warm colour.
          </p>
          <p className={styles.Modal__Text}>
            A new word will be available each day!
          </p>
        </div>
      </section>
    </section>
  );
};

export default Instruc;
