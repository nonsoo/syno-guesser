import { cacheLife, cacheTag } from "next/cache";
import { getWordOfTheDay } from "./getWord";
import get_initial_synonyms_lst from "@/utils/helpers/get-initial-synonyms-lst";
import { GameState } from "@/utils/store/GameStore/gameStore.types";
import randomizeHint from "@/utils/helpers/randomizeHints";

export const setupGame = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("word-of-the-day");

  const words = await getWordOfTheDay();

  const initialSynonyms = get_initial_synonyms_lst(words.synonyms);
  const availableHints = randomizeHint(
    words.synonyms.filter((synonym) => !initialSynonyms.includes(synonym)),
  );

  const initialState: GameState = {
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
  };

  return {
    initialState,
    triggerWords: words.trgWords,
  };
};
