import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import Head from "next/head";

import { resData } from "../utils/types/projectTypes";
import WordLst from "../wordlist.json";
import axios from "axios";

import styles from "../styles/Home.module.css";

import EndGame from "../Components/EndGame";
import InstructionModal from "../Components/Instruc";
interface Props {
  data: resData[];
}

const Home: NextPage<Props> = ({ data }) => {
  console.log(data);
  const secretWord = data[0]?.meta?.id;

  const synos =
    data[0]?.meta?.syns[0]?.length > 3
      ? [
          data[0]?.meta?.syns[0][0],
          data[0]?.meta?.syns[0][Math.ceil(data[0]?.meta.syns[0]?.length / 2)],
          data[0]?.meta?.syns[0][data[0]?.meta.syns[0]?.length - 1],
        ]
      : data[0].meta.syns[0];

  const [myGuess, setMyGuess] = useState<string>("");
  const [winState, setWinState] = useState<boolean>(false);
  const [gameState, setGameState] = useState<boolean>(false);
  const [numGuess, setNumGuess] = useState<number>(1);
  const [guessLst, setGuessLst] = useState<string[]>([]);
  const [showInstruct, setShowInstruct] = useState<boolean>(true);
  const onGuess = (e: any) => {
    e.preventDefault();
    if (myGuess === "") return;

    if (!WordLst.includes(myGuess)) return;

    if (numGuess === 6) {
      setGameState(true);
    }

    if (myGuess === secretWord) {
      setNumGuess((prev) => prev + 1);
      setWinState(true);
    } else {
      setNumGuess((prev) => prev + 1);
      setGuessLst((prevLst) => [...prevLst, myGuess]);
      setMyGuess("");
    }
  };

  return (
    <div className={styles.mainContent}>
      <Head>
        <title>Même Guesser</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.HeaderCon}>
        <h1>Même Guesser</h1>
      </header>

      <main className={styles.GuesserCon}>
        {gameState || winState ? (
          <EndGame
            secretWord={secretWord}
            numGuesses={numGuess - 1}
            def={data[0].shortdef}
            winState={winState}
          />
        ) : (
          <>
            <section className={styles.syno}>
              {synos.map((syno, index) => (
                <p key={index} className={styles.syno__item}>
                  {syno}
                </p>
              ))}
            </section>

            <section className={styles.GuessedWords}>
              {guessLst.map((word, index) => (
                <p key={index} className={styles.GuessedWords__word}>
                  {word}
                </p>
              ))}
            </section>

            <form className={styles.guessingForm} onSubmit={onGuess}>
              <input
                type="text"
                value={myGuess}
                maxLength={20}
                className={styles.guessingForm__text_field}
                onChange={(e) => setMyGuess(e.target.value)}
                placeholder="enter a word"
              />
            </form>
          </>
        )}
      </main>

      {showInstruct && (
        <InstructionModal onToggle={() => setShowInstruct(false)} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const randomWord = Math.floor(Math.random() * WordLst.length);
  console.log(randomWord);

  const resData = await axios.get(
    `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${WordLst[randomWord]}?key=${process.env.DICT_API_KEY}`
  );

  const resp: resData[] = resData.data;

  return {
    props: { data: resp },
  };
};
