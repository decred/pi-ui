import React from "react";
import Spinner from "../Spinner";
import { create } from "react-test-renderer";

describe("Spinner component", () => {
  test("Matches the snapshot", () => {
    const spinner = create(<Spinner />);
    expect(spinner.toJSON()).toMatchSnapshot();
  });
});
