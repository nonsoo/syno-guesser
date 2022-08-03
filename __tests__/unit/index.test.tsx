import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { mockData } from "../../utils/types/testTypes";

import Home from "../../pages/index";

describe("Test the application for Functionality", () => {
  describe("Instruction page", () => {
    it("should mount the instruction page when page is loaded", () => {
      render(<Home {...mockData} />);

      const InstructionHeader = screen.getByAltText(/How to play/i);

      expect(InstructionHeader).toBeVisible();
    });
  });
});
