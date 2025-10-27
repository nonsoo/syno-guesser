import styles from "@/styles/wingame.module.css";

import { endgameProps } from "@/utils/types/projectTypes";

import Countdown from "@/Components/Countdown";

import { share_clueless } from "@/utils/helpers/share-clueless";
import useCopyToClipboard from "@/utils/hooks/use-copy-to-clipboard";
import Alert from "./Alert";

const EndGame = ({
  secretWord,
  winState,
  myGuesses,
  children,
}: endgameProps) => {
  const share_sheet = share_clueless();

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
            onClick={() => copyFn(share_sheet)}
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
