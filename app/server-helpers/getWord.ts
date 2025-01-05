import { resData, triggerWord } from "../../utils/types/projectTypes";

import UseGetAllSynonyms from "../../utils/hooks/useGetAllSynonyms";
import UseGetTriggerWord from "../../utils/hooks/useGetTriggerWords";
import UsePromiseResolver from "../../utils/hooks/usePromiseResolver";

import getWordOftheDay from "../../utils/helpers/newDay";

export const getWordOfTheDay = async () => {
  const wordOfDay = getWordOftheDay();

  try {
    const resData = await UsePromiseResolver(wordOfDay);

    if (typeof resData[0][0] === "string") {
      const synonyms: string[] = [];
      let trgWords: string[] = [];

      if (resData[1].length != 0) {
        trgWords = UseGetTriggerWord(resData[1]);
      }

      return {
        props: { synonyms, wordOfDay, trgWords },
      };
    }

    const resp: resData[] = resData[0];
    const trgWordResp: triggerWord[] = resData[1];

    const cleanData = resp.filter((obj) => obj?.meta?.id === wordOfDay);

    const synonyms = UseGetAllSynonyms(cleanData);

    const trgWords = UseGetTriggerWord(trgWordResp);

    return { synonyms, wordOfDay, trgWords };
  } catch (e) {
    const synonyms: string[] = [];
    const trgWords: string[] = [];

    return {
      synonyms,
      wordOfDay,
      trgWords,
    };
  }
};
