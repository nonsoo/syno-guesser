import Link from "next/link";

import Countdown from "@/Components/Countdown";
import styles from "@/styles/wingame.module.css";
import { CLUELESS_ARCHIVE_MODAL_ID } from "@/utils/constants/id-constants";
import { GetGameContext } from "@/utils/context/GameContext";
import { shareClueless } from "@/utils/helpers/share-clueless";
import useCopyToClipboard from "@/utils/hooks/use-copy-to-clipboard";
import { EndgameProps } from "@/utils/types/projectTypes";

import Alert from "../../Components/Alert";
import GameStats from "../../Components/gameStats";

const EndGame = ({
  secretWord,
  winState,
  myGuesses,
  gamesPlayed,
  maxWinStreak,
  winStreak,
  archivedGame,
  children,
}: EndgameProps) => {
  const { gameStore } = GetGameContext();
  const shareSheet = shareClueless(gameStore);

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
        {!archivedGame && (
          <>
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
          </>
        )}
      </section>
      {!archivedGame && (
        <GameStats
          gamesPlayed={gamesPlayed}
          winStreak={winStreak}
          maxWinStreak={maxWinStreak}
        />
      )}

      {archivedGame && (
        <section>
          <button
            popoverTarget={CLUELESS_ARCHIVE_MODAL_ID}
            popoverTargetAction="toggle"
            className={styles.PlayTodayBtn}
          >
            Another Archived Challenge
          </button>
          <Link href="/" className={styles.PlayTodayBtn}>
            Play todays Game
          </Link>
        </section>
      )}
    </>
  );
};

export default EndGame;
