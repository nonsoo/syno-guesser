import Countdown from "@/Components/Countdown";
import { shareClueless } from "@/utils/helpers/share-clueless";
import useCopyToClipboard from "@/utils/hooks/use-copy-to-clipboard";
import { EndgameProps } from "@/utils/types/projectTypes";

import Alert from "./Alert";

import styles from "@/styles/wingame.module.css";

const EndGame = ({
  secretWord,
  winState,
  myGuesses,
  children,
}: EndgameProps) => {
  const shareSheet = shareClueless();

  const [result, copyFn] = useCopyToClipboard();

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
        <p className={styles.WinState} data-testid="loseState">
          Better luck next time!
        </p>
      )}
      <section className={styles.EndGame}>
        <p className={styles.EndGame__Secret}>{secretWord}</p>
        <div className={styles.EndGame__Synonyms}>{children}</div>

        <div className={styles.MyGuessCon}>
          {myGuesses.map((guess) => (
            <p
              key={guess.id}
              data-testid="guessEntered"
              style={{ backgroundColor: guess.statusColour }}
              className={styles.guessedWord}
            >
              {guess.word}
            </p>
          ))}
        </div>
        <Countdown />
        <div className={styles.shareBtn__con}>
          <button
            className={styles.shareScore}
            onClick={() => copyFn(shareSheet)}
          >
            Share my score
          </button>
          {result && (
            <div className={styles.AlertCon}>
              <Alert notification="Copied" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EndGame;
