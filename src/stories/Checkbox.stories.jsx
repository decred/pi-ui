import React from "react";
import { Checkbox } from "..";
import "./page.css";

const CheckboxObj = {
  title: "Design System/Components/Checkbox",
  component: Checkbox,
};

export default CheckboxObj;

const Template = ({ children, ...args }) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  id: "test-checkbox",
  label: "test",
  description: "yoyo!",
};
