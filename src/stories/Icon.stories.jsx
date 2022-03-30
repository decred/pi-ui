import React from "react";
import { Icon } from "..";
import "./page.css";

const IconObj = {
  title: "Design System/Components/Icon",
  component: Icon,
};

export default IconObj;

const Template = ({ children, ...args }) => <Icon {...args} />;

export const Search = Template.bind({});
Search.args = {
  type: "search",
};
export const Chart = Template.bind({});
Chart.args = {
  type: "chart",
};
export const Github = Template.bind({});
Github.args = {
  type: "github",
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
