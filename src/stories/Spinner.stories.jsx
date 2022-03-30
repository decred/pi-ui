import React from "react";
import { Spinner } from "..";
import "./page.css";

const SpinnerObj = {
  title: "Design System/Components/Spinner",
  component: Spinner,
};

export default SpinnerObj;

const Template = ({ children, ...args }) => <Spinner {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Inverted = Template.bind({});
Inverted.args = {
  invert: true,
};
