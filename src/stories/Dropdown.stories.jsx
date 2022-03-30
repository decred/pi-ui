import React from "react";
import { Dropdown, DropdownItem } from "..";
import "./page.css";

const DropdownObj = {
  title: "Design System/Components/Dropdown",
  component: Dropdown,
};

export default DropdownObj;

const Template = ({ children, ...args }) => (
  <Dropdown {...args}>{children}</Dropdown>
);

export const BasicOpened = Template.bind({});
BasicOpened.args = {
  children: <DropdownItem>test dropdown item</DropdownItem>,
  show: true,
  title: "Test dropdown",
};

export const BasicClosed = Template.bind({});
BasicClosed.args = {
  children: <DropdownItem>test dropdown item</DropdownItem>,
  show: false,
  title: "Test dropdown",
};
