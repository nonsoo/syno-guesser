import { newRandomHint } from "../../utils/hooks/useGetHint";

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

    const randomWord = newRandomHint(words);

    expect(randomWord).toBe("write");
  });

  it("should decrement the the array length by 1 when a new hint is generated", () => {
    const words = ["apple", "juice", "box", "play", "write"];

    newRandomHint(words);

    expect(words.length).toBe(4);
  });
});
