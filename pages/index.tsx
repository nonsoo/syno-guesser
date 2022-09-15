import type { NextPage, GetServerSideProps } from "next";
import { useState, useEffect, useMemo } from "react";

import { BsBookHalf } from "react-icons/bs";

import axios from "axios";
import styles from "../styles/Home.module.css";

import {
  resData,
  StoredGameStatistics,
  synonyms,
  setupValues,
} from "../utils/types/projectTypes";
import wordSet from "../utils/helpers/createWordSet";
import UseAlert from "../utils/hooks/useAlert";
import UseGetHint from "../utils/hooks/useGetHint";
import UseGetAllSynonyms from "../utils/hooks/useGetAllSynonyms";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  removeGameStateFromLocalStorage,
  loadGameStats,
} from "../utils/helpers/saveGame";
import getWordOftheDay, { getOffsetDay } from "../utils/helpers/newDay";
import gameStateFunc from "../utils/helpers/gameStat";

import HeadMeta from "../Components/headTags/HeadMeta";
import EndGame from "../Components/EndGame";
import InstructionModal from "../Components/Instruc";
import Alert from "../Components/Alert";
import Synonyms from "../Components/Synonyms";
import MyLives from "../Components/myLives";
import GameStat from "../Components/gameStats";
import HowToPlay from "../Components/Modals/instructionModal";

interface Props {
  synonyms: synonyms;
  wordOfDay: string;
}

const Home: NextPage<Props> = ({ synonyms, wordOfDay }) => {
  const setUpValues: setupValues = useMemo(() => {
    const todaysDate = new Date();
    const offsetDate = getOffsetDay(todaysDate);
    const totalGuessAllowed: number = 6;
    const synonymSet: Set<number> = new Set();

    synonymSet.add(0);
    synonymSet.add(Math.ceil(synonyms.length / 2));
    synonymSet.add(synonyms.length - 1);

    return { offsetDate, totalGuessAllowed, synonymSet };
  }, [synonyms]);

  const [myGuess, setMyGuess] = useState<string>("");
  const [synos, setSynos] = useState<synonyms>(
    synonyms.length > 3
      ? [
          synonyms[0],
          synonyms[Math.ceil(synonyms.length / 2)],
          synonyms[synonyms.length - 1],
        ]
      : [...synonyms]
  );
  const [secretWord, setSecretWord] = useState<string>(wordOfDay);
  const [winState, setWinState] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(false);
  const [myLives, setMyLives] = useState(setUpValues.totalGuessAllowed);
  const [guessLst, setGuessLst] = useState<string[]>([]);
  const [showInstruct, setShowInstruct] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [synonymSetState, setSynonymSetState] = useState(
    setUpValues.synonymSet
  );
  const [myGameStats, setMyGameStats] = useState<StoredGameStatistics | null>(
    null
  );

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

  const onGetHint = () => {
    // pick a random hint and then check if the set has the hint
    // if the hint exists in the set then pick a new hints
    if (synonymSetState.size === synonyms.length) return;
    const newHint = UseGetHint(synonymSetState, synonyms.length);
    setSynonymSetState(synonymSetState.add(newHint));
    setSynos((prevState) => [...prevState, synonyms[newHint]]);
    setMyLives((prev) => prev - 1);

    if (myLives === 1) {
      setGameState(true);
      saveGameStateToLocalStorage({
        secretWord: secretWord,
        winState: winState,
        myGuesses: guessLst,
        synonyms: synos,
        gameState: true,
        myLives: myLives - 1,
        dayOfPlay: setUpValues.offsetDate,
      });
      gameStateFunc(setUpValues.offsetDate, false);
    }
  };

  const onGuess = (e: any) => {
    e.preventDefault();

    //first check if the guess is empty or in the list of guesses
    if (myGuess === "") return;

    // check if the guess is in the word lst
    if (!wordSet.has(myGuess.toLowerCase())) {
      setMyGuess("");
      setShowAlert(true);
      UseAlert(2500, () => setShowAlert(false));
      return;
    }

    // if above checks pass then check the number of guesses has
    // reached the limit
    // if not check if the guess is equal to the secret word and add it to
    // the list of guesses.

    if (myLives === 1) {
      setGameState(true);
      saveGameStateToLocalStorage({
        secretWord: secretWord,
        winState: winState,
        myGuesses: guessLst,
        synonyms: synos,
        gameState: true,
        myLives: myLives - 1,
        dayOfPlay: setUpValues.offsetDate,
      });
      gameStateFunc(setUpValues.offsetDate, false);
    }

    if (myGuess.toLowerCase() === secretWord) {
      setWinState(true);
      setGameState(true);
      saveGameStateToLocalStorage({
        secretWord: secretWord,
        winState: true,
        myGuesses: guessLst,
        synonyms: synos,
        gameState: true,
        myLives: myLives,
        dayOfPlay: setUpValues.offsetDate,
      });
      gameStateFunc(setUpValues.offsetDate, true);
    } else {
      setGuessLst((prevLst) => [...prevLst, myGuess]);
      setMyGuess("");
      setMyLives((prev) => prev - 1);
    }
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
              {guessLst.map((word, index) => (
                <p
                  key={index}
                  className={styles.GuessedWords__word}
                  data-testid="GuessedWord"
                >
                  {word}
                </p>
              ))}
            </section>
            <div className={styles.AlertContainer}>
              {showAlert && <Alert />}
            </div>
            <form
              className={styles.guessingForm}
              onSubmit={onGuess}
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

              <button className={styles.Hints_btn} onClick={() => onGetHint()}>
                New Hint
              </button>
            </section>
          </>
        )}
      </main>

      {showInstruct && (
        <InstructionModal onToggle={() => setShowInstruct(false)}>
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

  const resData = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${wordOfDay}?key=${process.env.DICT_API_KEY}`
  );

  const resp: resData[] = resData.data;

  const synonyms = UseGetAllSynonyms(resp[0]?.meta?.syns);

  return {
    props: { synonyms, wordOfDay },
  };
};
