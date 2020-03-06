import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal Component", () => {
  test("Open and close", () => {
    const mockOnClose = jest.fn();
    render(
      <Modal show={true} onClose={mockOnClose}>
        test
      </Modal>
    );
    expect(screen.queryByText(/test/i)).toBeTruthy();

    fireEvent.click(screen.getByTestId("close"));

    expect(mockOnClose).toBeCalled();
  });
});
