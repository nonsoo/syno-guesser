import { Synonyms } from "@/utils/types/projectTypes";

export const isGuessInWordLst = (
  guess: string,
  wordOfDay: string,
  availableHints: string[],
  synonyms: Synonyms,
  triggerWords: string[],
) => {
  return (
    !availableHints.includes(guess.toLowerCase()) &&
    !triggerWords.includes(guess.toLowerCase()) &&
    !synonyms.includes(guess.toLowerCase()) &&
    guess !== wordOfDay
  );
};
