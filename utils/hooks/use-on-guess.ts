import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import gameStateFunc from "../helpers/gameStat";
import { saveGameStateToLocalStorage } from "../helpers/saveGame";
import setSynBackgroundCol from "../helpers/setSynBackgroundCol";
import { IonGuess, FindInArray } from "../types/projectTypes";

const useOnGuess = () => {
  const is_guess_in_word_lst: FindInArray = useCallback(
    (wordSet, myGuess, trgWords, synonyms) => {
      if (
        !wordSet.has(myGuess.toLowerCase()) &&
        !trgWords.includes(myGuess.toLowerCase()) &&
        !synonyms.includes(myGuess.toLowerCase())
      )
        return true;

      return false;
    },
    []
  );
  const onGuess: IonGuess = useCallback(
    (
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
    ) => {
      e.preventDefault();

      //first check if the guess is empty or in the list of guesses
      if (myGuess === "") return;

      // check if the guess is in the word lst
      if (is_guess_in_word_lst(wordSet, myGuess, trgWords, synonyms)) {
        setMyGuess("");
        setShowAlert();
        return;
      }

      // check if guess is correct or not so that we can set the background color
      const synonymBackgroudColVar = setSynBackgroundCol(
        myGuess,
        trgWords,
        synonyms,
        secretWord
      );

      // if above checks pass then check the number of guesses has
      // reached the limit
      // if not check if the guess is equal to the secret word and add it to
      // the list of guesses.
      if (myLives === 1) {
        setGameState(true);
        saveGameStateToLocalStorage({
          secretWord: secretWord,
          winState: winState,
          myGuesses: [
            ...guessLst,
            {
              id: uuidv4(),
              word: myGuess,
              statusColour: synonymBackgroudColVar,
            },
          ],
          synonyms: synos,
          gameState: true,
          myLives: myLives - 1,
          dayOfPlay: offsetDate,
        });
        gameStateFunc(offsetDate, false);
      }

      if (myGuess.toLowerCase() === secretWord) {
        setWinState(true);
        setGameState(true);
        saveGameStateToLocalStorage({
          secretWord: secretWord,
          winState: true,
          myGuesses: [
            ...guessLst,
            {
              id: uuidv4(),
              word: myGuess,
              statusColour: synonymBackgroudColVar,
            },
          ],
          synonyms: synos,
          gameState: true,
          myLives: myLives,
          dayOfPlay: offsetDate,
        });

        setGuessLst((prevLst) => [
          ...prevLst,
          {
            id: uuidv4(),
            word: myGuess,
            statusColour: synonymBackgroudColVar,
          },
        ]);
        gameStateFunc(offsetDate, true);
      } else {
        setGuessLst((prevLst) => [
          ...prevLst,
          { id: uuidv4(), word: myGuess, statusColour: synonymBackgroudColVar },
        ]);
        setMyGuess("");
        setMyLives((prev) => prev - 1);
      }
    },
    [is_guess_in_word_lst]
  );

  return { onGuess };
};

export default useOnGuess;
