import type { Synonyms } from "../types/projectTypes";

export const generate_RandomHint = (hintSet: Set<number>, lenLst: number) => {
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

export const remove_hint_from_lst = (synonymsLstRandom: Synonyms) => {
  return synonymsLstRandom.pop();
};
