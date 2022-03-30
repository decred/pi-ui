import React from "react";
import { RadioButtonGroup } from "..";
import "./page.css";

const RadioButtonGroupObj = {
  title: "Design System/Components/RadioButtonGroup",
  component: RadioButtonGroup,
};

export default RadioButtonGroupObj;

const Template = ({ children, ...args }) => <RadioButtonGroup {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: "Select an option",
  vertical: true,
  options: [
    { label: "foo", value: 1, description: "this is foo!" },
    { label: "bar", value: 2, description: "this is bar!" },
  ],
};

export const OneSelected = Template.bind({});
OneSelected.args = {
  label: "Select an option",
  vertical: true,
  value: 1,
  options: [
    { label: "foo", value: 1, description: "this is foo!" },
    { label: "bar", value: 2, description: "this is bar!" },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Select an option",
  vertical: true,
  disabled: true,
  options: [
    { label: "foo", value: 1, description: "this is foo!" },
    { label: "bar", value: 2, description: "this is bar!" },
  ],
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  label: "Select an option",
  vertical: false,
  options: [
    { label: "foo", value: 1, description: "this is foo!" },
    { label: "bar", value: 2, description: "this is bar!" },
  ],
};
