"use client";

import { useState, useEffect } from "react";

import styles from "@/styles/Home.module.css";

import wordSet from "@/utils/helpers/createWordSet";
import useAlert from "@/utils/hooks/useAlert";

import useOnClickOutside from "@/utils/hooks/useOnClickOutsite";
import useGetHint from "@/utils/hooks/use-get-hint";
import useOnGuess from "@/utils/hooks/use-on-guess";
import useSetupValues from "@/utils/hooks/use-setup-values";
import get_initial_synonyms_lst from "@/utils/helpers/get-initial-synonyms-lst";

import {
  loadGameStateFromLocalStorage,
  removeGameStateFromLocalStorage,
  loadGameStats,
} from "@/utils/helpers/saveGame";
import { getOffsetDay } from "@/utils/helpers/newDay";

import EndGame from "@/Components/EndGame";
import InstructionModal from "@/Components/Instruc";
import Alert from "@/Components/Alert";
import Synonyms from "@/Components/Synonyms";
import MyLives from "@/Components/myLives";
import GameStat from "@/Components/gameStats";
import HowToPlay from "@/Components/Modals/instructionModal";
import {
  StoredGameStatistics,
  synonyms,
  userGuessLst,
} from "@/utils/types/projectTypes";

interface GameProps {
  synonyms: string[];
  wordOfDay: string;
  trgWords: string[];
}

const Game = ({ synonyms, trgWords, wordOfDay }: GameProps) => {
  const setUpValues = useSetupValues(synonyms);
  const [myGuess, setMyGuess] = useState<string>("");
  const [synos, setSynos] = useState<synonyms>(() =>
    get_initial_synonyms_lst(synonyms)
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
    <>
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
    </>
  );
};

export default Game;
