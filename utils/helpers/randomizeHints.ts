import { synonyms } from "../types/projectTypes";

const randomizeHint = (arr: synonyms): synonyms => {
  const newArr = [...arr].sort(() => 0.5 - Math.random());
  return newArr;
};

export default randomizeHint;
