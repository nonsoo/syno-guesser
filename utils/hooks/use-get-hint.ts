import { useCallback } from "react";
import { IonGetHint } from "../types/projectTypes";
import { newRandomHint } from "../hooks/useGetHint";
import { saveGameStateToLocalStorage } from "../helpers/saveGame";
import gameStateFunc from "../helpers/gameStat";

const useGetHint = () => {
  const onGetHint: IonGetHint = useCallback(
    (
      lst_of_random_synonyms,
      setSynos,
      setMyLives,
      setGameState,
      myLives,
      offsetDate,
      secretWord,
      winState,
      guessLst,
      synos
    ) => {
      // pick a random hint and then check if the set has the hint
      // if the hint exists in the set then pick a new hints
      const newRandomHints = newRandomHint(lst_of_random_synonyms);

      if (!newRandomHints) return;

      setSynos((prevState) => [...prevState, newRandomHints]);
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
          dayOfPlay: offsetDate,
        });
        gameStateFunc(offsetDate, false);
      }
    },
    []
  );

  return { onGetHint };
};

export default useGetHint;
