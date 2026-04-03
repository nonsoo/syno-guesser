"use client";

import { startTransition } from "react";

import Alert from "@/Components/Alert";
import EndGame from "@/Components/EndGame";
import GameStat from "@/Components/gameStats";
import MyLives from "@/Components/myLives";
import SynonymsComponent from "@/Components/Synonyms";
import styles from "@/styles/Home.module.css";

import useAlert from "@/utils/hooks/useAlert";

import { useStore } from "zustand";
import { GetGameContext } from "@/utils/context/GameContext";

interface GameProps {
  triggerWords: string[];
}

const Game = ({ triggerWords }: GameProps) => {
  const { gameStatisticsStore, gameStore } = GetGameContext();

  const myLives = useStore(gameStore, (state) => state.myLives);
  const guessLst = useStore(gameStore, (state) => state.guessLst);
  const synonyms = useStore(gameStore, (state) => state.synonyms);
  const secretWord = useStore(gameStore, (state) => state.wordOfDay);
  const gameState = useStore(gameStore, (state) => state.gameState);
  const availableHints = useStore(gameStore, (state) => state.availableHints);
  const onGuess = useStore(gameStore, (state) => state.onGuess);
  const getHint = useStore(gameStore, (state) => state.getHint);

  const myGameStats = gameStatisticsStore
    ? useStore(gameStatisticsStore, (state) => ({
        gamesPlayed: state.gamesPlayed,
        winStreak: state.winStreak,
        maxWinStreak: state.maxWinStreak,
      }))
    : null;

  const [showAlert, triggerAlert] = useAlert();

  return (
    <>
      <main className={styles.GuesserCon}>
        {gameState.status === "ended" ? (
          <>
            <EndGame
              secretWord={secretWord}
              winState={gameState.winState === "win"}
              myGuesses={guessLst}
            >
              <SynonymsComponent synos={synonyms} />
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
            <SynonymsComponent synos={synonyms} />

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
              action={(data: FormData) => {
                const myGuess = data.get("myGuess") as string;
                onGuess({ myGuess, triggerWords, action: triggerAlert });
              }}
              data-testid="formSubmit"
            >
              <label htmlFor="myGuess" className={styles.guessingLabel}>
                Enter a word
              </label>
              <input
                type="text"
                maxLength={20}
                id="myGuess"
                name="myGuess"
                className={styles.guessingForm__text_field}
                autoFocus={true}
              />
            </form>
            <section className={styles.Hints}>
              <MyLives numLives={myLives} />

              <button
                className={styles.Hints_btn}
                onClick={() => startTransition(getHint)}
                disabled={availableHints.length === 0}
              >
                New Hint
              </button>
            </section>
          </>
        )}
      </main>
      {availableHints.length === 0 && (
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
