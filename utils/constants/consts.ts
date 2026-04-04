export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://www.cluelesswords.com"
    : "localhost:3000";

export const METADATA_TITLE = "Clueless Words | Daily word game with Synonyms";

export const METADATA_DESCRIPTION =
  "Can you use the clueless words (these synonyms) to solve the mystery word? You only have 6 tries! Wrong guesses will show up in the guess bucket!";

export const METADATA_SOCIAL_IMG_URL =
  BASE_URL + "/favicon/android-chrome-512x512.png";

export const shareRedBox = "🟥";
export const shareGreenBox = "🟩";
export const shareGreenWinBox = "✅";
export const shareLockPen = "🔏";

export const BASELINE_DATE = new Date("July 19, 2022 04:00:00 UTC");
