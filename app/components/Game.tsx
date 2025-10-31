"use client";

import type {
  StoredGameStatistics,
  Synonyms,
  UserGuessLst,
} from "@/utils/types/projectTypes";

import { useState, useEffect, Suspense } from "react";

import Alert from "@/Components/Alert";
import EndGame from "@/Components/EndGame";
import GameStat from "@/Components/gameStats";
import MyLives from "@/Components/myLives";
import SynonymsComponent from "@/Components/Synonyms";
import wordSet from "@/utils/helpers/createWordSet";
import get_initial_synonyms_lst from "@/utils/helpers/get-initial-synonyms-lst";
import {
  loadGameStateFromLocalStorage,
  removeGameStateFromLocalStorage,
  loadGameStats,
} from "@/utils/helpers/saveGame";
import useGetHint from "@/utils/hooks/use-get-hint";
import useOnGuess from "@/utils/hooks/use-on-guess";
import useSetupValues from "@/utils/hooks/use-setup-values";
import useAlert from "@/utils/hooks/useAlert";

import styles from "@/styles/Home.module.css";

interface GameProps {
  synonyms: string[];
  wordOfDay: string;
  trgWords: string[];
  offsetDate: number;
}

const Game = ({ synonyms, trgWords, wordOfDay, offsetDate }: GameProps) => {
  const setUpValues = useSetupValues(synonyms);
  const [myGuess, setMyGuess] = useState<string>("");
  const [synos, setSynos] = useState<Synonyms>(() =>
    get_initial_synonyms_lst(synonyms)
  );
  const [secretWord, setSecretWord] = useState<string>(wordOfDay);
  const [winState, setWinState] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(false);
  const [myLives, setMyLives] = useState(setUpValues.totalGuessAllowed);
  const [guessLst, setGuessLst] = useState<UserGuessLst[]>([]);
  const [showAlert, setShowAlert] = useAlert(2500);
  const [myGameStats, setMyGameStats] = useState<StoredGameStatistics | null>(
    null
  );

  const { onGetHint } = useGetHint();
  const { onGuess } = useOnGuess();

  useEffect(() => {
    const myGameStatsZ = loadGameStats();
    if (myGameStatsZ) {
      setMyGameStats(myGameStatsZ);
    }
  }, [gameState]);

  useEffect(() => {
    const localSavedState = loadGameStateFromLocalStorage();
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
      offsetDate,
      secretWord,
      winState,
      guessLst,
      synos
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      offsetDate,
      setMyGuess,
      setGameState,
      setWinState,
      setGuessLst,
      setMyLives,
      setShowAlert
    );
  };
  return (
    <>
      <main className={styles.GuesserCon}>
        {gameState ? (
          <>
            <EndGame
              secretWord={secretWord}
              winState={winState}
              myGuesses={guessLst}
            >
              <SynonymsComponent synos={synos} />
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
            <SynonymsComponent synos={synos} />

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
              {showAlert && <Alert notification="Not in word list" />}
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

              <Suspense>
                <button
                  className={styles.Hints_btn}
                  onClick={trigger_Get_Hint}
                  disabled={setUpValues.randomizedHints.length === 0}
                >
                  New Hint
                </button>
              </Suspense>
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
    </>
  );
};

export default Game;
