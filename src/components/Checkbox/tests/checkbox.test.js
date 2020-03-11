import React from "react";
import Checkbox from "../Checkbox";
import { create } from "react-test-renderer";

describe("Checkbox component", () => {
  test("Matches the snapshot", () => {
    const checkbox = create(<Checkbox label="test" id="test" />);
    expect(checkbox.toJSON()).toMatchSnapshot();
  });
});
