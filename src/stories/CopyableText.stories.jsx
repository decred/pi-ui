import React from "react";
import { CopyableText } from "..";
import "./page.css";

const CopyableTextObj = {
  title: "Design System/Components/CopyableText",
  component: CopyableText,
};

export default CopyableTextObj;

const Template = ({ children, ...args }) => (
  <CopyableText {...args}>{children}</CopyableText>
);

export const Basic = Template.bind({});
Basic.args = {
  children: "Test CopyableText",
  id: "copyable-test",
};

export const Truncate = Template.bind({});
Truncate.args = {
  children: "Test CopyableText truncateeeeeeeeeeeeeee",
  textStyle: { width: "200px" },
  truncate: true,
  id: "copyable-truncate-test",
};
