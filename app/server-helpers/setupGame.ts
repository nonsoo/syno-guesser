import { isToday } from "date-fns";

import generateInitialSynonymsList from "@/utils/helpers/get-initial-synonyms-lst";
import randomizeHint from "@/utils/helpers/randomizeHints";
import { GameState } from "@/utils/store/GameStore/gameStore.types";

import { getWordOfTheDay } from "./getWord";

export const setupGame = async (date: Date) => {
  const words = await getWordOfTheDay(date);

  const initialSynonyms = generateInitialSynonymsList(words.synonyms);
  const availableHints = randomizeHint(
    words.synonyms.filter((synonym) => !initialSynonyms.includes(synonym)),
  );

  const initialState = {
    wordOfDay: words.wordOfDay.trim().toLowerCase(),
    availableHints,
    myLives: 6,
    guessLst: [],
    synonyms: initialSynonyms,
    gameState: {
      status: "in-progress",
      winState: "none",
      dayOfPlay: words.offsetDate,
    },
    archivedGame: !isToday(date),
  } satisfies GameState;

  return {
    initialState,
    triggerWords: words.trgWords,
  };
};
