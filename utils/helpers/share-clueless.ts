import { userGuessLst } from "../types/projectTypes";
import {
  share_red_box,
  share_green_box,
  share_green_win_box,
  share_lock_pen,
} from "../constants/consts";

import { loadGameStateFromLocalStorage } from "./saveGame";

const generate_boxes = (guess_lst: userGuessLst[], win_state: boolean) => {
  let square_colours_string = "";

  guess_lst.forEach((guess) => {
    if (guess.statusColour === "hsl(111, 32%, 38%)") {
      // green
      square_colours_string += share_green_box;
    } else {
      //red
      square_colours_string += share_red_box;
    }
  });

  if (win_state) {
    const temp = square_colours_string.split("");
    temp.pop();
    temp.pop();
    square_colours_string = temp.join("");

    square_colours_string += share_green_win_box;
  }

  return square_colours_string;
};

export const share_clueless = () => {
  const game = loadGameStateFromLocalStorage();

  if (!game) return "";
  const string_colours = generate_boxes(game.myGuesses, game.winState);

  if (game.synonyms.length === 0)
    return `Clueless #${
      game.dayOfPlay + 1
    } ${share_lock_pen} \n${string_colours}\nhttps://cluelesswords.com`;

  return `Clueless #${
    game.dayOfPlay + 1
  } \n${string_colours}\nhttps://cluelesswords.com`;
};
