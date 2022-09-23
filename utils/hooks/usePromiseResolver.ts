import fetchData from "../helpers/fetchData";

const usePromiseResolver = async (word: string) => {
  const resData = await Promise.all([
    fetchData(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.DICT_API_KEY}`
    ),
    fetchData(`https://api.datamuse.com/words?rel_trg=${word}`),
  ]);

  return resData;
};

export default usePromiseResolver;
