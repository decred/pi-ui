import React from "react";
import { TextInput, Icon } from "..";
import "./page.css";

const TextInputObj = {
  title: "Design System/Components/TextInput",
  component: TextInput,
};

export default TextInputObj;

const Template = ({ children, ...args }) => (
  <TextInput {...args}>{children}</TextInput>
);

export const Basic = Template.bind({});
Basic.args = {
  id: "test-input",
  label: "Input",
  name: "test-input",
};

export const Password = Template.bind({});
Password.args = {
  id: "test-password",
  label: "Password",
  name: "test-password",
  type: "password",
};

export const Error = Template.bind({});
Error.args = {
  id: "test-input2",
  label: "Input",
  name: "test-input2",
  error: "Incorrect input",
};

export const Success = Template.bind({});
Success.args = {
  id: "test-input3",
  label: "Input",
  name: "test-input3",
  success: "Correct input",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  id: "test-input4",
  label: "Input",
  name: "test-input4",
  placeholder: "Write here",
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  id: "test-input4",
  label: "Input",
  name: "test-input4",
  children: <Icon type="search" />,
};
