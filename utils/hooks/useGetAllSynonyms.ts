import type { ResData } from "../types/projectTypes";

const getSynonyms = <T>(lst: T[][]): T[] => {
  const newArray: T[] = [];

  lst.forEach((pair) => newArray.push(...pair));
  return newArray;
};

const removeDuplicates = (lst: string[]) => {
  const newSet = new Set(lst);

  return Array.from(newSet);
};

const useGetAllSynonyms = (lst: ResData[]) => {
  const newLst = lst.map((point) => getSynonyms(point.meta.syns));

  const synonyms = getSynonyms(newLst);

  const finalLst = removeDuplicates(synonyms);
  return finalLst;
};

export default useGetAllSynonyms;
