import type { WordListSetMap, WordListThemes } from "../types/projectTypes";

import WordLst from "../../shufflewordLst.json";

const WordLstMap = {
  "random-list": WordLst,
} as const;

export const wordListThemes = Object.freeze(WordLstMap);

const createWordListSetMap = (obj: WordListThemes): WordListSetMap => {
  return new Map(
    Object.entries(obj).map(([key, value]) => [
      key as keyof WordListThemes,
      new Set(value),
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
