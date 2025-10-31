import type { UserGuessLst } from "../types/projectTypes";

import {
  shareGreenBox,
  shareRedBox,
  shareGreenWinBox,
  shareLockPen,
} from "../constants/consts";
import { loadGameStateFromLocalStorage } from "./saveGame";

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

export const shareClueless = () => {
  const game = loadGameStateFromLocalStorage();

  if (!game) return "";
  const stringColours = generate_boxes(game.myGuesses, game.winState);

  if (game.synonyms.length === 0)
    return `Clueless #${
      game.dayOfPlay + 1
    } ${shareLockPen} \n${stringColours}\nhttps://cluelesswords.com`;

  return `Clueless #${
    game.dayOfPlay + 1
  } \n${stringColours}\nhttps://cluelesswords.com`;
};
