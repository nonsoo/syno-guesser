import setSynBackgroundCol from "../../utils/helpers/setSynBackgroundCol";

describe("setSynBackgroundCol", () => {
  it('should return "hsl(111, 32%, 38%)" if myGuess is included in trgWords or synonyms', () => {
    const myGuess = "hello";
    const trgWords = ["hello", "world"];
    const synonyms = ["hi", "greetings"];
    expect(setSynBackgroundCol(myGuess, trgWords, synonyms)).toBe(
      "hsl(111, 32%, 38%)"
    );
  });

  it('should return "hsl(0, 84%, 68%)" if myGuess is not included in trgWords or synonyms', () => {
    const myGuess = "goodbye";
    const trgWords = ["hello", "world"];
    const synonyms = ["hi", "greetings"];
    expect(setSynBackgroundCol(myGuess, trgWords, synonyms)).toBe(
      "hsl(0, 84%, 68%)"
    );
  });
});
