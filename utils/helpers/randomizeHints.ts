import { synonyms } from "../types/projectTypes";

const randomizeHint = (arr: synonyms): synonyms => {
  const newArr = [...arr].sort(() => 0.5 - Math.random());
  newArr.pop() || [];
  return newArr;
};

export default randomizeHint;
