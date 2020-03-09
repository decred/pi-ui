import React from "react";
import { create } from "react-test-renderer";
import H1 from "../H1";
import H2 from "../H2";
import H3 from "../H3";
import H4 from "../H4";
import H5 from "../H5";
import H6 from "../H6";
import P from "../P";
import Text from "../Text";

describe("Typography Elements", () => {
  test("H1 Matches Snapshot", () => {
    const h1 = create(<H1>header1</H1>);
    expect(h1.toJSON()).toMatchSnapshot();
  });
  test("H2 Matches Snapshot", () => {
    const h2 = create(<H2>header1</H2>);
    expect(h2.toJSON()).toMatchSnapshot();
  });
  test("H3 Matches Snapshot", () => {
    const h3 = create(<H3>header1</H3>);
    expect(h3.toJSON()).toMatchSnapshot();
  });
  test("H4 Matches Snapshot", () => {
    const h4 = create(<H4>header1</H4>);
    expect(h4.toJSON()).toMatchSnapshot();
  });
  test("H5 Matches Snapshot", () => {
    const h5 = create(<H5>header1</H5>);
    expect(h5.toJSON()).toMatchSnapshot();
  });
  test("H6 Matches Snapshot", () => {
    const h6 = create(<H6>header1</H6>);
    expect(h6.toJSON()).toMatchSnapshot();
  });
  test("P Matches Snapshot", () => {
    const p = create(<P>header1</P>);
    expect(p.toJSON()).toMatchSnapshot();
  });
  test("Text Matches Snapshot", () => {
    const text = create(<Text>header1</Text>);
    expect(text.toJSON()).toMatchSnapshot();
  });
});
