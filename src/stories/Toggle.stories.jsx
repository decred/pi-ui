import React from "react";
import { Toggle } from "..";
import "./page.css";

const ToggleObj = {
  title: "Design System/Components/Toggle",
  component: Toggle,
};

export default ToggleObj;

const Template = ({ children, ...args }) => <Toggle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  toggled: false,
};

export const Toggled = Template.bind({});
Toggled.args = {
  toggled: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
