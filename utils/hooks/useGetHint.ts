import { synonyms } from "../types/projectTypes";
export const useGetHint = (hintSet: Set<number>, lenLst: number) => {
  let randomHint: number = 0;
  let counter: number = 0;

  if (hintSet.size === lenLst) return;

  while (counter <= lenLst) {
    counter++;
    randomHint = Math.floor(Math.random() * lenLst);

    if (!hintSet.has(randomHint)) break;
  }

  return randomHint;
};

export const newRandomHint = (synonymsLstRandom: synonyms) => {
  return synonymsLstRandom.pop();
};
