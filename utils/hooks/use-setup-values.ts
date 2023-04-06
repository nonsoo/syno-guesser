import { useMemo } from "react";
import { getOffsetDay } from "../helpers/newDay";
import randomizeHint from "../helpers/randomizeHints";

import { synonyms, setupValues } from "../types/projectTypes";

const useSetupValues = (synonyms: synonyms) => {
  const setUpValues: setupValues = useMemo(() => {
    const todaysDate = new Date();
    const offsetDate = getOffsetDay(todaysDate);
    const totalGuessAllowed: number = 6;

    const newRandomHints = synonyms.filter((synonym) => {
      if (
        synonym != synonyms[0] &&
        synonym != synonyms[Math.floor(synonyms.length / 2)] &&
        synonym != synonyms[synonyms.length - 1]
      )
        return [synonym];
    });

    const randomizedHints = randomizeHint(newRandomHints);

    return { offsetDate, totalGuessAllowed, randomizedHints };
  }, [synonyms]);

  return setUpValues;
};

export default useSetupValues;
