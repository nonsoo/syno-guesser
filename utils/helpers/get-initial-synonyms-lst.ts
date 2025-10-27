import type { Synonyms } from "../types/projectTypes";
const get_initial_synonyms_lst = (synonyms: Synonyms) => {
  return synonyms.length > 3
    ? [
        synonyms[0],
        synonyms[Math.floor(synonyms.length / 2)],
        synonyms[synonyms.length - 1],
      ]
    : [...synonyms];
};

export default get_initial_synonyms_lst;
