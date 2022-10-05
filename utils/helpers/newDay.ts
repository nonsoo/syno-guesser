import WordLst from "../../shufflewordLst.json";

export const getOffsetDay = (currDate: Date): number => {
  const baseLineDay = new Date("July 19, 2022 04:00:00 UTC");

  const offSet: number = Math.floor(currDate.valueOf() - baseLineDay.valueOf());
  const toDaysConverter = 24 * 60 * 60 * 1000;

  const convertToDaysNumber = Math.abs(Math.floor(offSet / toDaysConverter));

  return convertToDaysNumber;
};

const getTodaysWord = (): string => {
  // calculate todays date in days and then have an offest value
  // The day are going to be used in index the wordLst, therefore,
  // everyday a new word is going to be selected from the word list
  // _________________

  // We first need to calculate the todays date and express it as days
  // then create an offset value so that the index starts at 0
  // and then index the word lst for that specific index to get the
  // word for the day and then return that from this function

  const todaysDate = new Date();
  const indexArray = getOffsetDay(todaysDate);

  const todaysWord = WordLst[indexArray];

  return todaysWord;
};

export default getTodaysWord;
