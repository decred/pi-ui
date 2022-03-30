import React from "react";
import { Tooltip } from "..";
import "./page.css";

const TooltipObj = {
  title: "Design System/Components/Tooltip",
  component: Tooltip,
};

export default TooltipObj;

// TODO: remove margins and implement multiple stories in a single canva with MDX
const Template = ({ children, ...args }) => (
  <Tooltip {...args}>{children}</Tooltip>
);

export const Top = Template.bind({});
Top.args = {
  children: "Test Tooltip",
  content: "tooltip top",
  placement: "top",
  style: {
    marginTop: "5rem",
  },
};

export const Left = Template.bind({});
Left.args = {
  children: "Test Tooltip",
  content: "tooltip left",
  placement: "left",
  style: {
    marginLeft: "10rem",
  },
};

export const Bottom = Template.bind({});
Bottom.args = {
  children: "Test Tooltip",
  content: "tooltip bottom",
  placement: "bottom",
};

export const Right = Template.bind({});
Right.args = {
  children: "Test Tooltip",
  content: "tooltip right",
  placement: "right",
};
