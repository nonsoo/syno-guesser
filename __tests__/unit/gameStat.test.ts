import gameStat from "../../utils/helpers/gameStat";
import { loadGameStats } from "../../utils/helpers/saveGame";

describe("Testing if we can properly load and save a game", () => {
  describe("lets test the save state of a clean game", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    afterEach(() => {
      window.localStorage.clear();
    });
    it("should allow us to save a game from a clean game", () => {
      gameStat(2, false);

      const savedGame = loadGameStats();

      expect(savedGame).toBeTruthy();
    });
  });

  describe("Lets test the load game state from a saved game", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    afterEach(() => {
      window.localStorage.clear();
    });
    it("should increase the day streak by 1 if consecutive days are played", () => {
      gameStat(2, false);
      gameStat(3, false);

      const savedGame = loadGameStats();
      const daysCounter = savedGame?.gamesPlayed;

      expect(daysCounter?.length).toEqual(2);
    });

    it("should increase the win streak by 1 if game has been won", () => {
      gameStat(2, true);
      gameStat(3, true);

      const savedGame = loadGameStats();
      const winStreak = savedGame?.winStreak;

      expect(winStreak).toEqual(2);
    });

    it("should properly set the max winstreak of the game", () => {
      gameStat(2, true);
      gameStat(3, true);
      gameStat(4, false);

      const savedGame = loadGameStats();
      const maxWinStreak = savedGame?.maxWinStreak;

      expect(maxWinStreak).toEqual(2);
    });
  });
});
