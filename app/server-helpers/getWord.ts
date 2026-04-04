import type { ResData, TriggerWord } from "@/utils/types/projectTypes";

import fetchData from "@/utils/helpers/fetchData";
import getWordOftheDay from "@/utils/helpers/newDay";

export const getWordOfTheDay = async (date: Date) => {
  const { wordOfDay, offsetDate } = getWordOftheDay(date);

  try {
    const resData = await Promise.all([
      fetchData(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${wordOfDay}?key=${process.env.DICT_API_KEY}`,
      ),
      fetchData(`https://api.datamuse.com/words?rel_trg=${wordOfDay}`),
    ]);

    const synonymsResponse: ResData[] = resData[0];
    const triggerWordResponse: TriggerWord[] = resData[1];

    if (typeof synonymsResponse[0] === "string") {
      const synonyms: string[] = [];
      let trgWords: string[] = [];

      if (triggerWordResponse.length !== 0) {
        trgWords = triggerWordResponse.map((trgWord) => trgWord.word);
      }

      return {
        synonyms,
        wordOfDay,
        trgWords,
        offsetDate,
      };
    }

    const cleanData = synonymsResponse.filter(
      (obj) => obj?.meta?.id === wordOfDay,
    );

    const allSynonyms = cleanData.flatMap((obj) => obj.meta.syns).flat();
    const uniqueSynonyms = Array.from(new Set(allSynonyms));
    const trgWords = triggerWordResponse.map((trgWord) => trgWord.word);

    return { synonyms: uniqueSynonyms, wordOfDay, trgWords, offsetDate };
  } catch {
    const synonyms: string[] = [];
    const trgWords: string[] = [];

    return {
      synonyms,
      wordOfDay,
      trgWords,
      offsetDate,
    };
  }
};
