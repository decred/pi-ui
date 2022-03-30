import React from "react";
import { TextArea } from "..";
import "./page.css";

const TextAreaObj = {
  title: "Design System/Components/TextArea",
  component: TextArea,
};

export default TextAreaObj;

const Template = ({ children, ...args }) => <TextArea {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  id: "test-statement",
  placeholder: "Statement",
  name: "test-statement",
  error: "",
};

export const Error = Template.bind({});
Error.args = {
  id: "test-statement2",
  placeholder: "Statement",
  name: "test-statement2",
  error: "Invalid statement",
};
