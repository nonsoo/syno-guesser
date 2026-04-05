import cx from "clsx";

import MyLives from "@/Components/myLives";
import styles from "@/styles/Home.module.css";

const ArchivedGameLoadingFallback = () => {
  return (
    <section className={cx([styles.GuesserCon, styles["GuesserCon--loading"]])}>
      <section className={styles.syno}>
        <p
          className={cx([styles.syno__item, styles["syno__item--loading"]])}
          data-testid="synos"
        ></p>
        <p
          className={cx([styles.syno__item, styles["syno__item--loading"]])}
          data-testid="synos"
        ></p>
        <p
          className={cx([styles.syno__item, styles["syno__item--loading"]])}
          data-testid="synos"
        ></p>
      </section>

      <section className={styles.GuessedWords}></section>
      <div className={styles.AlertContainer}></div>
      <form className={styles.guessingForm} data-testid="formSubmit">
        <label htmlFor="myGuess" className={styles.guessingLabel}>
          Enter a word
        </label>
        <input
          type="text"
          maxLength={20}
          id="myGuess"
          name="myGuess"
          className={styles.guessingForm__text_field}
          disabled
        />
      </form>
      <section className={styles.Hints}>
        <MyLives numLives={6} />

        <button className={styles.Hints_btn} disabled>
          New Hint
        </button>
      </section>
    </section>
  );
};

export default ArchivedGameLoadingFallback;
