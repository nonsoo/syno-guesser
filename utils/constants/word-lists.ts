import type { WordListSetMap, WordListThemes } from "../types/projectTypes";

import WordLst from "../../shufflewordLst.json";
import { BASELINE_DATE } from "./consts";

const WordLstMap = {
  "random-list": { themeList: WordLst, startDate: BASELINE_DATE },
} as const;

export const wordListThemes = Object.freeze(WordLstMap);

const createWordListSetMap = (obj: WordListThemes): WordListSetMap => {
  return new Map(
    Object.entries(obj).map(([key, value]) => [
      key as keyof WordListThemes,
      new Set(value.themeList),
    ]),
  );
};

let wordListSetMap: WordListSetMap | null = null;

export const createCachedWordListSetMap = (): WordListSetMap => {
  if (!wordListSetMap) {
    wordListSetMap = createWordListSetMap(wordListThemes);
  }
  return wordListSetMap;
};
