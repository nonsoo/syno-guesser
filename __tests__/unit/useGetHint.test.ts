import { remove_hint_from_lst } from "../../utils/helpers/generate-random-hint";

describe("useGetHint", () => {
  // it("should return a random number if hintSet.size is less than lenLst", () => {
  //   const hintSet = new Set([1, 2]);
  //   const lenLst = 5;
  //   const result = useGetHint(hintSet, lenLst);
  //   expect(result).toBeGreaterThanOrEqual(0);
  //   expect(result).toBeLessThan(lenLst);
  // });

  // it("should return undefined if hintSet.size is equal to lenLst", () => {
  //   const hintSet = new Set([1, 2, 3, 4, 5]);
  //   const lenLst = 5;
  //   expect(useGetHint(hintSet, lenLst)).toBeUndefined();
  // });

  it("should return a the last for in the list from a list of random words", () => {
    const words = ["apple", "juice", "box", "play", "write"];

    const randomWord = remove_hint_from_lst(words);

    expect(randomWord).toBe("write");
  });

  it("should decrement the the array length by 1 when a new hint is generated", () => {
    const words = ["apple", "juice", "box", "play", "write"];

    remove_hint_from_lst(words);

    expect(words.length).toBe(4);
  });

  it("should return undefined when the lst length is 0", () => {
    const words: string[] = [];

    const randomWord = remove_hint_from_lst(words);
    expect(randomWord).toBeUndefined();
  });
});
