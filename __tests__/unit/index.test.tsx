import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../../pages/index";

const stringWords = ["hello", "There"];
const word: string = "there";

describe("Test the application for Functionality", () => {
  describe("Instruction page", () => {
    it("should mount the instruction page when page is loaded", () => {
      render(<Home synonyms={stringWords} wordOfDay={word} />);

      const InstructionHeader = screen.getByText(/How to play/i);

      expect(InstructionHeader).toBeVisible();
    });
  });
});
