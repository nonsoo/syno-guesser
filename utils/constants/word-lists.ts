import type {
  WordListSetMap,
  WordListThemeConstant,
  WordListThemes,
} from "../types/projectTypes";

import WordLst from "../../shufflewordLst.json";

const WordLstMap = {
  "random-list": {
    themeList: WordLst,
    startDate: new Date("July 19, 2022 04:00:00 UTC"),
  },
} as const satisfies WordListThemeConstant;

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
