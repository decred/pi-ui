import React from "react";
import { Link } from "..";
import "./page.css";

const LinkObj = {
  title: "Design System/Components/Link",
  component: Link,
};

export default LinkObj;

const Template = ({ children, ...args }) => <Link {...args}>{children}</Link>;

export const Basic = Template.bind({});
Basic.args = {
  children: "Test Link",
  href: "#",
};

export const Gray = Template.bind({});
Gray.args = {
  children: "Test Link",
  href: "#",
  gray: true,
};
export const Truncated = Template.bind({});
Truncated.args = {
  children: "Test Big Big Big Big Big Truncated Link",
  style: {
    width: "200px",
  },
  href: "#",
  truncate: true,
};
export const CustomChild = Template.bind({});
CustomChild.args = {
  customComponent: (props) => <div {...props}>Test me Custom</div>,
  href: "#",
};
