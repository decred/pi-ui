import React from "react";
import { NumberInput } from "..";
import "./page.css";

const NumberInputObj = {
  title: "Design System/Components/NumberInput",
  component: NumberInput,
};

export default NumberInputObj;

const Template = ({ children, ...args }) => <NumberInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  id: "test-number-input",
};
export const Error = Template.bind({});
Error.args = {
  id: "test-number-input2",
  error: "Value must be lass than 20",
};
