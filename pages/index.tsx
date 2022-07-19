import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import Head from "next/head";

import { BsBookHalf } from "react-icons/bs";

import { resData } from "../utils/types/projectTypes";
import WordLst from "../wordlist.json";
import axios from "axios";

import UseAlert from "../utils/hooks/useAlert";
import UseGetHint from "../utils/hooks/useGetHint";

import styles from "../styles/Home.module.css";

import EndGame from "../Components/EndGame";
import InstructionModal from "../Components/Instruc";
import Alert from "../Components/Alert";
import Synonyms from "../Components/Synonyms";
import MyLives from "../Components/myLives";
interface Props {
  data: resData[];
}

const Home: NextPage<Props> = ({ data }) => {
  const secretWord = data[0]?.meta?.id;
  const totalGuessAllowed: number = 6;

  const synonymSet: Set<number> = new Set();
  synonymSet.add(0);
  synonymSet.add(Math.ceil(data[0]?.meta.syns[0]?.length / 2));
  synonymSet.add(data[0]?.meta.syns[0]?.length - 1);

  const [myGuess, setMyGuess] = useState<string>("");
  const [synos, setSynos] = useState<string[]>(
    data[0]?.meta?.syns[0]?.length > 3
      ? [
          data[0]?.meta?.syns[0][0],
          data[0]?.meta?.syns[0][Math.ceil(data[0]?.meta.syns[0]?.length / 2)],
          data[0]?.meta?.syns[0][data[0]?.meta.syns[0]?.length - 1],
        ]
      : data[0].meta.syns[0]
  );
  const [winState, setWinState] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(false);
  const [myLives, setMyLives] = useState(totalGuessAllowed);
  const [guessLst, setGuessLst] = useState<string[]>([]);
  const [showInstruct, setShowInstruct] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [synonymSetState, setSynonymSetState] = useState(synonymSet);

  const onGetHint = () => {
    // pick a random hint and then check if the set has the hint
    // if the hint exists in the set then pick a new hints
    if (synonymSetState.size === data[0]?.meta?.syns[0]?.length) return;
    const newHint = UseGetHint(synonymSetState, data[0]?.meta?.syns[0]?.length);
    setSynonymSetState(synonymSetState.add(newHint));
    setSynos((prevState) => [...prevState, data[0]?.meta?.syns[0][newHint]]);
    setMyLives((prev) => prev - 1);

    if (myLives === 1) {
      setGameState(true);
    }
  };

  const onGuess = (e: any) => {
    e.preventDefault();

    //first check if the guess is empty or in the list of guesses
    if (myGuess === "") return;

    if (!WordLst.includes(myGuess)) {
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
    }

    if (myGuess === secretWord) {
      setWinState(true);
      setGameState(true);
    } else {
      setGuessLst((prevLst) => [...prevLst, myGuess]);
      setMyGuess("");
      setMyLives((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.mainContent}>
      <Head>
        <title>Clueless Words</title>
        <meta
          name="description"
          content="The word game that puzzles your mind with multiple words for the same/similar meaning"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <BsBookHalf
          className={styles.HeaderIcon}
          onClick={() => setShowInstruct((prev) => !prev)}
        />
      </header>

      <main className={styles.GuesserCon}>
        {gameState ? (
          <EndGame
            secretWord={secretWord}
            winState={winState}
            myGuesses={guessLst}
          >
            <Synonyms synos={synos} />
            <MyLives numLives={myLives} />
          </EndGame>
        ) : (
          <>
            <Synonyms synos={synos} />

            <section className={styles.GuessedWords}>
              {guessLst.map((word, index) => (
                <p key={index} className={styles.GuessedWords__word}>
                  {word}
                </p>
              ))}
            </section>

            <form className={styles.guessingForm} onSubmit={onGuess}>
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
      {showAlert && <Alert />}

      {showInstruct && (
        <InstructionModal onToggle={() => setShowInstruct(false)} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const randomWord = Math.floor(Math.random() * WordLst.length);

  const resData = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${WordLst[randomWord]}?key=${process.env.DICT_API_KEY}`
  );

  const resp: resData[] = resData.data;

  return {
    props: { data: resp },
  };
};
