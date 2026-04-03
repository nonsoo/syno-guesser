import type { UserGuessLst } from "../types/projectTypes";

import {
  shareGreenBox,
  shareRedBox,
  shareGreenWinBox,
  shareLockPen,
} from "../constants/consts";
import { GameActions, GameState } from "../store/GameStore/gameStore.types";
import { StoreApi } from "zustand";

const generate_boxes = (guess_lst: UserGuessLst[], win_state: boolean) => {
  let squareColours = "";

  guess_lst.forEach((guess) => {
    if (guess.statusColour === "hsl(111, 32%, 38%)") {
      // green
      squareColours += shareGreenBox;
    } else {
      //red
      squareColours += shareRedBox;
    }
  });

  if (win_state) {
    const temp = squareColours.split("");
    temp.pop();
    temp.pop();
    squareColours = temp.join("");

    squareColours += shareGreenWinBox;
  }

  return squareColours;
};

export const shareClueless = (gameStore: StoreApi<GameState & GameActions>) => {
  const guessLst = gameStore.getState().guessLst;
  const winState = gameStore.getState().gameState.winState === "win";

  const stringColours = generate_boxes(guessLst, winState);

  const dayOfPlay = gameStore.getState().gameState.dayOfPlay;
  const synonyms = gameStore.getState().synonyms;

  if (synonyms.length === 0)
    return `Clueless #${
      dayOfPlay
    } ${shareLockPen} \n${stringColours}\nhttps://cluelesswords.com`;

  return `Clueless #${dayOfPlay} \n${stringColours}\nhttps://cluelesswords.com`;
};
