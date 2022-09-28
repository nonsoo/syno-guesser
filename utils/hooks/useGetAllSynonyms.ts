import { synonyms, entries } from "../types/projectTypes";
const parseSynonyms = (lst: synonyms[]) => {
  const newArray: synonyms = [];

  lst.forEach((pair) => newArray.push(...pair));
  return newArray;
};

const getAllSynonyms = (entries: entries) => {
  const newArray: synonyms[] = [];
  const allSynonyms = entries.map((entry) =>
    entry.senses.map((sense) => sense.synonyms.map((word) => word.text))
  );

  allSynonyms.forEach((pair) => newArray.push(...pair));

  const lstOfSynonyms = parseSynonyms(newArray);

  return lstOfSynonyms;
};

export default getAllSynonyms;
