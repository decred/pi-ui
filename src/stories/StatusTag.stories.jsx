import React from "react";
import { StatusTag } from "..";
import "./page.css";

const StatusTagObj = {
  title: "Design System/Components/StatusTag",
  component: StatusTag,
};

export default StatusTagObj;

const Template = ({ children, ...args }) => <StatusTag {...args} />;

export const GrayNegative = Template.bind({});
GrayNegative.args = {
  type: "grayNegative",
};

export const GreenCheck = Template.bind({});
GreenCheck.args = {
  type: "greenCheck",
};

export const OrangeNegativeCircled = Template.bind({});
OrangeNegativeCircled.args = {
  type: "orangeNegativeCircled",
};

export const BluePendingWithText = Template.bind({});
BluePendingWithText.args = {
  type: "bluePending",
  text: "Pending",
};

export const YellowTimeWithText = Template.bind({});
YellowTimeWithText.args = {
  type: "yellowTime",
  text: "Waiting for approval",
};

export const BlackTimeWithText = Template.bind({});
BlackTimeWithText.args = {
  type: "blackTime",
  text: "Hasn't approved yet",
};
