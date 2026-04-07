import { mockGame } from "@/utils/mocks/game.mock";
import { generateStatusColour } from "@/utils/store/GameStore/gameStore.helpers";

describe("generateStatusColour", () => {
  it('should return "hsl(111, 32%, 38%)" if myGuess is included in trgWords or synonyms', () => {
    const guess = "cheerful";

    expect(
      generateStatusColour(
        guess,
        mockGame.initialState.synonyms,
        mockGame.triggerWords,
        mockGame.initialState.availableHints,
        mockGame.initialState.wordOfDay,
      ),
    ).toBe("hsl(111, 32%, 38%)");
  });

  it('should return "hsl(111, 32%, 38%)" if myGuess is the secret word', () => {
    const guess = "happy";
    expect(
      generateStatusColour(
        guess,
        mockGame.initialState.synonyms,
        mockGame.triggerWords,
        mockGame.initialState.availableHints,
        mockGame.initialState.wordOfDay,
      ),
    ).toBe("hsl(111, 32%, 38%)");
  });

  it('should return "hsl(0, 84%, 68%)" if myGuess is not included in trgWords or synonyms', () => {
    const guess = "kite";
    expect(
      generateStatusColour(
        guess,
        mockGame.initialState.synonyms,
        mockGame.triggerWords,
        mockGame.initialState.availableHints,
        mockGame.initialState.wordOfDay,
      ),
    ).toBe("hsl(0, 84%, 68%)");
  });
});
