import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Game from "@/app/components/Game";
import GameProvider from "@/utils/context/GameContext";
import { mockGame } from "@/utils/mocks/game.mock";

const stringWords = ["hello", "you", "test"];
const word: string = "there";
const trgWordsLst = ["bob", " Apple", "trigger"];
const offsetDate = 2;

const initialState = {
  ...mockGame.initialState,
  wordOfDay: word,
  synonyms: stringWords,
  availableHints: ["test1"],
  guessLst: [],
  myLives: 6,
  gameState: {
    ...mockGame.initialState.gameState,
    status: "in-progress" as const,
    winState: "none" as const,
    dayOfPlay: offsetDate,
  },
};

const renderGame = () =>
  render(
    <GameProvider
      initialState={initialState}
      offsetDate={offsetDate}
      hasAccount={false}
    >
      <Game triggerWords={trgWordsLst} />
    </GameProvider>,
  );

const renderGameWithNoHints = () =>
  render(
    <GameProvider
      initialState={{
        ...initialState,
        availableHints: [],
      }}
      offsetDate={offsetDate}
      hasAccount={false}
    >
      <Game triggerWords={trgWordsLst} />
    </GameProvider>,
  );

describe("Test the application for Functionality", () => {
  describe("testing the game", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    it("should allow user to submit a guess", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: "apple" },
      });

      fireEvent.submit(form);

      const guessedWord = screen.getByTestId("GuessedWord");

      expect(guessedWord).toBeInTheDocument();
    });

    it("should show the user a new synonym when the new hint btn is pressed", () => {
      renderGame();

      const newHint = screen.getByRole("button", { name: "New Hint" });

      fireEvent.click(newHint);

      const synosLst = screen.getAllByTestId("synos");

      expect(synosLst.length).toEqual(4);
    });

    it("should disable the New Hint button when no hints remain", () => {
      renderGameWithNoHints();

      const newHint = screen.getByRole("button", { name: "New Hint" });

      expect(newHint).toBeDisabled();
    });

    it("should show a no-hints disclaimer when no available hints remain", () => {
      renderGameWithNoHints();

      const disclaimer = screen.getByText(
        /Looks like the secret word today does not have any synonyms/i,
      );

      expect(disclaimer).toBeVisible();
    });

    it("should show the not in word list prompt when a user enters a word that is not in the word list", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: "sdsdsd" },
      });

      fireEvent.submit(form);

      const alertError = screen.getByText(/Not in word list/i);

      expect(alertError).toBeVisible();
    });

    it("should show the user that they have won the game", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: word },
      });

      fireEvent.submit(form);

      const winScreen = screen.getByTestId("winState");

      expect(winScreen).toBeVisible();
    });

    it("should show if the user has lost the game", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");

      for (let i = 0; i < 6; i++) {
        fireEvent.change(guessInput, {
          target: { value: "apple" },
        });

        fireEvent.submit(form);
      }
      const loseScreen = screen.getByTestId("loseState");
      expect(loseScreen).toBeVisible();
    });

    it("should keep track of the number of guesses the user has entered", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");

      for (let i = 0; i < 3; i++) {
        fireEvent.change(guessInput, {
          target: { value: "apple" },
        });

        fireEvent.submit(form);
      }

      fireEvent.change(guessInput, {
        target: { value: word },
      });

      fireEvent.submit(form);
      const numOfGuesses = screen.getAllByTestId("guessEntered");
      expect(numOfGuesses.length).toEqual(4);
    });

    it("should decrease the life by 1 when an incorrect guess is entered", () => {
      renderGame();

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: "apple" },
      });

      fireEvent.submit(form);

      const liveMeter = screen.getAllByTestId("liveMeter");

      expect(liveMeter.length).toEqual(5);
    });
  });
});
