import { FC } from "react";
import styles from "../styles/Instructions.module.css";
import Image from "next/image";

import Instruc_Img from "../public/example.png";

import { IoClose } from "react-icons/io5";

interface Props {
  onToggle: () => void;
}

const Instruc: FC<Props> = ({ onToggle }) => {
  return (
    <section className={styles.ModalBackground}>
      <section className={styles.Modal}>
        <IoClose className={styles.Modal__closeBtn} onClick={onToggle} />

        <p className={styles.Modal__Title}>How to play</p>
        <div className={styles.ModalTextCon}>
          <p className={styles.Modal__Text}>
            Use the <span>CLUELESS WORDS</span> to guess the{" "}
            <span>secret word</span> in only 6 tries! Clueless words are{" "}
            <span>synonyms</span> to the secret word.
          </p>
          <p className={styles.Modal__Text}>
            Wrong guesses will show up in the guess bucket! Use a hint to get a
            new synonym! But be careful because each hint uses a guess.
          </p>

          <div className={styles.ModalImg}>
            <Image
              src={Instruc_Img}
              alt="How to play the game"
              layout="responsive"
            />
          </div>

          <p className={styles.Modal__Text}>
            A new word will be available each day!
          </p>
        </div>
      </section>
    </section>
  );
};

export default Instruc;
