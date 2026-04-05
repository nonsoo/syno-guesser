import WordLst from "../../shufflewordLst.json";

const WordLstMap = {
  "random-list": WordLst,
} as const;

export const wordListThemes = Object.freeze(WordLstMap);

const createWordListSetMap = <T extends Record<string, readonly string[]>>(
  obj: T,
): Map<keyof T, Set<T[keyof T][number]>> => {
  return new Map(
    Object.entries(obj).map(([key, value]) => [key, new Set(value)]),
  ) as Map<keyof T, Set<T[keyof T][number]>>;
};

export const wordListSetMap = createWordListSetMap(wordListThemes);
