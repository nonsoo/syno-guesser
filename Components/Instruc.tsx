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
                <p className={styles.syno__item}>hello</p>
                <p className={styles.syno__item}>there</p>
                <p className={styles.syno__item}>okay</p>
              </div>
              <p className={styles.Example__synsWord}>
                These words are your Clueless words to start.
              </p>
            </div>
            <div className={styles.Example__syns}>
              <div className={styles.Example__synsTags}>
                <p className={styles.wrongGuess}>hello</p>
                <p className={styles.wrongGuess}>there</p>
                <p className={styles.wrongGuess}>okay</p>
              </div>
              <p className={styles.Example__synsWord}>
                This word is not the secret word and is not a synonym.
              </p>
            </div>
            <div className={styles.Example__syns}>
              <div className={styles.Example__synsTags}>
                <p className={styles.inSynoLst}>hello</p>
                <p className={styles.inSynoLst}>there</p>
                <p className={styles.inSynoLst}>okay</p>
              </div>
              <p className={styles.Example__synsWord}>
                This words is not the secret word but it is a synonym.
              </p>
            </div>
          </section>

          {/* <div className={styles.ModalImg}>
            <Image
              src={Instruc_Img}
              alt="How to play the game"
              layout="responsive"
            />
          </div> */}

          <p className={styles.Modal__Text}>
            A set of clueless words will be available each day!
          </p>
        </div>
      </section>
    </section>
  );
};

export default Instruc;
