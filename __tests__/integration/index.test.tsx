import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../../pages/index";

const stringWords = ["hello", "There", "you", "test", "test1"];
const word: string = "there";

describe("Test the application for Functionality", () => {
  describe("Instruction page", () => {
    it("should mount the instruction page when page is loaded", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);

      const InstructionHeader = screen.getByText(/How to play/i);

      expect(InstructionHeader).toBeVisible();
    });
  });

  describe("testing the game", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    it("should allow user to submit a guess", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: "university" },
      });

      fireEvent.submit(form);

      const guessedWord = screen.getByTestId("GuessedWord");

      expect(guessedWord).toBeInTheDocument();
    });

    it("should show the user a new synonym when the new hint btn is pressed", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);

      const newHint = screen.getByRole("button", { name: "New Hint" });

      fireEvent.click(newHint);

      const synosLst = screen.getAllByTestId("synos");

      expect(synosLst.length).toEqual(4);
    });

    it("should show the user that they have won the game", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);

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
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);
      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");

      for (let i = 0; i < 6; i++) {
        fireEvent.change(guessInput, {
          target: { value: "word" },
        });

        fireEvent.submit(form);
      }
      const loseScreen = screen.getByTestId("loseState");
      expect(loseScreen).toBeVisible();
    });

    it("should keep track of the number of guesses the user has entered", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);
      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");

      for (let i = 0; i < 3; i++) {
        fireEvent.change(guessInput, {
          target: { value: "word" },
        });

        fireEvent.submit(form);
      }

      fireEvent.change(guessInput, {
        target: { value: word },
      });

      fireEvent.submit(form);
      const numOfGuesses = screen.getAllByTestId("guessEntered");
      expect(numOfGuesses.length).toEqual(3);
    });

    it("should decrease the life by 1 when an incorrect guess is entered", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);
      const closeBtn = screen.getByTestId("instruct_Close_btn");
      fireEvent.click(closeBtn);

      const guessInput = screen.getByRole("textbox");
      const form = screen.getByTestId("formSubmit");
      fireEvent.change(guessInput, {
        target: { value: "word" },
      });

      fireEvent.submit(form);

      const liveMeter = screen.getAllByTestId("liveMeter");

      expect(liveMeter.length).toEqual(5);
    });
  });
});
