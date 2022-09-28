import { entries } from "../types/projectTypes";
const parseSynonyms = <T>(lst: T[][]) => {
  let newArray: T[] = [];

  lst.forEach((pair) => newArray.push(...pair));
  return newArray;
};

const getAllSynonyms = (entries: entries) => {
  const allSynonyms = entries.map((entry) =>
    entry.senses.map((sense) => sense.synonyms.map((word) => word.text))
  );

  const subSynonymsLst = parseSynonyms(allSynonyms);

  const lstOfSynonyms = parseSynonyms(subSynonymsLst);

  return lstOfSynonyms;
};

export default getAllSynonyms;
