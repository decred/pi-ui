import React from "react";
import { Button } from "..";
import "./page.css";

const ButtonObj = {
  title: "Design System/Components/Button",
  component: Button,
};

export default ButtonObj;

const Template = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
  children: "Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  kind: "disabled",
  children: "Button",
};

export const Small = Template.bind({});
Small.args = {
  kind: "primary",
  children: "Button",
  size: "sm",
};

export const Medium = Template.bind({});
Medium.args = {
  kind: "primary",
  children: "Button",
  size: "md",
};

export const Large = Template.bind({});
Large.args = {
  kind: "primary",
  children: "Button",
  size: "lg",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  kind: "primary",
  children: "Button",
  fullWidth: true,
};

export const Loading = Template.bind({});
Loading.args = {
  kind: "primary",
  children: "Button",
  loading: true,
};
