import { StatusColour, Synonyms } from "@/utils/types/projectTypes";

export const isGuessInWordLst = (
  guess: string,
  availableHints: string[],
  synonyms: Synonyms,
  triggerWords: string[],
) =>
  availableHints.includes(guess.toLowerCase()) &&
  triggerWords.includes(guess.toLowerCase()) &&
  synonyms.includes(guess.toLowerCase());

export const generateStatusColour = (
  myGuess: string,
  triggerWords: string[],
  availableHints: Synonyms,
  secretWord: string,
): StatusColour =>
  triggerWords.includes(myGuess) ||
  availableHints.includes(myGuess) ||
  myGuess === secretWord
    ? "hsl(111, 32%, 38%)"
    : "hsl(0, 84%, 68%)";
