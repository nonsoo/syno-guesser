import type { Synonyms, SetupValues } from "../types/projectTypes";

import { useMemo } from "react";

import randomizeHint from "../helpers/randomizeHints";

const useSetupValues = (synonyms: Synonyms) => {
  const setUpValues: SetupValues = useMemo(() => {
    const totalGuessAllowed: number = 6;

    const newRandomHints = synonyms.filter((synonym) => {
      if (
        synonym !== synonyms[0] &&
        synonym !== synonyms[Math.floor(synonyms.length / 2)] &&
        synonym !== synonyms[synonyms.length - 1]
      )
        return [synonym];
    });

    const randomizedHints = randomizeHint(newRandomHints);

    return { totalGuessAllowed, randomizedHints };
  }, [synonyms]);

  return setUpValues;
};

export default useSetupValues;
