import useGetHint from "../../utils/hooks/useGetHint";

describe("useGetHint", () => {
  it("should return a random number if hintSet.size is less than lenLst", () => {
    const hintSet = new Set([1, 2]);
    const lenLst = 5;
    const result = useGetHint(hintSet, lenLst);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(lenLst);
  });

  it("should return undefined if hintSet.size is equal to lenLst", () => {
    const hintSet = new Set([1, 2, 3, 4, 5]);
    const lenLst = 5;
    expect(useGetHint(hintSet, lenLst)).toBeUndefined();
  });
});
