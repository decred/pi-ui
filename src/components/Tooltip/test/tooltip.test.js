import React from "react";
import Tooltip from "../Tooltip";
import { create } from "react-test-renderer";

describe("Tooltip component", () => {
  test("Matches the snapshot", () => {
    const tooltip = create(<Tooltip />);
    expect(tooltip.toJSON()).toMatchSnapshot();
  });
});
