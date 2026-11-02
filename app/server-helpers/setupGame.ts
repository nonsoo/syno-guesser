import type { WordListTheme } from "@/utils/types/projectTypes";

import { GAME_TIME_ZONE } from "@/utils/helpers/dates";
import generateInitialSynonymsList from "@/utils/helpers/get-initial-synonyms-lst";
import randomizeHint from "@/utils/helpers/randomizeHints";
import { GameState } from "@/utils/store/GameStore/gameStore.types";

import { getWordOfTheDay } from "./getWord";

export const setupGame = async (
  date: Temporal.PlainDate,
  theme?: WordListTheme,
) => {
  const words = await getWordOfTheDay(date, theme ?? "random-list");

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
    archivedGame:
      Temporal.PlainDate.compare(
        date,
        Temporal.Now.plainDateISO(GAME_TIME_ZONE),
      ) !== 0,
  } satisfies GameState;

  return {
    initialState,
    triggerWords: words.trgWords,
  };
};
