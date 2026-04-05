import { wordListSetMap } from "@/utils/constants/word-lists";
import {
  StatusColour,
  Synonyms,
  WordListTheme,
} from "@/utils/types/projectTypes";

export const isGuessInWordLst = (
  guess: string,
  availableHints: string[],
  synonyms: Synonyms,
  triggerWords: string[],
  theme: WordListTheme,
) =>
  !availableHints.includes(guess.toLowerCase()) &&
  !triggerWords.includes(guess.toLowerCase()) &&
  !synonyms.includes(guess.toLowerCase()) &&
  !wordListSetMap.get(theme)?.has(guess.toLowerCase());

export const generateStatusColour = (
  guess: string,
  synonyms: Synonyms,
  triggerWords: string[],
  availableHints: Synonyms,
  secretWord: string,
): StatusColour =>
  triggerWords.includes(guess) ||
  synonyms.includes(guess.toLowerCase()) ||
  availableHints.includes(guess) ||
  guess === secretWord
    ? "hsl(111, 32%, 38%)"
    : "hsl(0, 84%, 68%)";
