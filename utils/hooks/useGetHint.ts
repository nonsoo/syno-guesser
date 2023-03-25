import { synonyms } from "../types/projectTypes";
const useGetHint = (hintSet: Set<number>, lenLst: number) => {
  let randomHint: number = 0;
  let counter: number = 0;

  if (hintSet.size === lenLst) return;

  while (counter <= lenLst) {
    counter++;
    randomHint = Math.floor(Math.random() * lenLst);

    if (!hintSet.has(randomHint)) break;
  }

  return randomHint;

  // make an array of indexs 0 ... lenlst of

  // sort a random list of hints and get the first index and then pop from list
};

export const newRandomHint = (synonymsLstRandom: synonyms) => {
  return synonymsLstRandom.pop();
};

export default useGetHint;
