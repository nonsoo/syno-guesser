import { triggerWord } from "../types/projectTypes";
const useGetTriggerWords = (lst: triggerWord[]) => {
  const newArray = lst.map((trgWord) => trgWord.word);

  return newArray;
};

export default useGetTriggerWords;
