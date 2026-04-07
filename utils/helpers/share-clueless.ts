import type { UserGuessLst } from "../types/projectTypes";

import { StoreApi } from "zustand";

import {
  shareGreenBox,
  shareRedBox,
  shareGreenWinBox,
  shareLockPen,
} from "../constants/consts";
import { GameActions, GameState } from "../store/GameStore/gameStore.types";

const generateBoxes = (guesses: UserGuessLst[], isWin: boolean) => {
  const boxes = guesses.map((guess) =>
    guess.statusColour === "hsl(111, 32%, 38%)" ? shareGreenBox : shareRedBox,
  );

  if (isWin && boxes.length >= 2) {
    return [...boxes.slice(0, -2), shareGreenWinBox].join("");
  }

  return boxes.join("");
};

export const shareClueless = (gameStore: StoreApi<GameState & GameActions>) => {
  const {
    guessLst,
    synonyms,
    gameState: { dayOfPlay, winState },
  } = gameStore.getState();

  const hasWon = winState === "win";

  const stringColours = generateBoxes(guessLst, hasWon);

  if (synonyms.length === 0)
    return `Clueless #${
      dayOfPlay
    } ${shareLockPen} \n${stringColours}\nhttps://cluelesswords.com`;

  return `Clueless #${dayOfPlay} \n${stringColours}\nhttps://cluelesswords.com`;
};
