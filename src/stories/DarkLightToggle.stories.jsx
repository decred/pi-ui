import React from "react";
import { DarkLightToggle } from "..";
import "./page.css";

const DarkLightToggleObj = {
  title: "Design System/Components/DarkLightToggle",
  component: DarkLightToggle,
};

export default DarkLightToggleObj;

const Template = ({ children, ...args }) => (
  <DarkLightToggle {...args}>{children}</DarkLightToggle>
);

export const Basic = Template.bind({});
Basic.args = {
  children: "Test DarkLightToggle",
  toggled: false,
};

export const Toggled = Template.bind({});
Toggled.args = {
  children: "Test DarkLightToggle",
  toggled: true,
};
