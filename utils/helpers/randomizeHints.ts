import type { Synonyms } from "../types/projectTypes";

const randomizeHint = (arr: Synonyms): Synonyms => {
  const newArr = [...arr].sort(() => 0.5 - Math.random());
  return newArr;
};

export default randomizeHint;
