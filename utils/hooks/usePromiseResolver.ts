import fetchData from "../helpers/fetchData";

const config = {
  headers: {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
  },
};

const usePromiseResolver = async (word: string) => {
  const resData = await Promise.all([
    fetchData(
      ` https://od-api.oxforddictionaries.com/api/v2/thesaurus/en-us/${word}?fields=synonyms`,
      config
    ),
    fetchData(`https://api.datamuse.com/words?rel_trg=${word}`),
  ]);

  return resData;
};

export default usePromiseResolver;
