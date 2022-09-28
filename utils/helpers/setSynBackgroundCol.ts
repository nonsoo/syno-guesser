import { synonyms } from "../types/projectTypes";

const setSynBackgroundCol = (
  myGuess: string,
  trgWords: string[],
  synonyms: synonyms
) => {
  let synonymBackgroudColVar: string;

  if (
    trgWords.includes(myGuess.toLowerCase()) ||
    synonyms.includes(myGuess.toLowerCase())
  ) {
    synonymBackgroudColVar = "hsl(111, 32%, 38%)";
  } else {
    synonymBackgroudColVar = "hsl(0, 84%, 68%)";
  }

  return synonymBackgroudColVar;
};

export default setSynBackgroundCol;
