import { resData } from "../types/projectTypes";

const getSynonyms = <T>(lst: T[][]): T[] => {
  const newArray: T[] = [];

  lst.forEach((pair) => newArray.push(...pair));
  return newArray;
};
const useGetAllSynonyms = (lst: resData[]) => {
  const newLst = lst.map((point) => getSynonyms(point.meta.syns));
  const finalLst = getSynonyms(newLst);

  return finalLst;
};

export default useGetAllSynonyms;
