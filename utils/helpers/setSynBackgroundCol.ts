import type { Synonyms, StatusColour } from "../types/projectTypes";

const setSynBackgroundCol = (
  myGuess: string,
  trgWords: string[],
  synonyms: Synonyms,
  secretWord: string,
): StatusColour =>
  trgWords.includes(myGuess.toLowerCase()) ||
  synonyms.includes(myGuess.toLowerCase()) ||
  myGuess.toLowerCase() === secretWord.toLowerCase()
    ? "hsl(111, 32%, 38%)"
    : "hsl(0, 84%, 68%)";

export default setSynBackgroundCol;
