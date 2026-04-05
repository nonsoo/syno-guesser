import WordLst from "../../shufflewordLst.json";

const WordLstMap = {
  "random-list": WordLst,
} as const;

export const wordListThemes = Object.freeze(WordLstMap);
