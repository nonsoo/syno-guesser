import { useState } from "react";

const useRemainingLives = (num: number) => {
  const newLst: number[] = [];

  for (let i = 0; i <= num; i++) {
    newLst.push(i);
  }

  const [remainingLives, setRemainingLives] = useState<number[]>(newLst);

  return { remainingLives, setRemainingLives };
};

export default useRemainingLives;
