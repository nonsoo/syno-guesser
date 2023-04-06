import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect, useMemo } from "react";

import { BsBookHalf } from "react-icons/bs";

import styles from "../styles/Home.module.css";

import {
  resData,
  StoredGameStatistics,
  userGuessLst,
  synonyms,
  setupValues,
  triggerWord,
} from "../utils/types/projectTypes";
import wordSet from "../utils/helpers/createWordSet";
import useAlert from "../utils/hooks/useAlert";

import UseGetAllSynonyms from "../utils/hooks/useGetAllSynonyms";
import UseGetTriggerWord from "../utils/hooks/useGetTriggerWords";
import UsePromiseResolver from "../utils/hooks/usePromiseResolver";
import useOnClickOutside from "../utils/hooks/useOnClickOutsite";
import randomizeHint from "../utils/helpers/randomizeHints";

import {
  loadGameStateFromLocalStorage,
  removeGameStateFromLocalStorage,
  loadGameStats,
} from "../utils/helpers/saveGame";
import getWordOftheDay, { getOffsetDay } from "../utils/helpers/newDay";

import HeadMeta from "../Components/headTags/HeadMeta";
import EndGame from "../Components/EndGame";
import InstructionModal from "../Components/Instruc";
import Alert from "../Components/Alert";
import Synonyms from "../Components/Synonyms";
import MyLives from "../Components/myLives";
import GameStat from "../Components/gameStats";
import HowToPlay from "../Components/Modals/instructionModal";

import useGetHint from "../utils/hooks/use-get-hint";
import useOnGuess from "../utils/hooks/use-on-guess";
interface Props {
  synonyms: synonyms;
  wordOfDay: string;
  trgWords: string[];
}

