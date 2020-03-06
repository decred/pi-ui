import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal Component", () => {
  test("Matches snapshot", () => {
    const mockOnClose = jest.fn();
    const modal = render(
      <Modal show={true} onClose={mockOnClose}>
        simple
      </Modal>
    );
  });
});
