import React from "react";
import { Badge } from "..";
import "./page.css";

const BadgeObj = {
  title: "Design System/Components/Badge",
  component: Badge,
};

export default BadgeObj;

const Template = ({ children, ...args }) => <Badge {...args}>{children}</Badge>;

export const Basic = Template.bind({});
Basic.args = {
  children: "Test Badge",
  show: true,
};