const Home: NextPage<Props> = ({ synonyms, wordOfDay, trgWords }) => {
  const setUpValues: setupValues = useMemo(() => {
    const todaysDate = new Date();
    const offsetDate = getOffsetDay(todaysDate);
    const totalGuessAllowed: number = 6;

    const newRandomHints = synonyms.filter((synonym) => {
      if (
        synonym != synonyms[0] &&
        synonym != synonyms[Math.floor(synonyms.length / 2)] &&
        synonym != synonyms[synonyms.length - 1]
      )
        return [synonym];
    });

    const randomizedHints = randomizeHint(newRandomHints);

    return { offsetDate, totalGuessAllowed, randomizedHints };
  }, [synonyms]);

  const [myGuess, setMyGuess] = useState<string>("");
  const [synos, setSynos] = useState<synonyms>(
    synonyms.length > 3
      ? [
          synonyms[0],
          synonyms[Math.floor(synonyms.length / 2)],
          synonyms[synonyms.length - 1],
        ]
      : [...synonyms]
  );
  const [secretWord, setSecretWord] = useState<string>(wordOfDay);
  const [winState, setWinState] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(false);
  const [myLives, setMyLives] = useState(setUpValues.totalGuessAllowed);
  const [guessLst, setGuessLst] = useState<userGuessLst[]>([]);
  const [showInstruct, setShowInstruct] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useAlert(2500);
  const [myGameStats, setMyGameStats] = useState<StoredGameStatistics | null>(
    null
  );

  const { onGetHint } = useGetHint();
  const { onGuess } = useOnGuess();

  const refNode = useOnClickOutside(() => setShowInstruct(false));

  useEffect(() => {
    const myGameStatsZ = loadGameStats();
    if (myGameStatsZ) {
      setMyGameStats(myGameStatsZ);
    }
  }, [gameState]);

  useEffect(() => {
    const localSavedState = loadGameStateFromLocalStorage();
    const checkDate = new Date();
    const offsetDate = getOffsetDay(checkDate);
    if (localSavedState) {
      if (offsetDate !== localSavedState.dayOfPlay) {
        removeGameStateFromLocalStorage();
      } else {
        setSecretWord(localSavedState.secretWord);
        setWinState(localSavedState.winState);
        setGuessLst(localSavedState.myGuesses);
        setSynos(localSavedState.synonyms);
        setGameState(localSavedState.gameState);
        setMyLives(localSavedState.myLives);
        setShowInstruct(false);
      }
    }
  }, []);

  const trigger_Get_Hint = () => {
    onGetHint(
      setUpValues.randomizedHints,
      setSynos,
      setMyLives,
      setGameState,
      myLives,
      setUpValues.offsetDate,
      secretWord,
      winState,
      guessLst,
      synos
    );
  };

  const trigger_On_Guess = (e: any) => {
    onGuess(
      e,
      myGuess,
      wordSet,
      trgWords,
      synonyms,
      secretWord,
      winState,
      myLives,
      guessLst,
      synos,
      setUpValues.offsetDate,
      setMyGuess,
      setGameState,
      setWinState,
      setGuessLst,
      setMyLives,
      setShowAlert
    );
  };

  return (
    <div className={styles.mainContent}>
      <HeadMeta />

      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <BsBookHalf
          className={styles.HeaderIcon}
          onClick={() => setShowInstruct((prev) => !prev)}
        />
      </header>

      <main className={styles.GuesserCon}>
        {gameState ? (
          <>
            <EndGame
              secretWord={secretWord}
              winState={winState}
              myGuesses={guessLst}
            >
              <Synonyms synos={synos} />
              <MyLives numLives={myLives} />
            </EndGame>
            <GameStat
              gamesPlayed={myGameStats?.gamesPlayed}
              winStreak={myGameStats?.winStreak}
              maxWinStreak={myGameStats?.maxWinStreak}
            />
          </>
        ) : (
          <>
            <Synonyms synos={synos} />

            <section className={styles.GuessedWords}>
              {guessLst.map((word) => (
                <p
                  key={word.id}
                  className={styles.GuessedWords__word}
                  style={{ backgroundColor: word.statusColour }}
                  data-testid="GuessedWord"
                >
                  {word.word}
                </p>
              ))}
            </section>
            <div className={styles.AlertContainer}>
              {showAlert && <Alert />}
            </div>
            <form
              className={styles.guessingForm}
              onSubmit={trigger_On_Guess}
              data-testid="formSubmit"
            >
              <label htmlFor="myGuess" className={styles.guessingLabel}>
                Enter a word
              </label>
              <input
                type="text"
                value={myGuess}
                maxLength={20}
                id="myGuess"
                className={styles.guessingForm__text_field}
                onChange={(e) => setMyGuess(e.target.value)}
                autoFocus={true}
              />
            </form>
            <section className={styles.Hints}>
              <MyLives numLives={myLives} />

              <button
                className={styles.Hints_btn}
                onClick={trigger_Get_Hint}
                disabled={
                  setUpValues.randomizedHints.length === 0 ? true : false
                }
              >
                New Hint
              </button>
            </section>
          </>
        )}
      </main>

      {synonyms.length === 0 && (
        <p className={styles.Disclamer}>
          Looks like the secret word today does not have any synonyms. You can
          try your luck to guess the word unaided or come back tomorrow for a
          new word.
        </p>
      )}

      {showInstruct && (
        <InstructionModal onToggle={() => setShowInstruct(false)} ref={refNode}>
          <HowToPlay />
        </InstructionModal>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const wordOfDay = getWordOftheDay();

  try {
    const resData = await UsePromiseResolver(wordOfDay);

    if (typeof resData[0][0] === "string") {
      const synonyms: string[] = [];
      let trgWords: string[] = [];

      if (resData[1].length != 0) {
        trgWords = UseGetTriggerWord(resData[1]);
      }

      return {
        props: { synonyms, wordOfDay, trgWords },
      };
    }

    const resp: resData[] = resData[0];
    const trgWordResp: triggerWord[] = resData[1];

    const cleanData = resp.filter((obj) => obj?.meta?.id === wordOfDay);

    const synonyms = UseGetAllSynonyms(cleanData);

    const trgWords = UseGetTriggerWord(trgWordResp);

    return {
      props: { synonyms, wordOfDay, trgWords },
    };
  } catch {
    const synonyms: string[] = [];
    const trgWords: string[] = [];

    return {
      props: { synonyms, wordOfDay, trgWords },
    };
  }
};
