import { synonyms } from "../types/projectTypes";
const useGetAllSynonyms = (lst: synonyms[]) => {
  const newArray: synonyms = [];

  lst.forEach((pair) => newArray.push(...pair));
  return newArray;
};

export default useGetAllSynonyms;
