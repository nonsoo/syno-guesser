import type {
  WordListSetMap,
  WordListThemeConstant,
  WordListThemes,
} from "../types/projectTypes";

import WordLst from "../../shufflewordLst.json";

import "@/utils/helpers/ensure-temporal";

const WordLstMap = {
  "random-list": {
    themeList: WordLst,
    startDate: Temporal.PlainDate.from("2022-07-19"),
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
