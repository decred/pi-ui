import React from "react";
import { Icon } from "..";
import "./page.css";

const IconObj = {
  title: "Design System/Components/Icon",
  component: Icon,
};

export default IconObj;

const Template = ({ children, ...args }) => <Icon {...args} />;

export const Type = Template.bind({});
Type.args = {
  type: "search",
};
export const CustomHeightWidth = Template.bind({});
CustomHeightWidth.args = {
  type: "ledger",
  width: "148",
  height: "128",
};
export const Small = Template.bind({});
Small.args = {
  type: "github",
  size: "sm",
};
export const Medium = Template.bind({});
Medium.args = {
  type: "github",
  size: "md",
};
export const Large = Template.bind({});
Large.args = {
  type: "github",
  size: "lg",
};
