import WordLst from "../../wordlist.json";

const getTodaysWord = (): string => {
  // calculate todays date in days and then have an offest value
  // The day are going to be used in index the wordLst, therefore,
  // everyday a new word is going to be selected from the word list
  // _________________

  // We first need to calculate the todays date and express it as days
  // then create an offset value so that the index starts at 0
  // and then index the word lst for that specific index to get the
  // word for the day and then return that from this function

  const baseLineDay = new Date("July 19, 2022 00:00:00");
  const todaysDate = new Date();

  const indexArray: number = Math.floor(
    todaysDate.valueOf() - baseLineDay.valueOf()
  );

  const todaysWord = WordLst[indexArray];

  return todaysWord;
};

export default getTodaysWord;
