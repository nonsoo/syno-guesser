import type { WordListTheme } from "../types/projectTypes";

import { wordListThemes } from "../constants/word-lists";

export const getOffsetDay = (baseLineDate: Date, currDate: Date): number => {
  const offSet: number = Math.floor(
    currDate.valueOf() - baseLineDate.valueOf(),
  );
  const toDaysConverter = 24 * 60 * 60 * 1000;

  const convertToDaysNumber = Math.abs(Math.floor(offSet / toDaysConverter));

  return convertToDaysNumber;
};

const getTodaysWord = (
  date: Date,
  theme: WordListTheme,
): { wordOfDay: string; offsetDate: number } => {
  // calculate todays date in days and then have an offest value
  // The day are going to be used in index the wordLst, therefore,
  // everyday a new word is going to be selected from the word list
  // _________________

  // We first need to calculate the todays date and express it as days
  // then create an offset value so that the index starts at 0
  // and then index the word lst for that specific index to get the
  // word for the day and then return that from this function

  const wordLst = wordListThemes[theme];

  const indexArray =
    getOffsetDay(wordLst.startDate, date) % wordLst.themeList.length;

  const wordOfDay = wordLst.themeList[indexArray];

  return { wordOfDay, offsetDate: indexArray };
};

export default getTodaysWord;
