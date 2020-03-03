import React from "react";
import Card from "../Card";
import { create } from "react-test-renderer";

describe("Card component", () => {
  test("Matches the snapshot", () => {
    const card = create(<Card>test</Card>);
    expect(card.toJSON()).toMatchSnapshot();
  });
});
