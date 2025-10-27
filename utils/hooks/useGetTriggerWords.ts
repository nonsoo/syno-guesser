import type { TriggerWord } from "../types/projectTypes";

const useGetTriggerWords = (lst: TriggerWord[]) => {
  const newArray = lst.map((trgWord) => trgWord.word);

  return newArray;
};

export default useGetTriggerWords;
