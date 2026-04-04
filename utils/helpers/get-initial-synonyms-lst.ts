import type { Synonyms } from "../types/projectTypes";

const generateInitialSynonymsList = (synonyms: Synonyms) => {
  return synonyms.length > 3
    ? [
        synonyms[0],
        synonyms[Math.floor(synonyms.length / 2)],
        synonyms[synonyms.length - 1],
      ]
    : [...synonyms];
};

export default generateInitialSynonymsList;
