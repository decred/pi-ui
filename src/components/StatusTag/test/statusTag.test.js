import React from "react";
import StatusTag from "../StatusTag";
import { create } from "react-test-renderer";

describe("StatusTag component", () => {
  test("Matches the snapshot", () => {
    const statusTag = create(<StatusTag />);
    expect(statusTag.toJSON()).toMatchSnapshot();
  });
});
