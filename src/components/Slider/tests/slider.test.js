import React from "react";
import { create } from "react-test-renderer";
import Slider from "../Slider";

describe("Slider component", () => {
  test("Matches snapshot", () => {
    let value0 = 0;
    let value1 = 40;
    const mockHandleChange0 = jest.fn((newValue) => {
      value0 = newValue;
    });
    const mockHandleChange1 = jest.fn((newValue) => {
      value1 = newValue;
    });
    const slider = create(
      <Slider
        double={true}
        axis="x"
        max={100}
        min={0}
        handles={[
          {
            value: value0,
            onChange: mockHandleChange0
          },
          {
            value: value1,
            onChange: mockHandleChange1
          }
        ]}
      />
    );
    expect(slider.toJSON()).toMatchSnapshot();
  });
});
