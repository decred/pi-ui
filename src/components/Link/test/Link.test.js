import React from "react";
import Link from "../Link";
import { create } from "react-test-renderer";

describe("Link component", () => {
  test("Matches the snapshot", () => {
    const link = create(<Link>test</Link>);
    expect(link.toJSON()).toMatchSnapshot();
  });
});
