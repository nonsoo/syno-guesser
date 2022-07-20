import WordLst from "../../wordlist.json";
import moment from "moment";

const date = moment("20111031", "YYYYMMDD").fromNow();

const getTodaysWord = () => {
  // calculate todays date in days and then have an offest value
  // The day are going to be used in index the wordLst, therefore,
  // everyday a new word is going to be selected from the word list
  // _________________

  // We first need to calculate the todays date and express it as days
  // then create an offset value so that the index starts at 0
  // and then index the word lst for that specific index to get the
  // word for the day and then return that from this function
  const day: Date = new Date();
  const todaysDate: number = day.getDate();

  console.log(todaysDate);
};

export default getTodaysWord;
